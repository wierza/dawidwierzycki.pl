"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Coffee, Flame, Minus, Package, Plus, ShoppingBag, Truck, X } from "lucide-react";
import { ConceptBadge } from "@/components/concept-badge";

const IMG = "/koncepcje/palarnia";
const ESP = "#2b1d16";
const ORANGE = "#e0622a";
const FREE_SHIPPING = 150;

type Product = { id: string; name: string; origin: string; notes: string; type: "Espresso" | "Przelew" | "Bezkofeinowa"; price: number; label: string; roast: number };

const PRODUCTS: Product[] = [
  { id: "etiopia", name: "Etiopia Guji", origin: "Etiopia · obróbka naturalna", notes: "jagody, jaśmin, czarna herbata", type: "Przelew", price: 59, label: "#f2b8a2", roast: 1 },
  { id: "kenia", name: "Kenia Nyeri AA", origin: "Kenia · obróbka myta", notes: "czarna porzeczka, grejpfrut", type: "Przelew", price: 64, label: "#c9d8a7", roast: 1 },
  { id: "brazylia", name: "Brazylia Cerrado", origin: "Brazylia · pulped natural", notes: "orzech laskowy, mleczna czekolada", type: "Espresso", price: 49, label: "#e8c48a", roast: 3 },
  { id: "kolumbia", name: "Kolumbia Huila", origin: "Kolumbia · obróbka myta", notes: "karmel, wiśnia, kakao", type: "Espresso", price: 54, label: "#b9c6e0", roast: 2 },
  { id: "blend", name: "Blend Żar", origin: "Brazylia + Gwatemala", notes: "gorzka czekolada, melasa", type: "Espresso", price: 45, label: "#e09a7a", roast: 3 },
  { id: "decaf", name: "Meksyk Decaf", origin: "Meksyk · Mountain Water", notes: "toffi, migdał, pieczone jabłko", type: "Bezkofeinowa", price: 52, label: "#d7cbe8", roast: 2 },
];

const SIZES = [
  { id: "250", label: "250 g", mult: 1 },
  { id: "1000", label: "1 kg", mult: 3.4 },
];
const GRINDS = ["Ziarno", "Espresso", "Drip / Chemex", "French press"];

type Line = { key: string; p: Product; size: (typeof SIZES)[number]; grind: string; qty: number };
const priceOf = (p: Product, s: (typeof SIZES)[number]) => Math.round(p.price * s.mult);

function Bag({ p }: { p: Product }) {
  return (
    <div className="relative mx-auto aspect-[3/4] w-3/5">
      <div className="absolute inset-x-[6%] top-0 h-[10%] rounded-t-md bg-[#c9ad86]" />
      <div className="absolute inset-0 top-[7%] rounded-b-xl rounded-t-sm bg-[#d8bf98] shadow-[inset_-12px_0_24px_rgba(0,0,0,0.12),0_18px_30px_-12px_rgba(43,29,22,0.45)]">
        <div className="absolute inset-x-[12%] top-[22%] rounded-md p-3 text-center" style={{ background: p.label }}>
          <p className="font-(family-name:--c-display) text-[13px] leading-tight text-[#2b1d16]">{p.name}</p>
          <p className="mt-1 text-[9px] uppercase tracking-widest text-[#2b1d16]/70">{p.type}</p>
          <div className="mt-2 flex justify-center gap-0.5">
            {[1, 2, 3].map((r) => <Flame key={r} className={`size-3 ${r <= p.roast ? "text-[#2b1d16]" : "text-[#2b1d16]/20"}`} />)}
          </div>
        </div>
        <p className="absolute inset-x-0 bottom-[8%] text-center text-[9px] uppercase tracking-[0.25em] text-[#2b1d16]/60">Ziarno &amp; Żar</p>
      </div>
    </div>
  );
}

