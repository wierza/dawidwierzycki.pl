"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Clock, HeartPulse, MapPin, Phone, Star } from "lucide-react";
import { ConceptBadge } from "@/components/concept-badge";

const IMG = "/koncepcje/fizjo";
const MINT = "#2f7d6d";

const SERVICES = [
  { id: "konsultacja", cat: "Fizjoterapia", name: "Konsultacja z terapią", time: 60, price: 220, desc: "Badanie, diagnoza i pierwsza terapia. Dostajesz plan i ćwiczenia do domu." },
  { id: "terapia", cat: "Fizjoterapia", name: "Terapia kontynuacja", time: 50, price: 190, desc: "Kolejne spotkanie w ramach planu leczenia." },
  { id: "manualna", cat: "Terapia manualna", name: "Terapia manualna kręgosłupa", time: 50, price: 200, desc: "Bóle pleców, szyi, rwa kulszowa, zablokowania." },
  { id: "powiezi", cat: "Terapia manualna", name: "Terapia powięziowa", time: 50, price: 200, desc: "Przewlekłe napięcia, przeciążenia, blizny." },
  { id: "sportowy", cat: "Masaż", name: "Masaż sportowy", time: 60, price: 170, desc: "Regeneracja po treningu i zawodach." },
  { id: "relaks", cat: "Masaż", name: "Masaż relaksacyjny", time: 60, price: 150, desc: "Rozluźnienie, sen, redukcja stresu." },
  { id: "trening", cat: "Trening medyczny", name: "Trening medyczny 1:1", time: 55, price: 160, desc: "Powrót do sportu po kontuzji pod okiem fizjoterapeuty." },
];

const TEAM = [
  { id: "ania", name: "Anna Kalina", role: "fizjoterapeutka, terapia manualna", color: "#d9ece6" },
  { id: "piotr", name: "Piotr Zieliński", role: "fizjoterapeuta sportowy", color: "#f4e1d6" },
  { id: "ola", name: "Aleksandra Maj", role: "masaż i terapia powięziowa", color: "#e4e2f3" },
];

const SLOTS = ["8:00", "9:00", "11:00", "13:30", "15:00", "16:30", "18:00"];
const fmt = new Intl.DateTimeFormat("pl-PL", { weekday: "short", day: "numeric", month: "short" });

function nextDays(n: number) {
  const out: Date[] = [];
  const d = new Date();
  while (out.length < n) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0) out.push(new Date(d));
  }
  return out;
}

