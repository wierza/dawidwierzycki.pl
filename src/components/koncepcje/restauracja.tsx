"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, Clock, MapPin, Minus, Phone, Plus, Star, Users } from "lucide-react";
import { ConceptBadge } from "@/components/concept-badge";

const IMG = "/koncepcje/restauracja";

const MENU: Record<string, { name: string; desc: string; price: number; tag?: string }[]> = {
  Śniadania: [
    { name: "Jajka po benedyktyńsku", desc: "brioszka, szynka parmeńska, holenderski, szczypior", price: 34 },
    { name: "Szakszuka z fetą", desc: "pomidory z pieca, papryka, kolendra, chleb na zakwasie", price: 32, tag: "wege" },
    { name: "Owsianka z pieczoną gruszką", desc: "mleko owsiane, orzechy laskowe, miód gryczany", price: 24, tag: "wege" },
  ],
  Lunch: [
    { name: "Pierogi z kaszanką i jabłkiem", desc: "masło z szałwią, cebula confit", price: 38 },
    { name: "Krem z pieczonej dyni", desc: "olej z pestek, grzanki rozmarynowe", price: 26, tag: "wege" },
    { name: "Policzki wołowe", desc: "puree z selera, sos z czerwonego wina, marynowana szalotka", price: 58 },
  ],
  Kolacja: [
    { name: "Pstrąg z Doliny Baryczy", desc: "masło koperkowe, młode ziemniaki, ogórek kiszony", price: 64 },
    { name: "Kaczka z wiśniami", desc: "pierś sezonowana 7 dni, buraki, kasza gryczana", price: 72 },
    { name: "Risotto z borowikami", desc: "parmezan 24 mies., masło truflowe", price: 54, tag: "wege" },
  ],
  Desery: [
    { name: "Sernik baskijski", desc: "konfitura z rabarbaru", price: 24 },
    { name: "Racuchy z jabłkami", desc: "lody waniliowe, karmel z masłem solonym", price: 26 },
    { name: "Czekolada 70%", desc: "mus, kruszonka kakaowa, sól morska", price: 28 },
  ],
};

const HOURS = [
  ["Pon–Czw", "8:00–22:00"],
  ["Pt–Sob", "8:00–23:30"],
  ["Niedziela", "9:00–21:00"],
];

const SLOTS = ["12:00", "13:00", "14:00", "17:30", "18:30", "19:30", "20:30"];