function ProductCard({ p, onAdd }: { p: Product; onAdd: (l: Omit<Line, "key" | "qty">) => void }) {
  const [size, setSize] = useState(SIZES[0]);
  const [grind, setGrind] = useState(GRINDS[0]);
  const [added, setAdded] = useState(false);
  return (
    <motion.div layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} className="flex flex-col rounded-3xl bg-[#f6efe3] p-5">
      <div className="rounded-2xl bg-[#efe3cf] py-8"><Bag p={p} /></div>
      <div className="mt-5 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-(family-name:--c-display) text-xl">{p.name}</h3>
          <p className="text-sm text-[#2b1d16]/60">{p.origin}</p>
        </div>
        <p className="whitespace-nowrap font-medium">{priceOf(p, size)} zł</p>
      </div>
      <p className="mt-2 text-sm italic text-[#2b1d16]/75">{p.notes}</p>
      <div className="mt-4 flex gap-2">
        {SIZES.map((s) => (
          <button key={s.id} onClick={() => setSize(s)} className={`flex-1 rounded-full border py-1.5 text-sm ${size.id === s.id ? "border-[#2b1d16] bg-[#2b1d16] text-[#f6efe3]" : "border-[#2b1d16]/20"}`}>{s.label}</button>
        ))}
      </div>
      <select value={grind} onChange={(e) => setGrind(e.target.value)} className="mt-2 rounded-full border border-[#2b1d16]/20 bg-transparent px-4 py-2 text-sm" aria-label="Mielenie">
        {GRINDS.map((g) => <option key={g}>{g}</option>)}
      </select>
      <button
        onClick={() => { onAdd({ p, size, grind }); setAdded(true); setTimeout(() => setAdded(false), 1400); }}
        className="mt-4 flex items-center justify-center gap-2 rounded-full py-3 text-white transition-colors"
        style={{ background: added ? "#4b7a3d" : ORANGE }}
      >
        {added ? <><Check className="size-4" /> Dodano</> : <><ShoppingBag className="size-4" /> Do koszyka</>}
      </button>
    </motion.div>
  );
}

