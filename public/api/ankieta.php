<?php
// Odbiera ankietę z /ankieta/ i wysyła ją mailem. Nic nie zapisuje na serwerze.
header('Content-Type: application/json; charset=utf-8');
header('X-Robots-Tag: noindex');

const TO = 'dawid@wierzycki.pl';
const FROM = 'ankieta@dawidwierzycki.pl';
const SMTP_HOST = 'ssl://smtp.hostinger.com';
const SMTP_PORT = 465;
// Hasło do skrzynki FROM leży w smtp-haslo.php (poza gitem): <?php return 'haslo';
const SMTP_PASS_FILE = __DIR__ . '/smtp-haslo.php';

function reply(int $code, array $body): void {
  http_response_code($code);
  echo json_encode($body, JSON_UNESCAPED_UNICODE);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') reply(405, ['ok' => false]);

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin && !preg_match('#^https://(www\.)?dawidwierzycki\.pl$#', $origin)) reply(403, ['ok' => false]);

$data = json_decode(file_get_contents('php://input'), true);
if (!is_array($data)) reply(400, ['ok' => false]);

// Boty: wypełnione ukryte pole albo ankieta „wypełniona” w kilka sekund. Udajemy sukces.
if (!empty($data['website']) || (int)($data['elapsed'] ?? 0) < 8000) reply(200, ['ok' => true]);

$clean = fn($v, $max) => mb_substr(trim(str_replace(["\r", "\0"], '', (string)($v ?? ''))), 0, $max);
$name = preg_replace('/[\n<>]/', '', $clean($data['name'] ?? '', 100));
$company = preg_replace('/[\n<>]/', '', $clean($data['company'] ?? '', 150));
$email = $clean($data['email'] ?? '', 150);
$summary = $clean($data['summary'] ?? '', 12000);

if ($name === '' || $summary === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) reply(422, ['ok' => false]);

$subject = 'Ankieta: ' . $name . ($company !== '' ? ' (' . $company . ')' : '');
$body = $summary . "\n\n--\nWysłano z dawidwierzycki.pl/ankieta, " . date('Y-m-d H:i') . "\nOdpowiedz na tego maila, żeby napisać do klienta.";

$headers = [
  'Date: ' . date('r'),
  'From: =?UTF-8?B?' . base64_encode('Ankieta dawidwierzycki.pl') . '?= <' . FROM . '>',
  'To: <' . TO . '>',
  'Reply-To: ' . $email,
  'Subject: =?UTF-8?B?' . base64_encode($subject) . '?=',
  'Message-ID: <' . bin2hex(random_bytes(12)) . '@dawidwierzycki.pl>',
  'MIME-Version: 1.0',
  'Content-Type: text/plain; charset=UTF-8',
  'Content-Transfer-Encoding: base64',
];
$message = implode("\r\n", $headers) . "\r\n\r\n" . chunk_split(base64_encode($body));

$sent = smtp_send($message);
reply($sent ? 200 : 500, ['ok' => $sent]);

/** Wysyła gotową wiadomość przez SMTP Hostingera, logując się do skrzynki FROM. */
function smtp_send(string $message): bool {
  $pass = is_file(SMTP_PASS_FILE) ? include SMTP_PASS_FILE : '';
  if (!is_string($pass) || $pass === '') { error_log('ankieta: brak hasła SMTP'); return false; }

  $fp = @stream_socket_client(SMTP_HOST . ':' . SMTP_PORT, $errno, $errstr, 15);
  if (!$fp) { error_log("ankieta: SMTP $errstr"); return false; }
  stream_set_timeout($fp, 15);

  $read = function () use ($fp): string {
    $out = '';
    while (($line = fgets($fp, 515)) !== false) {
      $out .= $line;
      if (strlen($line) < 4 || $line[3] === ' ') break;
    }
    return $out;
  };
  $cmd = function (string $c, int $expect) use ($fp, $read): bool {
    fwrite($fp, $c . "\r\n");
    $r = $read();
    if ((int)substr($r, 0, 3) !== $expect) { error_log('ankieta: SMTP ' . trim($r)); return false; }
    return true;
  };

  $ok = (int)substr($read(), 0, 3) === 220
    && $cmd('EHLO dawidwierzycki.pl', 250)
    && $cmd('AUTH LOGIN', 334)
    && $cmd(base64_encode(FROM), 334)
    && $cmd(base64_encode($pass), 235)
    && $cmd('MAIL FROM:<' . FROM . '>', 250)
    && $cmd('RCPT TO:<' . TO . '>', 250)
    && $cmd('DATA', 354)
    // Kropka na początku linii kończy DATA, więc ją podwajamy
    && $cmd(preg_replace('/^\./m', '..', $message) . "\r\n.", 250);

  @fwrite($fp, "QUIT\r\n");
  fclose($fp);
  return $ok;
}
