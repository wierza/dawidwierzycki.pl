#!/bin/bash
# Zapisuje hasło do skrzynki ankieta@dawidwierzycki.pl w public/api/smtp-haslo.php (plik jest w .gitignore).
cd "$(dirname "$0")/.." || exit 1
read -rsp "Hasło do ankieta@dawidwierzycki.pl: " P
echo
if [ -z "$P" ]; then echo "Nie wpisano hasła."; exit 1; fi
ESC=$(printf '%s' "$P" | sed -e 's/\\/\\\\/g' -e "s/'/\\\\'/g")
printf "<?php return '%s';\n" "$ESC" > public/api/smtp-haslo.php
echo "Zapisane w public/api/smtp-haslo.php"
