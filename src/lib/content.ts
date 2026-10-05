// Wszystkie treści strony w jednym miejscu — tu zmieniasz ceny, opisy i FAQ.

export const COMPANY = {
  name: "Instapara Dawid Wierzycki",
  street: "Proszkowa 6",
  city: "56-100 Proszkowa",
  nip: "6782866804",
  regon: "543687373",
};

export const SOCIALS = [
  { name: "Facebook", url: "https://www.facebook.com/profile.php?id=61594763895799" },
  { name: "Instagram", url: "https://www.instagram.com/dawid.wierzycki/", handle: "@dawid.wierzycki" },
];

export const CONTACT = {
  email: "dawid@wierzycki.pl",
  // Wydarzenie Cal.com „Rozmowa o stronie” (kalendarz jest wbudowany w sekcję #rozmowa).
  calUrl: "https://cal.com/instapara/rozmowa-o-stronie-www",
};

export const FEATURES = [
  "Płatności BLIK i kartą",
  "Apple Pay i Google Pay",
  "Automatyczne faktury",
  "Newsletter i automatyczne maile",
  "Google Analytics i piksel Meta",
  "Baner cookies i RODO",
  "Wizytówka Google",
  "Świetna wersja na telefon",
];

export type Project = {
  slug: string;
  title: string;
  client: string;
  url: string;
  urlLabel: string;
  problem: string;
  solution: string;
  features: string[];
  stack: string[];
  desktop: string;
  mobile: string;
  scroll: boolean;
};

export const PROJECTS: Project[] = [
  {
    slug: "sklep",
    title: "Sklep z e-bookiem „Adwokat w social mediach”",
    client: "InstaPara · sprzedaż produktu cyfrowego",
    url: "https://sklep.instapara.pl",
    urlLabel: "sklep.instapara.pl",
    problem:
      "Sprzedaż e-booka dla adwokatów bez ręcznej obsługi: bez wysyłania plików, przepisywania danych do faktur i dopisywania ludzi do listy mailingowej.",
    solution:
      "Sklep, który sam przyjmuje płatność, wysyła e-book, wystawia fakturę i zapisuje klienta do newslettera. Formularz zamówienia ma przy tym tylko trzy pola.",
    features: [
      "Płatności BLIK, kartą, Apple Pay i Google Pay",
      "Krótki formularz: e-mail, imię i nazwisko; dane do faktury tylko na życzenie (ze sprawdzaniem NIP)",
      "Faktury wystawiane i wysyłane automatycznie z iFirmy",
      "Zapis do newslettera i seria maili powitalnych w MailerLite",
      "Google Analytics i piksel Meta z trybem zgód",
      "Regulamin, polityka prywatności i zgody konsumenckie",
    ],
    stack: ["WordPress", "WooCommerce", "Stripe", "iFirma", "MailerLite"],
    desktop: "/realizacje/sklep-desktop.jpg",
    mobile: "/realizacje/sklep-mobile.jpg",
    scroll: false,
  },
  {
    slug: "instapara",
    title: "Strona agencji marketingowej InstaPara",
    client: "InstaPara · usługi premium",
    url: "https://instapara.pl",
    urlLabel: "instapara.pl",
    problem:
      "Agencja pracująca z prawnikami, klinikami i agentami nieruchomości potrzebowała strony, która buduje zaufanie, zanim klient zadzwoni.",
    solution:
      "Szybka strona z osobnymi podstronami dla każdej branży, blogiem eksperckim i rezerwacją rozmowy w kalendarzu, w trzech językach.",
    features: [
      "Podstrony dla prawników, klinik i nieruchomości",
      "Blog ekspercki przyjazny Google i wyszukiwarkom AI",
      "Rezerwacja rozmowy w kalendarzu (Cal.com)",
      "Opinie z Trustpilota",
      "Wersje PL, EN i DE",
      "Baner cookies, Google Analytics i piksel Meta",
    ],
    stack: ["Next.js", "React", "Tailwind", "Framer Motion", "Hostinger"],
    desktop: "/realizacje/instapara-desktop.jpg",
    mobile: "/realizacje/instapara-mobile.jpg",
    scroll: true,
  },
];