function Reservation() {
  const [guests, setGuests] = useState(2);
  const [slot, setSlot] = useState("18:30");
  const [sent, setSent] = useState(false);
  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="relative rounded-[28px] bg-[#efe6d8] p-6 text-[#1b1512] sm:p-10">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div key="ok" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="py-10 text-center">
            <p className="font-(family-name:--c-display) text-5xl italic">Do zobaczenia!</p>
            <p className="mx-auto mt-4 max-w-sm text-[#1b1512]/70">
              Stolik dla {guests} {guests === 1 ? "osoby" : "osób"} o {slot} czeka. Potwierdzenie wyślemy SMS-em.
            </p>
            <button onClick={() => setSent(false)} className="mt-8 text-sm underline underline-offset-4">
              Zarezerwuj kolejny stolik
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="grid gap-5 sm:grid-cols-2"
          >
            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm"><CalendarDays className="size-4" /> Data</span>
              <input type="date" required min={today} defaultValue={today} className="w-full rounded-xl border border-[#1b1512]/15 bg-white px-4 py-3" />
            </label>
            <div>
              <span className="mb-2 flex items-center gap-2 text-sm"><Users className="size-4" /> Liczba gości</span>
              <div className="flex items-center justify-between rounded-xl border border-[#1b1512]/15 bg-white px-2 py-1.5">
                <button type="button" aria-label="Mniej gości" onClick={() => setGuests((g) => Math.max(1, g - 1))} className="grid size-9 place-items-center rounded-lg hover:bg-[#efe6d8]"><Minus className="size-4" /></button>
                <span className="tabular-nums">{guests}</span>
                <button type="button" aria-label="Więcej gości" onClick={() => setGuests((g) => Math.min(12, g + 1))} className="grid size-9 place-items-center rounded-lg hover:bg-[#efe6d8]"><Plus className="size-4" /></button>
              </div>
            </div>
            <div className="sm:col-span-2">
              <span className="mb-2 flex items-center gap-2 text-sm"><Clock className="size-4" /> Godzina</span>
              <div className="flex flex-wrap gap-2">
                {SLOTS.map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setSlot(s)}
                    className={`rounded-full border px-4 py-2 text-sm transition-colors ${slot === s ? "border-[#1b1512] bg-[#1b1512] text-[#efe6d8]" : "border-[#1b1512]/20 bg-white hover:border-[#1b1512]"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <input required placeholder="Imię i nazwisko" className="rounded-xl border border-[#1b1512]/15 bg-white px-4 py-3" />
            <input required type="tel" placeholder="Telefon" className="rounded-xl border border-[#1b1512]/15 bg-white px-4 py-3" />
            <button className="rounded-full bg-[#b5652b] px-6 py-4 text-white transition-colors hover:bg-[#1b1512] sm:col-span-2">
              Rezerwuję stolik
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Restauracja() {
  const [tab, setTab] = useState("Lunch");

  return (
    <div className="bg-[#1b1512] font-(family-name:--c-body) text-[#efe6d8]">
      {/* Nawigacja */}
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 sm:px-6">
          <a href="#" className="font-(family-name:--c-display) text-3xl italic">Sezon</a>
          <nav className="hidden gap-8 text-sm md:flex">
            <a href="#menu" className="hover:text-[#e0a46a]">Menu</a>
            <a href="#o-nas" className="hover:text-[#e0a46a]">O nas</a>
            <a href="#rezerwacja" className="hover:text-[#e0a46a]">Rezerwacja</a>
            <a href="#kontakt" className="hover:text-[#e0a46a]">Kontakt</a>
          </nav>
          <a href="#rezerwacja" className="rounded-full border border-[#efe6d8]/40 px-5 py-2.5 text-sm hover:bg-[#efe6d8] hover:text-[#1b1512]">Zarezerwuj</a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative flex min-h-[92vh] items-end overflow-hidden">
        <motion.img
          src={`${IMG}/hero.jpg`}
          alt="Kolacja w Bistro Sezon"
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1b1512] via-[#1b1512]/50 to-[#1b1512]/30" />
        <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-sm uppercase tracking-[0.3em] text-[#e0a46a]">
            Bistro · Wrocław, Nadodrze
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.9 }}
            className="mt-4 max-w-4xl font-(family-name:--c-display) text-6xl leading-[0.95] sm:text-8xl"
          >
            Kuchnia z tego, co <em className="text-[#e0a46a]">akurat rośnie.</em>
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-10 flex flex-wrap gap-3">
            <a href="#rezerwacja" className="rounded-full bg-[#b5652b] px-7 py-4 hover:bg-[#efe6d8] hover:text-[#1b1512]">Zarezerwuj stolik</a>
            <a href="#menu" className="rounded-full border border-[#efe6d8]/40 px-7 py-4 hover:border-[#efe6d8]">Zobacz menu</a>
          </motion.div>
        </div>
      </section>

      {/* Godziny */}
      <div className="border-y border-[#efe6d8]/10">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-6 text-sm sm:grid-cols-4 sm:px-6">
          {HOURS.map(([d, h]) => (
            <p key={d}><span className="text-[#efe6d8]/50">{d}</span>&nbsp;&nbsp;{h}</p>
          ))}
          <p className="flex items-center gap-2"><Phone className="size-4 text-[#e0a46a]" /> 71 000 00 00</p>
        </div>
      </div>

      {/* O nas */}
      <section id="o-nas" className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:py-32">
        <div className="relative">
          <img src={`${IMG}/szef.jpg`} alt="Szef kuchni nakłada danie" className="aspect-[4/3] w-full rounded-[28px] object-cover" />
          <img src={`${IMG}/salatka.jpg`} alt="Sałatka sezonowa" className="absolute -bottom-10 -right-4 hidden w-2/5 rounded-2xl border-8 border-[#1b1512] object-cover sm:block" />
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-[#e0a46a]">O nas</p>
          <h2 className="mt-4 font-(family-name:--c-display) text-5xl leading-none sm:text-6xl">Menu zmienia się <em>co sześć tygodni.</em></h2>
          <p className="mt-6 text-lg leading-relaxed text-[#efe6d8]/75">
            Kupujemy od rolników z Dolnego Śląska, pieczemy własny chleb na zakwasie i robimy przetwory na zimę. Dlatego
            karta jest krótka, ale każde danie jest dopracowane.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-[#efe6d8]/15 pt-8">
            {[["12", "dostawców z regionu"], ["48 h", "fermentacji zakwasu"], ["0", "mrożonek"]].map(([n, t]) => (
              <div key={t}>
                <p className="font-(family-name:--c-display) text-4xl text-[#e0a46a]">{n}</p>
                <p className="mt-1 text-sm text-[#efe6d8]/60">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="bg-[#efe6d8] py-24 text-[#1b1512] lg:py-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <p className="text-center text-sm uppercase tracking-[0.3em] text-[#b5652b]">Karta jesienna</p>
          <h2 className="mt-3 text-center font-(family-name:--c-display) text-6xl">Menu</h2>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {Object.keys(MENU).map((k) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={`relative rounded-full px-5 py-2.5 text-sm transition-colors ${tab === k ? "text-[#efe6d8]" : "hover:bg-[#1b1512]/5"}`}
              >
                {tab === k && <motion.span layoutId="menu-pill" className="absolute inset-0 rounded-full bg-[#1b1512]" />}
                <span className="relative">{k}</span>
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.ul key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }} className="mt-12 divide-y divide-[#1b1512]/10">
              {MENU[tab].map((d) => (
                <li key={d.name} className="flex items-baseline gap-4 py-6">
                  <div className="flex-1">
                    <p className="font-(family-name:--c-display) text-2xl font-medium sm:text-3xl">
                      {d.name}
                      {d.tag && <span className="ml-3 rounded-full bg-[#5d7a4a]/15 px-2.5 py-0.5 align-middle font-(family-name:--c-body) text-xs text-[#4b6639]">{d.tag}</span>}
                    </p>
                    <p className="mt-1 text-[#1b1512]/60">{d.desc}</p>
                  </div>
                  <p className="font-(family-name:--c-display) text-2xl tabular-nums">{d.price} zł</p>
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </section>

      {/* Galeria */}
      <section className="grid grid-cols-2 gap-2 p-2 lg:grid-cols-4">
        {["stol", "makaron", "wnetrze", "deser"].map((n, i) => (
          <div key={n} className={`overflow-hidden rounded-2xl ${i === 1 ? "row-span-2" : ""}`}>
            <img src={`${IMG}/${n}.jpg`} alt="" className="size-full min-h-56 object-cover transition-transform duration-700 hover:scale-105" />
          </div>
        ))}
      </section>

      {/* Opinie */}
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ["Najlepsze pierogi we Wrocławiu. I wreszcie miejsce, gdzie karta nie ma 40 pozycji.", "Kasia"],
            ["Byliśmy na rocznicy, a obsługa zapamiętała, że świętujemy. Wrócimy jesienią.", "Tomek i Ola"],
            ["Śniadania w weekend to obowiązkowy punkt. Szakszuka jest rewelacyjna.", "Marta"],
          ].map(([q, a]) => (
            <figure key={a} className="rounded-3xl border border-[#efe6d8]/10 p-8">
              <div className="flex gap-1 text-[#e0a46a]">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-4 fill-current" />)}</div>
              <blockquote className="mt-5 font-(family-name:--c-display) text-2xl leading-snug">„{q}”</blockquote>
              <figcaption className="mt-5 text-sm text-[#efe6d8]/50">{a} · opinia Google</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Rezerwacja */}
      <section id="rezerwacja" className="mx-auto grid max-w-6xl gap-12 px-4 pb-24 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:pb-32">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-[#e0a46a]">Rezerwacja</p>
          <h2 className="mt-4 font-(family-name:--c-display) text-5xl leading-none sm:text-6xl">Zarezerwuj stolik <em>w 20 sekund.</em></h2>
          <p className="mt-6 text-[#efe6d8]/70">Grupy powyżej 12 osób i kolacje firmowe? Zadzwoń, przygotujemy osobne menu.</p>
        </div>
        <Reservation />
      </section>

      {/* Kontakt */}
      <section id="kontakt" className="border-t border-[#efe6d8]/10">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2">
          <div>
            <p className="font-(family-name:--c-display) text-5xl italic">Sezon</p>
            <p className="mt-6 flex items-center gap-3"><MapPin className="size-5 text-[#e0a46a]" /> ul. Przykładowa 12, 50-000 Wrocław</p>
            <p className="mt-3 flex items-center gap-3"><Phone className="size-5 text-[#e0a46a]" /> 71 000 00 00</p>
            <div className="mt-8 space-y-1 text-[#efe6d8]/70">{HOURS.map(([d, h]) => <p key={d}>{d}: {h}</p>)}</div>
          </div>
          <iframe
            title="Mapa dojazdu"
            loading="lazy"
            className="h-72 w-full rounded-3xl grayscale invert-[0.9] hue-rotate-180"
            src="https://www.openstreetmap.org/export/embed.html?bbox=17.020%2C51.108%2C17.046%2C51.120&layer=mapnik"
          />
        </div>
        <p className="pb-24 text-center text-xs text-[#efe6d8]/40">© Bistro Sezon · strona: Dawid Wierzycki</p>
      </section>

      <ConceptBadge dark />
    </div>
  );
}
