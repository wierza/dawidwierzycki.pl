# dawidwierzycki.pl — portfolio (strony i sklepy internetowe)

Next.js 15 (eksport statyczny) + Tailwind 4 + Framer Motion.

- Treści, ceny, FAQ, realizacje: `src/lib/content.ts`
- Link do Cal.com: `CONTACT.calUrl` w `src/lib/content.ts` (pusty = przyciski otwierają e-mail)
- Zrzuty realizacji: `public/realizacje/`, zdjęcie: `public/dawid.jpg`

## Podgląd
    npm run dev            # http://localhost:3000

## Wdrożenie na Hostinger
    npm run build
    cd out && zip -qr /tmp/dawidwierzycki_deploy.zip . && cd ..
    HOSTINGER_API_TOKEN=... node scripts/deploy-hostinger.mjs

Wymaga strony `dawidwierzycki.pl` dodanej w hPanelu Hostinger (Strony → Dodaj stronę → pusta strona).