function Checkout({ total, onClose, onDone }: { total: number; onClose: () => void; onDone: () => void }) {
  const [blik, setBlik] = useState("");
  const [paid, setPaid] = useState(false);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[70] grid place-items-center bg-black/50 p-4">
      <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl bg-white p-7 text-[#2b1d16]">
        {paid ? (
          <div className="py-6 text-center">
            <div className="mx-auto grid size-14 place-items-center rounded-full bg-[#4b7a3d] text-white"><Check /></div>
            <p className="mt-5 font-(family-name:--c-display) text-3xl">Dziękujemy!</p>
            <p className="mt-2 text-[#2b1d16]/70">Zamówienie #1042 przyjęte. Palimy we wtorek, wysyłamy w środę. Numer paczki dostaniesz SMS-em.</p>
            <button onClick={onDone} className="mt-6 rounded-full bg-[#2b1d16] px-6 py-3 text-white">Wróć do sklepu</button>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); if (blik.length === 6) setPaid(true); }}>
            <div className="flex items-center justify-between">
              <p className="font-(family-name:--c-display) text-2xl">Zamówienie</p>
              <button type="button" onClick={onClose} aria-label="Zamknij"><X /></button>
            </div>
            <div className="mt-5 grid gap-3">
              <input required type="email" placeholder="E-mail" className="rounded-xl border border-neutral-200 px-4 py-3" />
              <input required placeholder="Imię i nazwisko" className="rounded-xl border border-neutral-200 px-4 py-3" />
              <label className="flex items-center gap-3 rounded-xl border border-[#2b1d16] px-4 py-3 text-sm">
                <Package className="size-5" /> <span className="flex-1">Paczkomat InPost · {total >= FREE_SHIPPING ? "0 zł" : "12,99 zł"}</span>
                <input type="radio" defaultChecked name="ship" className="accent-[#e0622a]" />
              </label>
              <input required placeholder="Kod paczkomatu, np. WRO01M" className="rounded-xl border border-neutral-200 px-4 py-3" />
              <div className="rounded-2xl bg-[#f6efe3] p-4">
                <p className="text-sm font-medium">Płatność BLIK</p>
                <input
                  inputMode="numeric"
                  value={blik}
                  onChange={(e) => setBlik(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="000 000"
                  className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-center text-2xl tracking-[0.4em]"
                />
                <p className="mt-2 text-xs text-[#2b1d16]/50">Wersja demo — wpisz dowolne 6 cyfr.</p>
              </div>
            </div>
            <button disabled={blik.length !== 6} className="mt-5 w-full rounded-full py-4 text-white disabled:opacity-40" style={{ background: ORANGE }}>
              Zapłać {(total + (total >= FREE_SHIPPING ? 0 : 12.99)).toFixed(2).replace(".", ",")} zł
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}

export function Palarnia() {
  const [filter, setFilter] = useState<"Wszystkie" | Product["type"]>("Wszystkie");
  const [cart, setCart] = useState<Line[]>([]);
  const [open, setOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);

  const total = useMemo(() => cart.reduce((s, l) => s + priceOf(l.p, l.size) * l.qty, 0), [cart]);
  const count = cart.reduce((s, l) => s + l.qty, 0);

  const add = (l: Omit<Line, "key" | "qty">) => {
    const key = `${l.p.id}-${l.size.id}-${l.grind}`;
    setCart((c) => (c.some((x) => x.key === key) ? c.map((x) => (x.key === key ? { ...x, qty: x.qty + 1 } : x)) : [...c, { ...l, key, qty: 1 }]));
  };
  const setQty = (key: string, d: number) => setCart((c) => c.map((x) => (x.key === key ? { ...x, qty: x.qty + d } : x)).filter((x) => x.qty > 0));

  return (
    <div className="bg-[#fbf7f0] font-(family-name:--c-body) text-[#2b1d16]">
      <header className="sticky top-0 z-40 border-b border-[#2b1d16]/10 bg-[#fbf7f0]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <a href="#" className="font-(family-name:--c-display) text-2xl">Ziarno <span style={{ color: ORANGE }}>&amp;</span> Żar</a>
          <nav className="hidden gap-8 text-sm md:flex"><a href="#sklep">Sklep</a><a href="#palarnia">Palarnia</a><a href="#parzenie">Jak parzyć</a></nav>
          <button onClick={() => setOpen(true)} className="relative flex items-center gap-2 rounded-full bg-[#2b1d16] px-4 py-2.5 text-sm text-[#fbf7f0]">
            <ShoppingBag className="size-4" /> Koszyk
            <AnimatePresence>
              {count > 0 && (
                <motion.span key={count} initial={{ scale: 0 }} animate={{ scale: 1 }} className="grid size-5 place-items-center rounded-full text-xs" style={{ background: ORANGE }}>{count}</motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: ESP }}>
        <img src={`${IMG}/hero.jpg`} alt="Palenie kawy w bębnie" className="absolute inset-0 size-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2b1d16] via-[#2b1d16]/75 to-transparent" />
        <div className="relative mx-auto max-w-6xl px-4 py-28 text-[#fbf7f0] sm:px-6 sm:py-36">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 rounded-full bg-[#fbf7f0]/10 px-4 py-1.5 text-sm backdrop-blur"><Flame className="size-4" style={{ color: ORANGE }} /> Następne palenie: wtorek</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.8 }} className="mt-6 max-w-3xl font-(family-name:--c-display) text-5xl leading-[1.05] sm:text-7xl">
            Kawa palona we wtorek, <span style={{ color: "#f3a77f" }}>u Ciebie w czwartek.</span>
          </motion.h1>
          <p className="mt-6 max-w-lg text-lg text-[#fbf7f0]/80">Małe partie z palarni we Wrocławiu. Darmowa dostawa od {FREE_SHIPPING} zł.</p>
          <a href="#sklep" className="mt-9 inline-block rounded-full px-7 py-4 text-white" style={{ background: ORANGE }}>Wybierz kawę</a>
        </div>
      </section>

      <div className="border-b border-[#2b1d16]/10">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-5 text-sm sm:grid-cols-3 sm:px-6">
          <p className="flex items-center gap-2"><Truck className="size-4" style={{ color: ORANGE }} /> Wysyłka w 48 h od palenia</p>
          <p className="flex items-center gap-2"><Coffee className="size-4" style={{ color: ORANGE }} /> Mielenie pod Twój sposób parzenia</p>
          <p className="flex items-center gap-2"><Package className="size-4" style={{ color: ORANGE }} /> Paczkomat lub kurier · BLIK</p>
        </div>
      </div>

      {/* Sklep */}
      <section id="sklep" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-(family-name:--c-display) text-4xl sm:text-5xl">Nasze kawy</h2>
          <div className="flex flex-wrap gap-2">
            {(["Wszystkie", "Espresso", "Przelew", "Bezkofeinowa"] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`rounded-full px-4 py-2 text-sm ${filter === f ? "bg-[#2b1d16] text-[#fbf7f0]" : "border border-[#2b1d16]/20"}`}>{f}</button>
            ))}
          </div>
        </div>
        <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {PRODUCTS.filter((p) => filter === "Wszystkie" || p.type === filter).map((p) => <ProductCard key={p.id} p={p} onAdd={add} />)}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* O palarni */}
      <section id="palarnia" className="py-20" style={{ background: ESP, color: "#fbf7f0" }}>
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-3">
            <img src={`${IMG}/zielone.jpg`} alt="Zielone ziarna kawy" className="col-span-2 aspect-[16/9] w-full rounded-3xl object-cover" />
            <img src={`${IMG}/ziarna.jpg`} alt="" className="aspect-square w-full rounded-3xl object-cover" />
            <img src={`${IMG}/latte.jpg`} alt="" className="aspect-square w-full rounded-3xl object-cover" />
          </div>
          <div>
            <h2 className="font-(family-name:--c-display) text-4xl sm:text-5xl">Od zielonego ziarna do Twojej filiżanki.</h2>
            <p className="mt-6 text-lg leading-relaxed text-[#fbf7f0]/75">
              Kupujemy kawy bezpośrednio od importerów, którzy znają farmerów z imienia. Palimy w małych partiach po 15 kg —
              każdą partię degustujemy, zanim trafi do paczki.
            </p>
          </div>
        </div>
      </section>

      {/* Parzenie */}
      <section id="parzenie" className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
        <div>
          <h2 className="font-(family-name:--c-display) text-4xl sm:text-5xl">Jak parzyć w domu</h2>
          <div className="mt-8 divide-y divide-[#2b1d16]/10 border-y border-[#2b1d16]/10">
            {[["Drip V60", "15 g kawy · 250 ml wody · 94°C · 3 min"], ["Chemex", "30 g kawy · 500 ml wody · 94°C · 4 min"], ["Espresso", "18 g kawy · 36 g napoju · 93°C · 28 s"], ["French press", "30 g kawy · 500 ml wody · 96°C · 4 min"]].map(([m, r]) => (
              <div key={m} className="flex flex-wrap justify-between gap-2 py-4"><span className="font-medium">{m}</span><span className="text-[#2b1d16]/70">{r}</span></div>
            ))}
          </div>
        </div>
        <img src={`${IMG}/dripper.jpg`} alt="Parzenie kawy w Chemexie" className="mx-auto aspect-[3/4] w-full max-w-sm rounded-[32px] object-cover" />
      </section>

      <footer className="border-t border-[#2b1d16]/10 pb-24 pt-10 text-center text-sm text-[#2b1d16]/50">© Ziarno &amp; Żar · strona i sklep: Dawid Wierzycki</footer>

      {/* Koszyk */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} className="fixed inset-0 z-50 bg-black/40" />
            <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 30, stiffness: 300 }} className="fixed inset-y-0 right-0 z-[55] flex w-full max-w-md flex-col bg-[#fbf7f0]">
              <div className="flex items-center justify-between border-b border-[#2b1d16]/10 p-5">
                <p className="font-(family-name:--c-display) text-2xl">Koszyk</p>
                <button onClick={() => setOpen(false)} aria-label="Zamknij koszyk"><X /></button>
              </div>
              <div className="border-b border-[#2b1d16]/10 p-5 text-sm">
                {total >= FREE_SHIPPING ? <p>🎉 Masz darmową dostawę!</p> : <p>Brakuje {FREE_SHIPPING - total} zł do darmowej dostawy</p>}
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#2b1d16]/10">
                  <motion.div className="h-full rounded-full" style={{ background: ORANGE }} animate={{ width: `${Math.min(100, (total / FREE_SHIPPING) * 100)}%` }} />
                </div>
              </div>
              <div className="flex-1 space-y-4 overflow-y-auto p-5">
                {cart.length === 0 && <p className="py-10 text-center text-[#2b1d16]/50">Koszyk jest pusty.</p>}
                {cart.map((l) => (
                  <div key={l.key} className="flex gap-4">
                    <div className="grid w-16 shrink-0 place-items-center rounded-xl bg-[#efe3cf] py-2"><div className="w-14"><Bag p={l.p} /></div></div>
                    <div className="flex-1">
                      <p className="font-medium">{l.p.name}</p>
                      <p className="text-sm text-[#2b1d16]/60">{l.size.label} · {l.grind}</p>
                      <div className="mt-2 flex items-center gap-3">
                        <button onClick={() => setQty(l.key, -1)} className="grid size-7 place-items-center rounded-full border border-[#2b1d16]/20" aria-label="Mniej"><Minus className="size-3" /></button>
                        <span className="tabular-nums">{l.qty}</span>
                        <button onClick={() => setQty(l.key, 1)} className="grid size-7 place-items-center rounded-full border border-[#2b1d16]/20" aria-label="Więcej"><Plus className="size-3" /></button>
                      </div>
                    </div>
                    <p className="font-medium">{priceOf(l.p, l.size) * l.qty} zł</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#2b1d16]/10 p-5">
                <div className="flex justify-between text-lg"><span>Razem</span><span className="font-medium">{total} zł</span></div>
                <button disabled={!cart.length} onClick={() => setCheckout(true)} className="mt-4 w-full rounded-full py-4 text-white disabled:opacity-40" style={{ background: ORANGE }}>Przejdź do płatności</button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {checkout && <Checkout total={total} onClose={() => setCheckout(false)} onDone={() => { setCheckout(false); setOpen(false); setCart([]); }} />}
      </AnimatePresence>

      <ConceptBadge />
    </div>
  );
}
