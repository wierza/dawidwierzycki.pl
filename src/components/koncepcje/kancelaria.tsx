"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Building2, Check, ChevronDown, Mail, MapPin, Phone, Scale, ScrollText, Users, Video } from "lucide-react";
import { ConceptBadge } from "@/components/concept-badge";

const IMG = "/koncepcje/kancelaria";
const NAVY = "#1d2a3a";

const AREAS = [
  {
    icon: Users,
    title: "Prawo rodzinne",
    lead: "Rozwody, alimenty, kontakty z dzieckiem, podział majątku.",
    items: ["Rozwód z orzekaniem o winie i bez", "Ustalenie i podwyższenie alimentów", "Plan wychowawczy i kontakty z dzieckiem", "Podział majątku wspólnego"],
  },
  {
    icon: ScrollText,
    title: "Sprawy spadkowe",
    lead: "Stwierdzenie nabycia spadku, zachowek, dział spadku.",
    items: ["Stwierdzenie nabycia spadku", "Zachowek: dochodzenie i obrona", "Dział spadku i zniesienie współwłasności", "Odrzucenie spadku z długami"],
  },
  {
    icon: Building2,
    title: "Umowy i nieruchomości",
    lead: "Bezpieczny zakup mieszkania, umowy deweloperskie, najem.",
    items: ["Analiza umowy deweloperskiej", "Due diligence nieruchomości", "Umowy najmu i najmu okazjonalnego", "Spory z wykonawcami"],
  },
];

const FAQ = [
  ["Ile kosztuje pierwsza konsultacja?", "Konsultacja trwa do 60 minut. Jej koszt podaję przy umawianiu terminu, a po rozmowie otrzymujesz pisemną propozycję wynagrodzenia za prowadzenie sprawy."],
  ["Czy mogę skonsultować się online?", "Tak. Spotykamy się przez bezpieczne połączenie wideo, a dokumenty możesz przesłać wcześniej e-mailem."],
  ["Jakie dokumenty przygotować?", "Wszystko, co dotyczy sprawy: umowy, pisma z sądu, korespondencję. Po umówieniu terminu otrzymasz krótką listę."],
  ["Czy informacje o mojej sprawie są poufne?", "Tak. Adwokata obowiązuje tajemnica adwokacka, bez wyjątków i bez ograniczenia w czasie."],
];

function workdays(n: number) {
  const out: Date[] = [];
  const d = new Date();
  while (out.length < n) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0 && d.getDay() !== 6) out.push(new Date(d));
  }
  return out;
}
const fmtDay = new Intl.DateTimeFormat("pl-PL", { weekday: "short" });
const fmtDate = new Intl.DateTimeFormat("pl-PL", { day: "numeric", month: "short" });
const SLOTS = ["9:00", "10:30", "12:00", "14:00", "15:30", "17:00"];

function Booking() {
  const days = useMemo(() => workdays(8), []);
  const [mode, setMode] = useState<"stacjonarnie" | "online">("online");
  const [day, setDay] = useState(0);
  const [slot, setSlot] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  // „Zajęte” terminy — deterministycznie, żeby kalendarz wyglądał realistycznie
  const busy = (d: number, s: number) => (d * 3 + s * 5) % 7 === 0;

  if (done)
    return (
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="rounded-3xl bg-white p-10 text-center shadow-xl">
        <div className="mx-auto grid size-14 place-items-center rounded-full bg-[#1d2a3a] text-white"><Check /></div>
        <p className="mt-6 font-(family-name:--c-display) text-3xl">Termin zarezerwowany</p>
        <p className="mt-3 text-[#1d2a3a]/70">
          {fmtDay.format(days[day])}, {fmtDate.format(days[day])}, godz. {slot} · {mode}. Potwierdzenie i listę dokumentów wyślemy e-mailem.
        </p>
        <button onClick={() => { setDone(false); setSlot(null); }} className="mt-6 text-sm underline underline-offset-4">Zmień termin</button>
      </motion.div>
    );

  return (
    <div className="rounded-3xl bg-white p-6 shadow-xl sm:p-8">
      <div className="grid grid-cols-2 gap-2 rounded-full bg-[#f2eee6] p-1">
        {(["online", "stacjonarnie"] as const).map((m) => (
          <button key={m} onClick={() => setMode(m)} className={`relative rounded-full py-2.5 text-sm capitalize ${mode === m ? "text-white" : ""}`}>
            {mode === m && <motion.span layoutId="mode" className="absolute inset-0 rounded-full bg-[#1d2a3a]" />}
            <span className="relative flex items-center justify-center gap-2">{m === "online" ? <Video className="size-4" /> : <MapPin className="size-4" />}{m}</span>
          </button>
        ))}
      </div>
      <p className="mt-6 text-sm text-[#1d2a3a]/60">Wybierz dzień</p>
      <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
        {days.map((d, i) => (
          <button key={i} onClick={() => { setDay(i); setSlot(null); }} className={`min-w-16 shrink-0 rounded-2xl border px-3 py-2.5 text-center transition-colors ${day === i ? "border-[#1d2a3a] bg-[#1d2a3a] text-white" : "border-[#1d2a3a]/15 hover:border-[#1d2a3a]"}`}>
            <span className="block text-xs capitalize opacity-70">{fmtDay.format(d)}</span>
            <span className="block text-sm">{fmtDate.format(d)}</span>
          </button>
        ))}
      </div>
      <p className="mt-6 text-sm text-[#1d2a3a]/60">Godzina</p>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {SLOTS.map((s, i) => {
          const b = busy(day, i);
          return (
            <button key={s} disabled={b} onClick={() => setSlot(s)} className={`rounded-xl border py-2.5 text-sm transition-colors ${b ? "cursor-not-allowed border-transparent bg-[#f2eee6] text-[#1d2a3a]/30 line-through" : slot === s ? "border-[#a8834a] bg-[#a8834a] text-white" : "border-[#1d2a3a]/15 hover:border-[#1d2a3a]"}`}>
              {s}
            </button>
          );
        })}
      </div>
      <button disabled={!slot} onClick={() => setDone(true)} className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#1d2a3a] py-4 text-white transition-opacity disabled:opacity-30">
        Umów konsultację <ArrowRight className="size-4" />
      </button>
    </div>
  );
}