function Booking() {
  const days = useMemo(() => nextDays(7), []);
  const [step, setStep] = useState(0);
  const [service, setService] = useState(SERVICES[0]);
  const [who, setWho] = useState(TEAM[0]);
  const [day, setDay] = useState(0);
  const [slot, setSlot] = useState<string | null>(null);
  const steps = ["Zabieg", "Specjalista", "Termin", "Dane"];

  return (
    <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_30px_60px_-30px_rgba(47,125,109,0.4)]">
      {/* Pasek kroków */}
      <div className="flex border-b border-[#2f7d6d]/10">
        {steps.map((s, i) => (
          <div key={s} className={`flex-1 py-4 text-center text-xs sm:text-sm ${i <= step ? "text-[#2f7d6d]" : "text-neutral-400"}`}>
            <span className={`mx-auto mb-1 grid size-6 place-items-center rounded-full text-xs ${i < step ? "bg-[#2f7d6d] text-white" : i === step ? "border-2 border-[#2f7d6d]" : "border border-neutral-300"}`}>
              {i < step ? <Check className="size-3.5" /> : i + 1}
            </span>
            {s}
          </div>
        ))}
      </div>

      <div className="min-h-[360px] p-6 sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
            {step === 0 && (
              <div className="grid gap-2">
                {SERVICES.slice(0, 5).map((s) => (
                  <button key={s.id} onClick={() => { setService(s); setStep(1); }} className={`flex items-center justify-between rounded-2xl border p-4 text-left hover:border-[#2f7d6d] ${service.id === s.id ? "border-[#2f7d6d] bg-[#eef6f3]" : "border-neutral-200"}`}>
                    <span><span className="block font-medium">{s.name}</span><span className="text-sm text-neutral-500">{s.time} min</span></span>
                    <span className="font-medium">{s.price} zł</span>
                  </button>
                ))}
              </div>
            )}
            {step === 1 && (
              <div className="grid gap-3">
                {TEAM.map((t) => (
                  <button key={t.id} onClick={() => { setWho(t); setStep(2); }} className={`flex items-center gap-4 rounded-2xl border p-4 text-left hover:border-[#2f7d6d] ${who.id === t.id ? "border-[#2f7d6d] bg-[#eef6f3]" : "border-neutral-200"}`}>
                    <span className="grid size-12 place-items-center rounded-full font-(family-name:--c-display) text-lg" style={{ background: t.color }}>{t.name.split(" ").map((p) => p[0]).join("")}</span>
                    <span><span className="block font-medium">{t.name}</span><span className="text-sm text-neutral-500">{t.role}</span></span>
                  </button>
                ))}
              </div>
            )}
            {step === 2 && (
              <div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {days.map((d, i) => (
                    <button key={i} onClick={() => { setDay(i); setSlot(null); }} className={`shrink-0 rounded-xl border px-3 py-2 text-sm capitalize ${day === i ? "border-[#2f7d6d] bg-[#2f7d6d] text-white" : "border-neutral-200"}`}>{fmt.format(d)}</button>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {SLOTS.map((s, i) => {
                    const busy = (day + i * 2) % 5 === 0;
                    return (
                      <button key={s} disabled={busy} onClick={() => { setSlot(s); setStep(3); }} className={`rounded-xl border py-2.5 text-sm ${busy ? "border-transparent bg-neutral-100 text-neutral-300" : slot === s ? "border-[#2f7d6d] bg-[#eef6f3]" : "border-neutral-200 hover:border-[#2f7d6d]"}`}>{s}</button>
                    );
                  })}
                </div>
              </div>
            )}
            {step === 3 && (
              <form onSubmit={(e) => { e.preventDefault(); setStep(4); }} className="grid gap-3">
                <div className="rounded-2xl bg-[#eef6f3] p-4 text-sm">
                  <p className="font-medium">{service.name} · {service.price} zł</p>
                  <p className="text-neutral-600">{who.name} · <span className="capitalize">{fmt.format(days[day])}</span>, {slot}</p>
                </div>
                <input required placeholder="Imię i nazwisko" className="rounded-xl border border-neutral-200 px-4 py-3" />
                <input required type="tel" placeholder="Telefon" className="rounded-xl border border-neutral-200 px-4 py-3" />
                <label className="flex gap-2 text-xs text-neutral-500"><input required type="checkbox" className="accent-[#2f7d6d]" /> Akceptuję regulamin i politykę prywatności</label>
                <button className="mt-1 rounded-full bg-[#2f7d6d] py-3.5 text-white hover:bg-[#245f53]">Potwierdzam wizytę</button>
              </form>
            )}
            {step === 4 && (
              <div className="py-8 text-center">
                <div className="mx-auto grid size-14 place-items-center rounded-full bg-[#2f7d6d] text-white"><Check /></div>
                <p className="mt-5 font-(family-name:--c-display) text-3xl">Wizyta zarezerwowana</p>
                <p className="mt-2 text-neutral-600">Przypomnienie SMS wyślemy dzień wcześniej. Weź wygodny strój.</p>
                <button onClick={() => { setStep(0); setSlot(null); }} className="mt-6 text-sm text-[#2f7d6d] underline underline-offset-4">Umów kolejną wizytę</button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        {step > 0 && step < 4 && (
          <button onClick={() => setStep(step - 1)} className="mt-5 flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-900"><ArrowLeft className="size-4" /> Wstecz</button>
        )}
      </div>
    </div>
  );
}

export function Fizjo() {
  const cats = [...new Set(SERVICES.map((s) => s.cat))];
  const [cat, setCat] = useState(cats[0]);

  return (
    <div className="bg-[#fbfcfb] font-(family-name:--c-body) text-[#18302b]">
      <header className="sticky top-0 z-30 bg-[#fbfcfb]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <a href="#" className="flex items-center gap-2 font-(family-name:--c-display) text-2xl"><HeartPulse className="size-6 text-[#2f7d6d]" /> Studio Ruchu</a>
          <nav className="hidden gap-8 text-sm md:flex"><a href="#oferta">Oferta i cennik</a><a href="#zespol">Zespół</a><a href="#opinie">Opinie</a><a href="#kontakt">Kontakt</a></nav>
          <a href="#rezerwacja" className="rounded-full bg-[#2f7d6d] px-5 py-2.5 text-sm text-white hover:bg-[#245f53]">Umów wizytę</a>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-2 lg:pt-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#eef6f3] px-4 py-1.5 text-sm text-[#2f7d6d]"><Clock className="size-4" /> Pierwsza wizyta nawet w 48 h</span>
          <h1 className="mt-6 font-(family-name:--c-display) text-5xl leading-[1.05] sm:text-7xl">Wróć do ruchu <em className="text-[#2f7d6d]">bez bólu.</em></h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#18302b]/70">
            Fizjoterapia, terapia manualna i trening medyczny. Najpierw szukamy przyczyny bólu, potem dobieramy terapię i ćwiczenia,
            które zrobisz w domu.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#rezerwacja" className="rounded-full bg-[#2f7d6d] px-7 py-4 text-white hover:bg-[#245f53]">Zarezerwuj online</a>
            <a href="#oferta" className="rounded-full border border-[#18302b]/20 px-7 py-4 hover:border-[#18302b]">Zobacz cennik</a>
          </div>
          <div className="mt-10 flex items-center gap-3 text-sm">
            <div className="flex -space-x-2">{TEAM.map((t) => <span key={t.id} className="grid size-9 place-items-center rounded-full border-2 border-white text-xs" style={{ background: t.color }}>{t.name[0]}</span>)}</div>
            <span className="flex items-center gap-1"><Star className="size-4 fill-[#f0a14a] text-[#f0a14a]" /> 4,9 · 186 opinii w Google</span>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9 }} className="relative">
          <img src={`${IMG}/hero.jpg`} alt="Ćwiczenia z fizjoterapeutą" className="aspect-[5/4] w-full rounded-[32px] object-cover" />
          <img src={`${IMG}/masaz.jpg`} alt="" className="absolute -bottom-8 -left-6 hidden aspect-square w-40 rounded-3xl border-[6px] border-[#fbfcfb] object-cover sm:block" />
        </motion.div>
      </section>

      {/* Oferta */}
      <section id="oferta" className="bg-[#eef6f3] py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-(family-name:--c-display) text-4xl sm:text-5xl">Oferta i cennik</h2>
          <div className="mt-8 flex flex-wrap gap-2">
            {cats.map((c) => (
              <button key={c} onClick={() => setCat(c)} className={`rounded-full px-5 py-2.5 text-sm transition-colors ${cat === c ? "bg-[#2f7d6d] text-white" : "bg-white hover:bg-white/60"}`}>{c}</button>
            ))}
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {SERVICES.filter((s) => s.cat === cat).map((s) => (
                <motion.div key={s.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col rounded-3xl bg-white p-7">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-medium">{s.name}</h3>
                    <p className="font-(family-name:--c-display) text-3xl" style={{ color: MINT }}>{s.price} zł</p>
                  </div>
                  <p className="mt-1 text-sm text-neutral-500">{s.time} minut</p>
                  <p className="mt-4 flex-1 text-[#18302b]/70">{s.desc}</p>
                  <a href="#rezerwacja" className="mt-6 inline-flex items-center gap-1 text-sm text-[#2f7d6d]">Zarezerwuj <ArrowRight className="size-4" /></a>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Zespół */}
      <section id="zespol" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="grid items-end gap-6 md:grid-cols-2">
          <h2 className="font-(family-name:--c-display) text-4xl sm:text-5xl">Zespół, który <em className="text-[#2f7d6d]">słucha.</em></h2>
          <p className="text-[#18302b]/70">Każdy fizjoterapeuta ma tytuł magistra i co roku szkoli się z nowych metod terapii.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TEAM.map((t, i) => (
            <div key={t.id} className="overflow-hidden rounded-3xl border border-neutral-200">
              <img src={`${IMG}/${["terapia", "trening", "rozciaganie"][i]}.jpg`} alt="" className="aspect-[4/3] w-full object-cover" />
              <div className="p-6">
                <p className="text-lg font-medium">{t.name}</p>
                <p className="text-sm text-neutral-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rezerwacja */}
      <section id="rezerwacja" className="py-24" style={{ background: MINT }}>
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="text-white">
            <h2 className="font-(family-name:--c-display) text-4xl sm:text-6xl">Umów wizytę w 4 krokach.</h2>
            <p className="mt-6 text-lg text-white/80">Bez dzwonienia i czekania na oddzwonienie. Widzisz wolne terminy na żywo.</p>
            <ul className="mt-8 space-y-3 text-white/90">
              {["Nie potrzebujesz skierowania", "Przypomnienie SMS dzień przed wizytą", "Bezpłatne odwołanie do 24 h przed"].map((t) => (
                <li key={t} className="flex gap-2"><Check className="size-5" />{t}</li>
              ))}
            </ul>
          </div>
          <Booking />
        </div>
      </section>

      {/* Opinie */}
      <section id="opinie" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ["Po trzech wizytach przestał mnie boleć kręgosłup, który męczył mnie od roku.", "Marek, 52 lata"],
            ["Wróciłam do biegania po skręceniu kostki szybciej, niż zakładałam.", "Julia, 31 lat"],
            ["Konkretnie, bez naciągania na dodatkowe zabiegi. Dostałam ćwiczenia, które naprawdę pomagają.", "Ewa, 44 lata"],
          ].map(([q, a]) => (
            <figure key={a} className="rounded-3xl bg-[#eef6f3] p-8">
              <div className="flex gap-1">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-4 fill-[#f0a14a] text-[#f0a14a]" />)}</div>
              <blockquote className="mt-4 text-lg leading-relaxed">„{q}”</blockquote>
              <figcaption className="mt-4 text-sm text-neutral-500">{a}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <footer id="kontakt" className="border-t border-neutral-200">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-3">
          <p className="flex items-center gap-2 font-(family-name:--c-display) text-2xl"><HeartPulse className="size-6 text-[#2f7d6d]" /> Studio Ruchu</p>
          <div className="space-y-2 text-[#18302b]/80">
            <p className="flex items-center gap-2"><MapPin className="size-4 text-[#2f7d6d]" /> ul. Przykładowa 8, Poznań</p>
            <p className="flex items-center gap-2"><Phone className="size-4 text-[#2f7d6d]" /> 61 000 00 00</p>
          </div>
          <p className="text-sm text-neutral-500">Pon–Pt 7:00–20:00 · Sob 8:00–14:00<br />Parking dla pacjentów przed budynkiem.</p>
        </div>
        <p className="pb-24 text-center text-xs text-neutral-400">© Studio Ruchu · strona: Dawid Wierzycki</p>
      </footer>

      <ConceptBadge />
    </div>
  );
}
