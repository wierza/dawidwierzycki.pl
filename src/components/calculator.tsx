"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, Send } from "lucide-react";
import { ADDONS, ARTICLE_PRICE, CARE, EXTRA_PAGE_PRICE, PACKAGES } from "@/lib/content";
import { contactHref } from "@/lib/contact";
import { Reveal } from "./reveal";
import { zl } from "@/lib/format";


export function Calculator() {
  const [base, setBase] = useState(0);
  const [pilot, setPilot] = useState(false);
  const [addons, setAddons] = useState<string[]>([]);
  const [pages, setPages] = useState(0);
  const [articles, setArticles] = useState(0);
  const [care, setCare] = useState("podstawowa");

  const pkg = PACKAGES[base];
  const pilotAvailable = pkg.pilot !== null;
  const usePilot = pilot && pilotAvailable;

  const { total, lines } = useMemo(() => {
    const l: [string, number][] = [[`Pakiet ${pkg.name}${usePilot ? " (cena pilotażowa)" : ""}`, usePilot ? pkg.pilot! : pkg.price]];
    ADDONS.filter((a) => addons.includes(a.id)).forEach((a) => l.push([a.label, a.price]));
    if (pages) l.push([`Dodatkowe podstrony × ${pages}`, pages * EXTRA_PAGE_PRICE]);
    if (articles) l.push([`Artykuły na blog × ${articles}`, articles * ARTICLE_PRICE]);
    return { total: l.reduce((s, [, v]) => s + v, 0), lines: l };
  }, [pkg, usePilot, addons, pages, articles]);

  const careOption = CARE.find((c) => c.id === care)!;

  const mailBody = [
    "Dzień dobry,",
    "",
    "chcę zapytać o wycenę:",
    ...lines.map(([n, v]) => `• ${n}: ${zl(v)}`),
    `• Opieka: ${careOption.label}${careOption.price ? ` (${careOption.price} zł/mies.)` : ""}`,
    "",
    `Razem jednorazowo: ${zl(total)}`,
    "",
    "Moja firma i czego potrzebuję:",
    "",
  ].join("\n");

  const toggle = (id: string) => setAddons((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]));

  return (
    <section id="wycena" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.18em] text-clay">Wycena</p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl leading-[1.05] sm:text-6xl">
            Policz cenę <em>w 30 sekund.</em>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <Reveal className="space-y-8 rounded-3xl border border-line bg-paper p-6 sm:p-9">
            {/* Pakiet */}
            <fieldset>
              <legend className="text-sm font-medium">1. Czego potrzebujesz?</legend>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {PACKAGES.map((p, i) => (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => setBase(i)}
                    aria-pressed={base === i}
                    className={`rounded-2xl border p-4 text-left transition-all ${
                      base === i ? "border-ink bg-ink text-paper" : "border-line hover:border-ink/40"
                    }`}
                  >
                    <span className="block font-display text-2xl">{p.name}</span>
                    <span className={`text-sm ${base === i ? "text-paper/70" : "text-muted"}`}>od {zl(p.price)}</span>
                  </button>
                ))}
              </div>
              {pilotAvailable && (
                <label className="mt-4 flex cursor-pointer items-center gap-3 rounded-xl bg-clay-soft/60 px-4 py-3 text-sm">
                  <input type="checkbox" checked={pilot} onChange={(e) => setPilot(e.target.checked)} className="size-4 accent-clay" />
                  Chcę skorzystać z ceny pilotażowej (1 000 zł w zamian za opinię i zgodę na portfolio)
                </label>
              )}
            </fieldset>

            {/* Dodatki */}
            <fieldset>
              <legend className="text-sm font-medium">2. Dodatki</legend>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {ADDONS.map((a) => {
                  const on = addons.includes(a.id);
                  return (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => toggle(a.id)}
                      aria-pressed={on}
                      className={`rounded-2xl border p-4 text-left transition-all ${
                        on ? "border-clay bg-clay-soft/50" : "border-line hover:border-ink/40"
                      }`}
                    >
                      <span className="flex items-start justify-between gap-3">
                        <span className="font-medium">{a.label}</span>
                        <span className="shrink-0 text-sm text-clay">+{zl(a.price)}</span>
                      </span>
                      <span className="mt-1 block text-sm text-muted">{a.desc}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 flex items-center justify-between rounded-2xl border border-line p-4">
                <div>
                  <p className="font-medium">Dodatkowe podstrony</p>
                  <p className="text-sm text-muted">ponad 5 w pakiecie · {zl(EXTRA_PAGE_PRICE)} za sztukę</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    aria-label="Mniej podstron"
                    onClick={() => setPages((n) => Math.max(0, n - 1))}
                    className="grid size-9 place-items-center rounded-full border border-line hover:border-ink"
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="w-6 text-center tabular-nums">{pages}</span>
                  <button
                    type="button"
                    aria-label="Więcej podstron"
                    onClick={() => setPages((n) => Math.min(20, n + 1))}
                    className="grid size-9 place-items-center rounded-full border border-line hover:border-ink"
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between rounded-2xl border border-line p-4">
                <div>
                  <p className="font-medium">Artykuły na blog pod SEO</p>
                  <p className="text-sm text-muted">ok. 1 000–1 500 słów · {zl(ARTICLE_PRICE)} za artykuł</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    aria-label="Mniej artykułów"
                    onClick={() => setArticles((n) => Math.max(0, n - 1))}
                    className="grid size-9 place-items-center rounded-full border border-line hover:border-ink"
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="w-6 text-center tabular-nums">{articles}</span>
                  <button
                    type="button"
                    aria-label="Więcej artykułów"
                    onClick={() => setArticles((n) => Math.min(20, n + 1))}
                    className="grid size-9 place-items-center rounded-full border border-line hover:border-ink"
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
              </div>
            </fieldset>

            {/* Opieka */}
            <fieldset>
              <legend className="text-sm font-medium">3. Opieka po starcie</legend>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {CARE.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCare(c.id)}
                    aria-pressed={care === c.id}
                    className={`rounded-2xl border p-4 text-left transition-all ${
                      care === c.id ? "border-ink bg-cream" : "border-line hover:border-ink/40"
                    }`}
                  >
                    <span className="block font-medium">{c.label}</span>
                    <span className="block text-sm text-clay">{c.price ? `${c.price} zł / mies.` : "0 zł"}</span>
                    <span className="mt-1 block text-xs text-muted">{c.desc}</span>
                  </button>
                ))}
              </div>
            </fieldset>
          </Reveal>

          {/* Podsumowanie */}
          <Reveal delay={0.1} className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl bg-forest p-7 text-paper sm:p-9">
              <p className="text-xs uppercase tracking-[0.18em] text-gold">Twoja wycena</p>
              <ul className="mt-6 space-y-3 text-sm">
                <AnimatePresence initial={false}>
                  {lines.map(([n, v]) => (
                    <motion.li
                      key={n}
                      layout
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex justify-between gap-4 border-b border-paper/10 pb-3"
                    >
                      <span className="text-paper/80">{n}</span>
                      <span className="tabular-nums">{zl(v)}</span>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
              <div className="mt-6 flex items-end justify-between">
                <span className="text-paper/70">Razem jednorazowo</span>
                <motion.span
                  key={total}
                  initial={{ opacity: 0.4, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-display text-5xl tabular-nums"
                >
                  {zl(total)}
                </motion.span>
              </div>
              <p className="mt-2 text-right text-sm text-paper/60">
                {careOption.price ? `+ opieka ${careOption.price} zł / mies.` : "bez opieki miesięcznej"}
              </p>
              <p className="mt-6 text-sm text-paper/60">
                Termin: {pkg.time}. Płatność: 50% na start, 50% po oddaniu. Domena i hosting na Twoim koncie.
              </p>
              <a
                href={contactHref("Wycena strony", mailBody)}
                className="mt-7 flex items-center justify-center gap-2 rounded-full bg-clay px-6 py-4 transition-colors hover:bg-paper hover:text-ink"
              >
                <Send className="size-4" /> Wyślij mi tę wycenę
              </a>
              <p className="mt-3 text-center text-xs text-paper/50">Otworzy się Twój program pocztowy z gotową wiadomością.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
