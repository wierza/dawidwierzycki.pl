import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/sections";
import { CONTACT } from "@/lib/content";

export const metadata: Metadata = {
  title: "Polityka prywatności — Dawid Wierzycki",
  alternates: { canonical: "/polityka-prywatnosci/" },
  robots: { index: false },
};

const SECTIONS: { h: string; p: string[] }[] = [
  {
    h: "1. Administrator danych",
    p: [
      `Administratorem Twoich danych osobowych jest Dawid Wierzycki. Kontakt w sprawach danych osobowych: ${CONTACT.email}.`,
    ],
  },
  {
    h: "2. Jakie dane i po co",
    p: [
      "Strona nie ma kont użytkowników. Twoje dane (imię, nazwisko, adres e-mail, nazwa firmy, telefon i treść wiadomości) przetwarzam tylko wtedy, gdy sam do mnie napiszesz lub umówisz rozmowę w kalendarzu.",
      "Przetwarzam je, żeby odpowiedzieć na wiadomość i przygotować ofertę (art. 6 ust. 1 lit. b RODO), a jeśli zawrzemy umowę — żeby ją wykonać i rozliczyć (art. 6 ust. 1 lit. b i c RODO). Korespondencję mogę przechowywać także w celu ewentualnego dochodzenia roszczeń (art. 6 ust. 1 lit. f RODO).",
    ],
  },
  {
    h: "3. Jak długo",
    p: [
      "Korespondencję bez zawartej umowy przechowuję do 12 miesięcy. Dokumenty związane z umową i rozliczeniem — przez okres wymagany przepisami podatkowymi (zwykle 5 lat od końca roku podatkowego).",
    ],
  },
  {
    h: "4. Komu przekazuję dane",
    p: [
      "Dostawcom usług, z których korzystam: hostingu strony i poczty (Hostinger), poczty e-mail, kalendarza do umawiania rozmów (Cal.com, Inc., USA — przekazanie danych na podstawie standardowych klauzul umownych), analityki (Google Ireland Ltd., za Twoją zgodą) oraz biura rachunkowego — tylko w zakresie niezbędnym do świadczenia usług. Nie sprzedaję danych i nie przekazuję ich w celach marketingowych.",
    ],
  },
  {
    h: "5. Pliki cookies",
    p: [
      "Strona używa plików cookies niezbędnych do działania (m.in. zapamiętanie Twojej decyzji o cookies) oraz — tylko za Twoją zgodą — cookies analitycznych Google Analytics 4 (Google Ireland Ltd.). Analityka pokazuje mi, z których stron korzystasz i co działa (np. ile osób umawia rozmowę), bez identyfikowania Cię z imienia i nazwiska. Dane mogą być przekazywane do USA na podstawie standardowych klauzul umownych i programu EU-US Data Privacy Framework.",
      "Podstawą jest Twoja zgoda (art. 6 ust. 1 lit. a RODO), którą możesz w każdej chwili wycofać przyciskiem „Ustawienia cookies” w stopce. Wbudowany kalendarz Cal.com może zapisywać pliki cookies niezbędne do jego działania. Serwer może zapisywać standardowe logi techniczne (np. adres IP, czas wizyty) w celu zapewnienia bezpieczeństwa.",
    ],
  },
  {
    h: "6. Twoje prawa",
    p: [
      "Masz prawo do dostępu do danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przeniesienia oraz do sprzeciwu. Możesz też złożyć skargę do Prezesa Urzędu Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa).",
      `Aby skorzystać z praw, napisz na ${CONTACT.email}.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-32 sm:px-6 sm:pt-40">
        <h1 className="font-display text-5xl leading-tight sm:text-6xl">
          Polityka <em>prywatności</em>
        </h1>
        <p className="mt-4 text-sm text-muted">Obowiązuje od 3 października 2026 r.</p>
        <div className="mt-12 space-y-10">
          {SECTIONS.map((s) => (
            <section key={s.h}>
              <h2 className="text-xl font-medium">{s.h}</h2>
              {s.p.map((t) => (
                <p key={t} className="mt-3 leading-relaxed text-ink/75">
                  {t}
                </p>
              ))}
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