export const CONCEPTS = [
  {
    slug: "restauracja",
    name: "Bistro Sezon",
    kind: "Restauracja",
    desc: "Menu w zakładkach, rezerwacja stolika z wyborem godziny, galeria i mapa dojazdu.",
  },
  {
    slug: "kancelaria",
    name: "Kancelaria Adwokacka",
    kind: "Kancelaria prawna",
    desc: "Specjalizacje, umawianie konsultacji online lub stacjonarnie i treści zgodne z Kodeksem Etyki Adwokackiej.",
  },
  {
    slug: "fizjoterapia",
    name: "Studio Ruchu",
    kind: "Gabinet fizjoterapii",
    desc: "Cennik zabiegów, zespół i rezerwacja wizyty w 4 krokach: zabieg, specjalista, termin, dane.",
  },
  {
    slug: "palarnia",
    name: "Ziarno & Żar",
    kind: "Sklep internetowy",
    desc: "Produkty z filtrami, wybór gramatury i mielenia, koszyk, dostawa do paczkomatu i płatność BLIK.",
  },
];

export const PACKAGES = [
  {
    name: "Strona",
    price: 1500,
    pilot: 1000,
    time: "7 dni roboczych",
    lead: "Dla firm, które chcą profesjonalnie wyglądać w sieci i dostawać zapytania.",
    items: [
      "Do 5 podstron albo jedna długa strona",
      "Blog gotowy do pisania (liczy się jako 1 z 5 podstron)",
      "Nowoczesny wygląd w kolorach Twojej marki",
      "Świetna wersja na telefon",
      "Formularz kontaktowy i przycisk do telefonu",
      "Baner cookies i polityka prywatności",
      "Google Analytics i wizytówka Google",
      "SEO na start: tytuły i opisy, Google Search Console, dane lokalnej firmy, wizytówka Google",
      "Teksty na podstawie Twojego formularza",
      "Jedna tura poprawek",
      "Nagranie z instrukcją, jak zmieniać treści",
    ],
  },
  {
    name: "Sklep",
    price: 3000,
    pilot: null,
    time: "14 dni roboczych",
    lead: "Dla firm, które chcą sprzedawać online: produkty, usługi lub pliki do pobrania.",
    items: [
      "Wszystko z pakietu Strona",
      "Do 20 produktów z kategoriami",
      "Płatności BLIK, kartą, Apple Pay i Google Pay",
      "Wysyłka i koszty dostawy albo produkty cyfrowe",
      "Maile do klienta o zamówieniu",
      "Regulamin i polityka sklepu (na wzorze)",
      "Analityka sprzedaży i piksel Meta",
      "Zamówienie testowe i szkolenie z obsługi",
    ],
  },
];

export const ADDONS = [
  { id: "teksty", label: "Teksty pisane od zera", desc: "piszę treści na podstawie rozmowy", price: 300 },
  { id: "lejek", label: "Lejek z darmowym e-bookiem", desc: "zapis na listę, e-book, seria maili", price: 1500 },
  { id: "faktury", label: "Automatyczne faktury", desc: "iFirma, Fakturownia lub inFakt", price: 400 },
  { id: "rezerwacje", label: "Kalendarz rezerwacji", desc: "klient sam umawia wizytę lub rozmowę", price: 300 },
];

export const EXTRA_PAGE_PRICE = 150;
export const ARTICLE_PRICE = 150;

export const CARE = [
  { id: "brak", label: "Bez opieki", price: 0, desc: "poprawki według stawki 150 zł/h" },
  { id: "podstawowa", label: "Opieka podstawowa", price: 99, desc: "aktualizacje, kopie zapasowe, czuwanie nad działaniem" },
  { id: "pelna", label: "Opieka z poprawkami", price: 149, desc: "jak podstawowa + do 1 h zmian w miesiącu" },
];

