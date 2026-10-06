// Ankieta przed rozmową (/ankieta). Strona nie jest w menu: link wysyłam razem z zaproszeniem na rozmowę.

export type Option = { id: string; label: string; desc?: string };
export type Question = {
  id: string;
  title: string;
  lead: string;
  multi?: boolean;
  options: Option[];
};

export const QUESTIONS: Question[] = [
  {
    id: "cel",
    title: "Co ma przede wszystkim robić Twoja strona?",
    lead: "Wybierz najważniejszy efekt. Jeśli nie masz pewności, też możesz to zaznaczyć.",
    options: [
      { id: "zapytania", label: "Przynosić zapytania", desc: "telefony i wiadomości od nowych klientów" },
      { id: "wizerunek", label: "Profesjonalnie przedstawić firmę", desc: "pokazać ofertę i zbudować zaufanie" },
      { id: "realizacje", label: "Pokazać realizacje", desc: "projekty, produkty albo efekty pracy" },
      { id: "rezerwacje", label: "Ułatwić rezerwacje i zapisy", desc: "klient sam wybiera termin" },
      { id: "sprzedaz", label: "Sprzedawać online", desc: "sklep z koszykiem i płatnościami" },
      { id: "nie-wiem", label: "Nie mam jeszcze pewności", desc: "dobierzemy kierunek na rozmowie" },
    ],
  },
  {
    id: "rynek",
    title: "Gdzie są Twoi klienci?",
    lead: "Od tego zależą treści pod Google i ewentualne wersje językowe.",
    options: [
      { id: "lokalnie", label: "Głównie lokalnie", desc: "jedno miasto albo najbliższa okolica" },
      { id: "polska", label: "W całej Polsce", desc: "klienci z wielu miast" },
      { id: "zagranica", label: "W Polsce i za granicą", desc: "potrzebuję wersji w innym języku" },
    ],
  },
  {
    id: "kontakt",
    title: "Jak klient ma się z Tobą kontaktować?",
    lead: "Można zaznaczyć kilka odpowiedzi. Telefon i e-mail i tak będą widoczne na stronie.",
    multi: true,
    options: [
      { id: "telefon", label: "Zadzwonić", desc: "przycisk do telefonu w widocznym miejscu" },
      { id: "formularz", label: "Wysłać formularz albo e-mail", desc: "opisać potrzebę bez dzwonienia" },
      { id: "termin", label: "Zarezerwować termin", desc: "wizyta, konsultacja albo rozmowa w kalendarzu" },
      { id: "dojazd", label: "Przyjechać na miejsce", desc: "adres, mapa i godziny otwarcia" },
      { id: "komunikator", label: "Napisać na Messengerze albo WhatsAppie", desc: "szybka wiadomość z telefonu" },
    ],
  },
  {
    id: "tresci",
    title: "Co powinno znaleźć się na stronie?",
    lead: "Można zaznaczyć kilka odpowiedzi. Na tej podstawie zaplanuję podstrony. W pakiecie jest do 5.",
    multi: true,
    options: [
      { id: "oferta", label: "Oferta i usługi", desc: "co robisz i dla kogo" },
      { id: "cennik", label: "Cennik", desc: "ceny albo widełki cenowe" },
      { id: "o-nas", label: "O firmie i zespole", desc: "ludzie, doświadczenie, sposób pracy" },
      { id: "portfolio", label: "Realizacje albo galeria", desc: "zdjęcia prac, projektów, produktów" },
      { id: "opinie", label: "Opinie klientów", desc: "np. z wizytówki Google albo Facebooka" },
      { id: "wspolpraca", label: "Jak wygląda współpraca", desc: "kolejne kroki przed rozpoczęciem usługi" },
      { id: "faq", label: "Najczęstsze pytania", desc: "odpowiedzi na wątpliwości przed kontaktem" },
      { id: "blog", label: "Blog albo porady", desc: "artykuły, które pomagają w Google" },
      { id: "kariera", label: "Praca u nas", desc: "ogłoszenia rekrutacyjne" },
    ],
  },
  {
    id: "materialy",
    title: "Co masz już przygotowane?",
    lead: "Nie trzeba mieć wszystkiego. Chcę wiedzieć, od czego zaczynamy.",
    multi: true,
    options: [
      { id: "logo", label: "Logo", desc: "najlepiej w dobrej jakości" },
      { id: "zdjecia", label: "Zdjęcia", desc: "firmy, zespołu, realizacji. Mogą być z telefonu" },
      { id: "teksty", label: "Teksty", desc: "opis firmy i usług" },
      { id: "kolory", label: "Kolory i styl marki", desc: "wizytówki, ulotki, szyld" },
      { id: "nic", label: "Jeszcze nic", desc: "potrzebuję pomocy od początku" },
    ],
  },
  {
    id: "obecnosc",
    title: "Co już masz w internecie?",
    lead: "Można zaznaczyć kilka odpowiedzi. Na rozmowie ustalimy, kto ma do tego dostęp.",
    multi: true,
    options: [
      { id: "domena", label: "Domenę", desc: "adres strony, np. twojafirma.pl" },
      { id: "strona", label: "Obecną stronę", desc: "do odświeżenia albo przeniesienia" },
      { id: "google", label: "Wizytówkę Google", desc: "profil firmy w Mapach Google" },
      { id: "social", label: "Facebooka albo Instagrama", desc: "profil firmowy" },
      { id: "brak", label: "Nic z tych rzeczy", desc: "zaczynamy od zera" },
    ],
  },
  {
    id: "dodatki",
    title: "Czy trzeba uwzględnić coś dodatkowego?",
    lead: "Można zaznaczyć kilka odpowiedzi albo przejść dalej bez dodatków.",
    multi: true,
    options: [
      { id: "rezerwacje", label: "Kalendarz rezerwacji", desc: "klient sam umawia wizytę lub rozmowę" },
      { id: "platnosci", label: "Płatności online", desc: "BLIK, karta, zaliczki albo sklep" },
      { id: "faktury", label: "Automatyczne faktury", desc: "iFirma, Fakturownia lub inFakt" },
      { id: "newsletter", label: "Zapis na newsletter", desc: "własna lista mailingowa, np. z darmowym e-bookiem" },
      { id: "teksty", label: "Teksty pisane od zera", desc: "piszę treści na podstawie rozmowy" },
      { id: "artykuly", label: "Artykuły na blog", desc: "regularne teksty pod Google" },
      { id: "brak", label: "Nic dodatkowego", desc: "zaczynam od podstawowego zakresu" },
    ],
  },
  {
    id: "opieka",
    title: "Jakiej pomocy potrzebujesz po starcie?",
    lead: "Opieka jest opcjonalna i rozliczana osobno co miesiąc.",
    options: [
      { id: "sam", label: "Sam zmieniam treści", desc: "wystarczy mi panel i nagranie z instrukcją" },
      { id: "podstawowa", label: "Spokój o techniczne sprawy", desc: "aktualizacje i kopie zapasowe" },
      { id: "pelna", label: "Stała pomoc przy zmianach", desc: "wolę zlecać bieżące poprawki" },
      { id: "nie-wiem", label: "Jeszcze nie wiem", desc: "ustalimy po rozmowie" },
    ],
  },
  {
    id: "termin",
    title: "Na kiedy potrzebujesz strony?",
    lead: "Strona powstaje w 7 dni roboczych, sklep w 14, licząc od otrzymania materiałów i zaliczki.",
    options: [
      { id: "pilne", label: "Jak najszybciej", desc: "w ciągu 2 tygodni" },
      { id: "miesiac", label: "W ciągu miesiąca", desc: "" },
      { id: "kwartal", label: "W ciągu 1–3 miesięcy", desc: "" },
      { id: "bez-terminu", label: "Bez pośpiechu", desc: "na razie się rozglądam" },
    ],
  },
  {
    id: "decyzja",
    title: "Kto podejmuje decyzję o stronie?",
    lead: "Jeśli decyduje więcej osób, warto, żeby były na rozmowie.",
    options: [
      { id: "ja", label: "Ja", desc: "decyduję samodzielnie" },
      { id: "wspolnik", label: "Ja razem ze wspólnikiem albo rodziną", desc: "" },
      { id: "ktos", label: "Ktoś inny", desc: "przygotowuję informacje dla szefa albo zarządu" },
    ],
  },
];

export type Answers = Record<string, string[]>;

export const label = (qid: string, oid: string) =>
  QUESTIONS.find((q) => q.id === qid)?.options.find((o) => o.id === oid)?.label ?? oid;
