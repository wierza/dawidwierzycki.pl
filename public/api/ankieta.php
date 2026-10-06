<?php
// Odbiera ankietę z /ankieta/ i wysyła ją mailem. Nic nie zapisuje na serwerze.
header('Content-Type: application/json; charset=utf-8');
header('X-Robots-Tag: noindex');

const TO = 'dawid@wierzycki.pl';
const FROM = 'ankieta@dawidwierzycki.pl';

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

$headers = implode("\r\n", [
  'From: =?UTF-8?B?' . base64_encode('Ankieta dawidwierzycki.pl') . '?= <' . FROM . '>',
  'Reply-To: ' . $email,
  'MIME-Version: 1.0',
  'Content-Type: text/plain; charset=UTF-8',
  'Content-Transfer-Encoding: 8bit',
]);

$sent = mail(TO, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, $headers, '-f' . FROM);
reply($sent ? 200 : 500, ['ok' => $sent]);