export function Kancelaria() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="bg-[#f7f4ee] font-(family-name:--c-body) text-[#1d2a3a]">
      <header className="sticky top-0 z-30 border-b border-[#1d2a3a]/10 bg-[#f7f4ee]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <a href="#" className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full border border-[#a8834a] text-[#a8834a]"><Scale className="size-5" /></span>
            <span className="leading-tight">
              <span className="block font-(family-name:--c-display) text-lg">adw. Joanna Wrzos</span>
              <span className="block text-[11px] uppercase tracking-[0.2em] text-[#1d2a3a]/50">Kancelaria Adwokacka</span>
            </span>
          </a>
          <nav className="hidden gap-8 text-sm md:flex">
            <a href="#specjalizacje">Specjalizacje</a><a href="#o-mnie">O mnie</a><a href="#faq">FAQ</a><a href="#kontakt">Kontakt</a>
          </nav>
          <a href="#konsultacja" className="rounded-full bg-[#1d2a3a] px-5 py-2.5 text-sm text-white hover:bg-[#a8834a]">Umów konsultację</a>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-2 lg:pt-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="text-sm uppercase tracking-[0.25em] text-[#a8834a]">Wrocław · konsultacje także online</p>
          <h1 className="mt-5 font-(family-name:--c-display) text-5xl font-light leading-[1.05] sm:text-7xl">
            Prawo rodzinne i spadkowe. <em className="text-[#a8834a]">Spokojnie i konkretnie.</em>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#1d2a3a]/70">
            Pomagam przejść przez rozwód, sprawy spadkowe i zakup nieruchomości. Na pierwszym spotkaniu dowiesz się, jakie masz
            możliwości i ile potrwa sprawa.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#konsultacja" className="rounded-full bg-[#1d2a3a] px-7 py-4 text-white hover:bg-[#a8834a]">Umów konsultację</a>
            <a href="#specjalizacje" className="rounded-full border border-[#1d2a3a]/25 px-7 py-4 hover:border-[#1d2a3a]">W czym pomagam</a>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative">
          <img src={`${IMG}/hero.jpg`} alt="Biblioteka kancelarii" className="aspect-[4/5] w-full rounded-t-full object-cover" />
          <div className="absolute -bottom-6 -left-4 rounded-2xl bg-white p-5 shadow-xl sm:-left-10">
            <p className="font-(family-name:--c-display) text-4xl text-[#a8834a]">12 lat</p>
            <p className="text-sm text-[#1d2a3a]/60">praktyki w sprawach rodzinnych</p>
          </div>
        </motion.div>
      </section>

      {/* Specjalizacje */}
      <section id="specjalizacje" className="py-24" style={{ background: NAVY, color: "#f7f4ee" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-sm uppercase tracking-[0.25em] text-[#c9a46a]">Specjalizacje</p>
          <h2 className="mt-3 font-(family-name:--c-display) text-4xl font-light sm:text-5xl">W czym mogę Ci pomóc</h2>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {AREAS.map((a, i) => (
              <button key={a.title} onClick={() => setOpen(open === i ? null : i)} className="rounded-3xl border border-white/15 p-7 text-left transition-colors hover:bg-white/5">
                <div className="flex items-start justify-between">
                  <a.icon className="size-8 text-[#c9a46a]" />
                  <ChevronDown className={`size-5 transition-transform ${open === i ? "rotate-180" : ""}`} />
                </div>
                <h3 className="mt-6 font-(family-name:--c-display) text-2xl">{a.title}</h3>
                <p className="mt-2 text-white/65">{a.lead}</p>
                <AnimatePresence>
                  {open === i && (
                    <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      {a.items.map((it) => (
                        <li key={it} className="mt-3 flex gap-2 text-sm first:mt-5"><Check className="mt-0.5 size-4 shrink-0 text-[#c9a46a]" />{it}</li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Jak pracuję */}
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <h2 className="font-(family-name:--c-display) text-4xl font-light sm:text-5xl">Jak wygląda współpraca</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {[
            ["Konsultacja", "Poznaję Twoją sytuację, analizuję dokumenty i mówię wprost, jakie są szanse i ryzyka."],
            ["Plan i wycena", "Otrzymujesz pisemny plan działania i jasną propozycję wynagrodzenia, bez niespodzianek."],
            ["Prowadzenie sprawy", "Przygotowuję pisma i reprezentuję Cię w sądzie. Wiesz, co się dzieje na każdym etapie."],
          ].map(([t, d], i) => (
            <div key={t} className="border-t border-[#1d2a3a]/15 pt-6">
              <p className="font-(family-name:--c-display) text-5xl italic text-[#a8834a]">{i + 1}.</p>
              <h3 className="mt-4 text-xl font-medium">{t}</h3>
              <p className="mt-2 leading-relaxed text-[#1d2a3a]/70">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* O mnie */}
      <section id="o-mnie" className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-24 sm:px-6 lg:grid-cols-2">
        <div className="grid grid-cols-2 gap-3">
          <img src={`${IMG}/spotkanie.jpg`} alt="Spotkanie z klientem" className="col-span-2 aspect-[16/9] w-full rounded-3xl object-cover" />
          <img src={`${IMG}/pisanie.jpg`} alt="" className="aspect-square w-full rounded-3xl object-cover" />
          <img src={`${IMG}/kodeksy.jpg`} alt="" className="aspect-square w-full rounded-3xl object-cover" />
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-[#a8834a]">O mnie</p>
          <h2 className="mt-3 font-(family-name:--c-display) text-4xl font-light sm:text-5xl">Adwokat, który tłumaczy prawo na <em>ludzki język.</em></h2>
          <p className="mt-6 text-lg leading-relaxed text-[#1d2a3a]/70">
            Jestem adwokatem wpisanym na listę Izby Adwokackiej we Wrocławiu. Zajmuję się sprawami, w których obok prawa liczą
            się emocje. Dlatego dbam o to, żeby klient zawsze rozumiał, co dzieje się w jego sprawie.
          </p>
          <ul className="mt-6 space-y-2">
            {["Mediacje rodzinne przed skierowaniem sprawy do sądu", "Konsultacje w języku polskim i angielskim", "Kontakt mailowy w ciągu 24 godzin"].map((t) => (
              <li key={t} className="flex gap-2"><Check className="mt-1 size-4 text-[#a8834a]" />{t}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Konsultacja */}
      <section id="konsultacja" className="bg-[#ebe4d6] py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-[#a8834a]">Konsultacja</p>
            <h2 className="mt-3 font-(family-name:--c-display) text-4xl font-light sm:text-6xl">Wybierz termin, który Ci pasuje.</h2>
            <p className="mt-6 text-lg text-[#1d2a3a]/70">Konsultacja trwa do 60 minut. Możesz przyjść do kancelarii albo połączyć się online.</p>
          </div>
          <Booking />
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
        <h2 className="text-center font-(family-name:--c-display) text-4xl font-light sm:text-5xl">Częste pytania</h2>
        <div className="mt-10 divide-y divide-[#1d2a3a]/10 border-y border-[#1d2a3a]/10">
          {FAQ.map(([q, a]) => (
            <details key={q} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between py-5 text-lg">
                {q}<ChevronDown className="size-5 text-[#a8834a] transition-transform group-open:rotate-180" />
              </summary>
              <p className="pb-6 text-[#1d2a3a]/70">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Kontakt */}
      <footer id="kontakt" style={{ background: NAVY }} className="text-[#f7f4ee]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-3">
          <div>
            <p className="font-(family-name:--c-display) text-2xl">adw. Joanna Wrzos</p>
            <p className="mt-2 text-sm text-white/60">Kancelaria Adwokacka</p>
          </div>
          <div className="space-y-2 text-white/80">
            <p className="flex items-center gap-2"><MapPin className="size-4 text-[#c9a46a]" /> ul. Przykładowa 5/2, Wrocław</p>
            <p className="flex items-center gap-2"><Phone className="size-4 text-[#c9a46a]" /> 600 000 000</p>
            <p className="flex items-center gap-2"><Mail className="size-4 text-[#c9a46a]" /> kontakt@przyklad.pl</p>
          </div>
          <p className="text-sm leading-relaxed text-white/50">
            Informacje na stronie mają charakter informacyjny, zgodnie z Kodeksem Etyki Adwokackiej, i nie stanowią porady prawnej.
          </p>
        </div>
        <p className="pb-24 text-center text-xs text-white/40">© Kancelaria Adwokacka · strona: Dawid Wierzycki</p>
      </footer>

      <ConceptBadge />
    </div>
  );
}