export const STEPS = [
  { title: "Rozmowa", time: "20 minut", text: "Opowiadasz o firmie i klientach. Mówię, co ma sens, ile to kosztuje i kiedy będzie gotowe." },
  { title: "Formularz i zaliczka", time: "1 dzień", text: "Wypełniasz krótki formularz (usługi, zdjęcia, dane). Wpłacasz 50%, a ja rezerwuję termin." },
  { title: "Budowa", time: "strona 7 dni · sklep 14 dni", text: "Buduję stronę lub sklep. W trakcie dostajesz link do podglądu, żeby nic Cię nie zaskoczyło." },
  { title: "Poprawki i start", time: "1–2 dni", text: "Wprowadzam Twoje uwagi, podpinam domenę i Google. Dostajesz nagranie, jak samodzielnie zmieniać treści." },
];

export const FAQ = [
  {
    q: "Ile trwa zrobienie strony?",
    a: "Strona: 7 dni roboczych, sklep: 14. Liczę od dnia, w którym dostanę wypełniony formularz i zdjęcia. Najczęściej to właśnie materiały decydują o tempie.",
  },
  {
    q: "Kto płaci za domenę i hosting?",
    a: "Ty, na swoim koncie, żeby strona zawsze była Twoja. Zwykle to kilkanaście–kilkadziesiąt złotych miesięcznie. Pomagam wybrać i wszystko konfiguruję.",
  },
  {
    q: "Czy będę mógł sam zmieniać treści?",
    a: "Tak. Strony i sklepy buduję na WordPressie, więc godziny otwarcia, cennik, produkty czy wpisy na blogu zmienisz sam. Dostajesz krótkie nagranie z instrukcją.",
  },
  {
    q: "Czy w cenie jest blog?",
    a: "Tak. Blog gotowy do pisania (lista wpisów, kategorie, szablon artykułu) liczy się jako jedna z 5 podstron, a wpisy dodajesz sam. Jeśli nie masz czasu pisać, przygotuję artykuły pod frazy Twoich klientów. Cena: 150 zł za tekst (ok. 1 000–1 500 słów).",
  },
  {
    q: "Nie mam tekstów ani zdjęć. Co wtedy?",
    a: "Na podstawie formularza przygotuję teksty do Twojej akceptacji. Jeśli wolisz, żebym napisał wszystko od zera po rozmowie, to dodatek za 300 zł. Zdjęcia mogą być z telefonu albo z banku zdjęć.",
  },
  {
    q: "Czy strona będzie widoczna w Google?",
    a: "W cenie dostajesz SEO na start: tytuły i opisy pod frazy Twoich klientów (np. „fizjoterapeuta Poznań”), zgłoszenie strony w Google Search Console, dane lokalnej firmy dla Google, połączenie z wizytówką Google i szybkie ładowanie. Nikt uczciwy nie zagwarantuje pierwszego miejsca. Regularne pozycjonowanie (artykuły, linki, analiza konkurencji) to osobna usługa, którą mogę wycenić.",
  },
  {
    q: "Jakie płatności obsłuży sklep?",
    a: "BLIK, karty, Apple Pay i Google Pay, przez Stripe albo Przelewy24. Konto płatności zakładasz na swoją firmę, ja je podłączam i testuję.",
  },
  {
    q: "Czy strona będzie zgodna z RODO?",
    a: "Tak: polityka prywatności, baner cookies, zgody przy formularzach. Regulamin sklepu przygotowuję na sprawdzonym wzorze. Przy nietypowej sprzedaży warto dać go jeszcze do przejrzenia prawnikowi.",
  },
  {
    q: "Co, jeśli coś przestanie działać?",
    a: "W opiece miesięcznej (od 99 zł) pilnuję aktualizacji i kopii zapasowych, więc do awarii zwykle nie dochodzi. Bez opieki poprawki rozliczam według stawki 150 zł za godzinę.",
  },
  {
    q: "Jak wygląda płatność?",
    a: "50% zaliczki na start i 50% po oddaniu strony. Wystawiam fakturę bez VAT, bo korzystam ze zwolnienia podmiotowego (art. 113 ust. 1 ustawy o VAT), więc podane ceny są cenami końcowymi.",
  },
];
