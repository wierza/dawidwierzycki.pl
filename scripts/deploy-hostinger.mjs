import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const NPX_PATH = path.resolve(process.env.HOME, '.npm/_npx/a7204b5813574340/node_modules');
const axios = require(path.join(NPX_PATH, 'axios'));
const tus = require(path.join(NPX_PATH, 'tus-js-client'));

const TOKEN = process.env.HOSTINGER_API_TOKEN;
if (!TOKEN) {
  console.error('Brak HOSTINGER_API_TOKEN. Uruchom: HOSTINGER_API_TOKEN=... node scripts/deploy-hostinger.mjs');
  process.exit(1);
}
const BASE_URL = 'https://developers.hostinger.com';
const DOMAIN = 'dawidwierzycki.pl';
const USERNAME = 'u484281174';
const ARCHIVE_PATH = '/tmp/dawidwierzycki_deploy.zip';

const authHeaders = {
  'Authorization': `Bearer ${TOKEN}`,
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

console.log('=== dawidwierzycki.pl → Hostinger ===\n');
console.log(`Archiwum: ${ARCHIVE_PATH} (${(fs.statSync(ARCHIVE_PATH).size/1024/1024).toFixed(2)} MB)`);

// 1. Get upload credentials
process.stdout.write('\n[1/4] Pobieranie upload credentials... ');
let creds;
try {
  const res = await axios.default.post(
    `${BASE_URL}/api/hosting/v1/files/upload-urls`,
    { username: USERNAME, domain: DOMAIN },
    { headers: authHeaders, timeout: 30000 }
  );
  creds = res.data;
  console.log('✓');
} catch (err) {
  console.error('✗');
  console.error('Błąd:', err.response?.data || err.message);
  process.exit(1);
}

const { url: uploadUrl, auth_key: authToken, rest_auth_key: authRestToken } = creds;
const archiveBasename = path.basename(ARCHIVE_PATH);
const fileSize = fs.statSync(ARCHIVE_PATH).size;
const uploadUrlWithFile = `${uploadUrl.replace(/\/$/, '')}/${archiveBasename}?override=true`;

const tusHeaders = {
  'X-Auth': authToken,
  'X-Auth-Rest': authRestToken,
  'upload-length': fileSize.toString(),
  'upload-offset': '0',
};

// 2. Pre-create file slot (required by Hostinger TUS)
process.stdout.write('[2/4] Inicjalizacja slotu... ');
try {
  await axios.default.post(uploadUrlWithFile, '', {
    headers: tusHeaders,
    timeout: 60000,
    validateStatus: (s) => s === 201,
  });
  console.log('✓');
} catch (err) {
  console.error('✗');
  console.error('Błąd pre-create:', err.response?.status, err.response?.data || err.message);
  process.exit(1);
}

// 3. TUS upload
process.stdout.write('[3/4] Upload TUS... 0%');
await new Promise((resolve, reject) => {
  const fileStream = fs.createReadStream(ARCHIVE_PATH);

  const upload = new tus.Upload(fileStream, {
    uploadUrl: uploadUrlWithFile,
    uploadSize: fileSize,
    chunkSize: 10 * 1024 * 1024,
    retryDelays: [1000, 2000, 4000, 8000],
    uploadDataDuringCreation: false,
    parallelUploads: 1,
    removeFingerprintOnSuccess: true,
    headers: tusHeaders,
    metadata: { filename: archiveBasename },
    onError: (err) => { console.error('\nUpload error:', err.message); reject(err); },
    onProgress: (uploaded, total) => {
      process.stdout.write(`\r[3/4] Upload TUS... ${Math.round(uploaded/total*100)}%`);
    },
    onSuccess: () => { process.stdout.write('\r[3/4] Upload TUS... ✓          \n'); resolve(); },
  });
  upload.start();
});

// 4. Trigger deploy
process.stdout.write('[4/4] Triggerowanie deploymentu... ');
try {
  const res = await axios.default.post(
    `${BASE_URL}/api/hosting/v1/accounts/${USERNAME}/websites/${DOMAIN}/deploy`,
    { archive_path: archiveBasename },
    { headers: authHeaders, timeout: 60000 }
  );
  console.log('✓');
  console.log('\n✅ Deploy zakończony!');
  console.log('   Strona: https://' + DOMAIN);
  console.log('   Odpowiedź:', JSON.stringify(res.data, null, 2));
} catch (err) {
  console.error('✗');
  console.error('Błąd deploy:', err.response?.data || err.message);
  process.exit(1);
}
