import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/sections";
import { COMPANY, CONTACT } from "@/lib/content";

export const metadata: Metadata = {
  title: "Polityka prywatności — Dawid Wierzycki",
  alternates: { canonical: "/polityka-prywatnosci/" },
  robots: { index: false },
};

const COOKIES: [string, string, string, string][] = [
  ["dw_cookie_consent", "ta strona", "zapamiętanie Twojej decyzji o cookies (niezbędne)", "12 miesięcy"],
  ["_ga, _ga_GV4K1F7LD2", "Google Analytics", "statystyki odwiedzin (za zgodą)", "do 2 lat"],
  ["_fbp", "Meta (piksel)", "pomiar skuteczności reklam i remarketing (za zgodą)", "do 90 dni"],
  ["cookies Cal.com", "Cal.com", "działanie kalendarza rezerwacji (niezbędne)", "sesja / do 12 miesięcy"],
];

const SECTIONS: { h: string; p: string[] }[] = [
  {
    h: "1. Administrator danych",
    p: [
      `Administratorem Twoich danych osobowych jest ${COMPANY.name}, ${COMPANY.street}, ${COMPANY.city}, NIP ${COMPANY.nip}, REGON ${COMPANY.regon} (dalej: „ja”). Ta sama jednoosobowa działalność prowadzi agencję InstaPara (instapara.pl).`,
      `We wszystkich sprawach dotyczących danych osobowych napisz na ${CONTACT.email}.`,
    ],
  },
  {
    h: "2. Jakie dane, w jakim celu i na jakiej podstawie",
    p: [
      "Strona nie ma kont użytkowników ani formularzy zapisujących dane na serwerze. Twoje dane (imię i nazwisko, adres e-mail, telefon, nazwa firmy, treść wiadomości lub odpowiedzi w formularzu rezerwacji) przetwarzam, gdy napiszesz do mnie e-mail, wyślesz wycenę z kalkulatora albo umówisz rozmowę w kalendarzu.",
      "Cele i podstawy prawne: odpowiedź na wiadomość, rozmowa i przygotowanie oferty — działania przed zawarciem umowy na Twoje żądanie (art. 6 ust. 1 lit. b RODO); wykonanie i rozliczenie umowy (art. 6 ust. 1 lit. b i c RODO — obowiązki podatkowe i księgowe); ustalenie, dochodzenie lub obrona roszczeń oraz kontakt w sprawie złożonej oferty (art. 6 ust. 1 lit. f RODO — mój prawnie uzasadniony interes); statystyki i reklamy — wyłącznie na podstawie Twojej zgody (art. 6 ust. 1 lit. a RODO), opisane w punkcie 6.",
      "Podanie danych jest dobrowolne, ale bez nich nie mogę odpowiedzieć na wiadomość, umówić rozmowy ani przygotować oferty. Nie podejmuję wobec Ciebie decyzji opartych wyłącznie na zautomatyzowanym przetwarzaniu.",
    ],
  },
  {
    h: "3. Jak długo przechowuję dane",
    p: [
      "Korespondencję i dane z rezerwacji bez zawartej umowy — do 12 miesięcy od ostatniego kontaktu. Dokumenty związane z umową i rozliczeniem — przez okres wymagany przepisami podatkowymi (5 lat od końca roku, w którym powstał obowiązek podatkowy), a w zakresie roszczeń — do upływu ich przedawnienia. Dane z cookies — przez okresy podane w tabeli w punkcie 6 lub do wycofania zgody.",
    ],
  },
  {
    h: "4. Komu przekazuję dane",
    p: [
      "Dostawcom usług, z których korzystam, wyłącznie w zakresie niezbędnym: hosting strony i poczty — Hostinger International Ltd.; kalendarz rezerwacji — Cal.com, Inc. (USA); spotkania online i kalendarz — Google Ireland Ltd. (Google Meet, Kalendarz Google); fakturowanie — IFIRMA S.A. (Wrocław) oraz biuro rachunkowe; statystyki i reklamy, tylko za Twoją zgodą — Google Ireland Ltd. (Google Analytics) i Meta Platforms Ireland Ltd. (piksel Meta).",
      "Nie sprzedaję danych i nie udostępniam ich innym firmom w celach marketingowych.",
    ],
  },
  {
    h: "5. Przekazywanie danych poza Europejski Obszar Gospodarczy",
    p: [
      "Część dostawców (Cal.com, Google, Meta) może przetwarzać dane w USA. Przekazanie odbywa się na podstawie decyzji Komisji Europejskiej w sprawie programu EU-US Data Privacy Framework (jeśli dostawca jest w nim certyfikowany) albo standardowych klauzul umownych zatwierdzonych przez Komisję Europejską. Kopię zabezpieczeń możesz otrzymać, pisząc na adres podany w punkcie 1.",
    ],
  },
  {
    h: "6. Pliki cookies, Google Analytics i piksel Meta",
    p: [
      "Strona używa plików cookies niezbędnych do działania oraz — tylko po kliknięciu „Akceptuję” w banerze — cookies analitycznych (Google Analytics 4) i marketingowych (piksel Meta). Bez zgody GA4 działa w trybie zgody Google: nie zapisuje cookies i wysyła wyłącznie anonimowe sygnały bez identyfikatorów, a piksel Meta w ogóle się nie ładuje.",
      "Google Analytics pokazuje mi, z których podstron korzystasz i co działa (np. ile osób umawia rozmowę lub wysyła wycenę). Piksel Meta pozwala mierzyć skuteczność reklam na Facebooku i Instagramie oraz pokazywać reklamy osobom, które odwiedziły stronę. W zakresie zbierania i przekazywania danych przez piksel jestem współadministratorem razem z Meta Platforms Ireland Ltd.; dalsze przetwarzanie danych przez Meta opisuje polityka prywatności Meta (facebook.com/privacy/policy).",
      "Zgodę możesz w każdej chwili wycofać przyciskiem „Ustawienia cookies” w stopce strony — wycofanie nie wpływa na zgodność z prawem przetwarzania przed jego dokonaniem. Możesz też zarządzać cookies w ustawieniach przeglądarki. Serwer zapisuje standardowe logi techniczne (m.in. adres IP, czas wizyty) w celu zapewnienia bezpieczeństwa (art. 6 ust. 1 lit. f RODO).",
    ],
  },
  {
    h: "7. Twoje prawa",
    p: [
      "Masz prawo do dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przeniesienia, a także prawo sprzeciwu wobec przetwarzania opartego na prawnie uzasadnionym interesie oraz prawo do wycofania zgody w dowolnym momencie.",
      `Aby skorzystać z tych praw, napisz na ${CONTACT.email}. Przysługuje Ci też skarga do Prezesa Urzędu Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa).`,
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
        <p className="mt-4 text-sm text-muted">Obowiązuje od 4 października 2026 r.</p>
        <div className="mt-12 space-y-10">
          {SECTIONS.map((s) => (
            <section key={s.h}>
              <h2 className="text-xl font-medium">{s.h}</h2>
              {s.p.map((t) => (
                <p key={t} className="mt-3 leading-relaxed text-ink/75">
                  {t}
                </p>
              ))}
              {s.h.startsWith("6.") && (
                <div className="mt-5 overflow-x-auto rounded-2xl border border-line">
                  <table className="w-full min-w-[560px] text-left text-sm">
                    <thead className="bg-paper text-muted">
                      <tr>{["Plik cookie", "Dostawca", "Cel", "Czas"].map((h) => <th key={h} className="px-4 py-3 font-medium">{h}</th>)}</tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                      {COOKIES.map((r) => (
                        <tr key={r[0]}>{r.map((c, i) => <td key={i} className="px-4 py-3 align-top text-ink/75">{c}</td>)}</tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
