"use client";

import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Send } from "lucide-react";
import { ADDONS, CARE, CONTACT, EXTRA_PAGE_PRICE, PACKAGES } from "@/lib/content";
import { QUESTIONS, label, type Answers } from "@/lib/survey";
import { zl } from "@/lib/format";
import { track } from "@/lib/analytics";
import { CalEmbed } from "./cal-embed";

const ENDPOINT = "/api/ankieta.php";

type Contact = { name: string; company: string; email: string; phone: string; about: string; links: string; consent: boolean; website: string };
const EMPTY: Contact = { name: "", company: "", email: "", phone: "", about: "", links: "", consent: false, website: "" };

// Podstrony liczone do limitu 5 w pakiecie (start i kontakt zawsze są). Opinie, FAQ i współpraca to sekcje strony głównej.
const PAGE_ITEMS = ["oferta", "cennik", "o-nas", "portfolio", "blog", "kariera"];

/** Rekomendowany pakiet i orientacyjna cena na podstawie odpowiedzi. */
function recommend(a: Answers) {
  const has = (q: string, o: string) => a[q]?.includes(o) ?? false;
  const pkg = has("cel", "sprzedaz") ? PACKAGES[1] : PACKAGES[0];
  const addon = (id: string) => ADDONS.find((x) => x.id === id)!;

  const lines: [string, number][] = [[`Pakiet ${pkg.name}`, pkg.price]];
  if (has("dodatki", "rezerwacje") || has("cel", "rezerwacje") || has("kontakt", "termin")) lines.push([addon("rezerwacje").label, addon("rezerwacje").price]);
  if (has("dodatki", "faktury")) lines.push([addon("faktury").label, addon("faktury").price]);
  if (has("dodatki", "teksty")) lines.push([addon("teksty").label, addon("teksty").price]);
  const pages = 2 + (a.tresci ?? []).filter((t) => PAGE_ITEMS.includes(t)).length;
  const extra = Math.max(0, pages - 5);
  if (extra) lines.push([`Dodatkowe podstrony × ${extra}`, extra * EXTRA_PAGE_PRICE]);

  const later: string[] = [];
  if (has("rynek", "zagranica")) later.push("wersja w innym języku");
  if (has("dodatki", "platnosci") && pkg !== PACKAGES[1]) later.push("płatności online i zaliczki");
  if (has("dodatki", "newsletter")) later.push("newsletter (lejek z e-bookiem od 1 500 zł)");
  if (has("dodatki", "artykuly")) later.push("artykuły na blog (150 zł za tekst)");
  if (has("obecnosc", "strona")) later.push("przeniesienie treści z obecnej strony");

  const care = CARE.find((c) => has("opieka", c.id));
  return { pkg, lines, total: lines.reduce((s, [, v]) => s + v, 0), later, care };
}

export function Survey() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [answers, setAnswers] = useState<Answers>({});
  const [contact, setContact] = useState<Contact>(EMPTY);
  const [status, setStatus] = useState<"idle" | "sending" | "error" | "sent">("idle");
  const startedAt = useRef(Date.now());
  const topRef = useRef<HTMLDivElement>(null);

  const total = QUESTIONS.length + 1; // pytania + dane kontaktowe
  const q = QUESTIONS[step];
  const rec = useMemo(() => recommend(answers), [answers]);

  const go = (to: number) => {
    setDir(to > step ? 1 : -1);
    setStep(to);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const pick = (qid: string, oid: string, multi?: boolean) => {
    setAnswers((prev) => {
      const cur = prev[qid] ?? [];
      if (!multi) return { ...prev, [qid]: [oid] };
      // „Nic” wyklucza pozostałe odpowiedzi i odwrotnie
      const exclusive = ["nic", "brak"];
      if (cur.includes(oid)) return { ...prev, [qid]: cur.filter((x) => x !== oid) };
      if (exclusive.includes(oid)) return { ...prev, [qid]: [oid] };
      return { ...prev, [qid]: [...cur.filter((x) => !exclusive.includes(x)), oid] };
    });
    if (!multi) setTimeout(() => go(step + 1), 220);
  };

  const summary = () => {
    const lines = [
      `Imię: ${contact.name}`,
      `Firma: ${contact.company || "nie podano"}`,
      `E-mail: ${contact.email}`,
      `Telefon: ${contact.phone || "nie podano"}`,
      "",
      "Czym zajmuje się firma i kto jest klientem:",
      contact.about,
      "",
      ...QUESTIONS.map((x) => `${x.title}\n  ${(answers[x.id] ?? []).map((o) => label(x.id, o)).join(", ") || "brak odpowiedzi"}`),
      "",
      `Strony, które się podobają: ${contact.links || "nie podano"}`,
      "",
      "Rekomendacja z ankiety:",
      ...rec.lines.map(([n, v]) => `  ${n}: ${zl(v)}`),
      `  Razem orientacyjnie: od ${zl(rec.total)}`,
      rec.care && rec.care.price ? `  Opieka: ${rec.care.label} (${rec.care.price} zł/mies.)` : "",
      rec.later.length ? `  Do wyceny na rozmowie: ${rec.later.join(", ")}` : "",
    ];
    return lines.filter((l, i, arr) => !(l === "" && arr[i - 1] === "")).join("\n");
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contact.name,
          company: contact.company,
          email: contact.email,
          phone: contact.phone,
          summary: summary(),
          website: contact.website,
          elapsed: Date.now() - startedAt.current,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error();
      track("generate_lead", { method: "ankieta", pakiet: rec.pkg.name, value: rec.total, currency: "PLN" }, "Lead");
      setStatus("sent");
      go(total);
    } catch {
      setStatus("error");
    }
  };

  const set = (k: keyof Contact) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setContact((c) => ({ ...c, [k]: e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value }));

  const done = step === total;
  const progress = Math.min(step, total) / total;

  return (
    <div ref={topRef} className="scroll-mt-28">
      {!done && (
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-muted">
            <span>{step < QUESTIONS.length ? "Twoja firma i strona" : "Ostatni krok"}</span>
            <span className="tabular-nums">
              Krok {step + 1} z {total}
            </span>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line">
            <motion.div className="h-full rounded-full bg-clay" animate={{ width: `${progress * 100}%` }} transition={{ duration: 0.4 }} />
          </div>
        </div>
      )}

      <AnimatePresence mode="wait" custom={dir} initial={false}>
        <motion.div
          key={step}
          custom={dir}
          initial={{ opacity: 0, x: dir * 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: dir * -24 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {q && (
            <div className="rounded-3xl border border-line bg-paper p-6 sm:p-10">
              <h2 className="font-display text-3xl leading-[1.1] sm:text-5xl">{q.title}</h2>
              <p className="mt-4 text-ink/70">{q.lead}</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {q.options.map((o) => {
                  const on = answers[q.id]?.includes(o.id) ?? false;
                  return (
                    <button
                      key={o.id}
                      type="button"
                      onClick={() => pick(q.id, o.id, q.multi)}
                      aria-pressed={on}
                      className={`flex items-start gap-4 rounded-2xl border p-4 text-left transition-all sm:p-5 ${
                        on ? "border-ink bg-cream" : "border-line hover:border-ink/40"
                      }`}
                    >
                      <span
                        className={`mt-0.5 grid size-5 shrink-0 place-items-center border transition-colors ${q.multi ? "rounded-md" : "rounded-full"} ${
                          on ? "border-clay bg-clay text-paper" : "border-ink/25"
                        }`}
                      >
                        {on && <Check className="size-3.5" strokeWidth={3} />}
                      </span>
                      <span>
                        <span className="block font-medium">{o.label}</span>
                        {o.desc && <span className="mt-0.5 block text-sm text-muted">{o.desc}</span>}
                      </span>
                    </button>
                  );
                })}
              </div>
              <Nav
                onBack={step > 0 ? () => go(step - 1) : undefined}
                onNext={() => go(step + 1)}
                nextDisabled={!(answers[q.id]?.length)}
              />
            </div>
          )}

          {step === QUESTIONS.length && (
            <form onSubmit={submit} className="rounded-3xl border border-line bg-paper p-6 sm:p-10">
              <h2 className="font-display text-3xl leading-[1.1] sm:text-5xl">Kilka słów o Tobie</h2>
              <p className="mt-4 text-ink/70">Odpowiedzi trafią do mnie mailem. Na następnym ekranie zobaczysz rekomendację i wybierzesz termin rozmowy.</p>

              <div className="mt-8 grid gap-4">
                <Field label="Czym zajmuje się Twoja firma i kto jest Twoim klientem?" required>
                  <textarea required rows={4} maxLength={2000} value={contact.about} onChange={set("about")} className={input} placeholder="np. Gabinet fizjoterapii w Opolu. Pacjenci po urazach i osoby pracujące przy biurku." />
                </Field>
                <Field label="Strony, które Ci się podobają (opcjonalnie)">
                  <input type="text" maxLength={500} value={contact.links} onChange={set("links")} className={input} placeholder="adresy 1–3 stron, mogą być z innej branży" />
                </Field>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Imię" required>
                    <input required type="text" autoComplete="given-name" maxLength={100} value={contact.name} onChange={set("name")} className={input} />
                  </Field>
                  <Field label="Nazwa firmy">
                    <input type="text" autoComplete="organization" maxLength={150} value={contact.company} onChange={set("company")} className={input} />
                  </Field>
                  <Field label="E-mail" required>
                    <input required type="email" autoComplete="email" maxLength={150} value={contact.email} onChange={set("email")} className={input} />
                  </Field>
                  <Field label="Telefon">
                    <input type="tel" autoComplete="tel" maxLength={30} value={contact.phone} onChange={set("phone")} className={input} />
                  </Field>
                </div>
                {/* Pułapka na boty: pole niewidoczne dla ludzi */}
                <input type="text" name="website" tabIndex={-1} autoComplete="off" value={contact.website} onChange={set("website")} className="hidden" aria-hidden="true" />
                <label className="flex cursor-pointer items-start gap-3 text-sm text-ink/75">
                  <input required type="checkbox" checked={contact.consent} onChange={set("consent")} className="mt-0.5 size-4 shrink-0 accent-clay" />
                  <span>
                    Zgadzam się na kontakt w sprawie strony. Dane przetwarzam tylko w tym celu, szczegóły w{" "}
                    <a href="/polityka-prywatnosci/" target="_blank" className="underline underline-offset-4 hover:text-clay">
                      polityce prywatności
                    </a>
                    .
                  </span>
                </label>
              </div>

              {status === "error" && (
                <p className="mt-6 rounded-xl bg-clay-soft/60 px-4 py-3 text-sm">
                  Nie udało się wysłać ankiety. Spróbuj jeszcze raz albo{" "}
                  <a
                    href={`mailto:${CONTACT.email}?subject=${encodeURIComponent("Ankieta przed rozmową")}&body=${encodeURIComponent(summary())}`}
                    className="underline underline-offset-4"
                  >
                    wyślij odpowiedzi mailem
                  </a>
                  .
                </p>
              )}

              <div className="mt-8 grid grid-cols-2 gap-3">
                <button type="button" onClick={() => go(step - 1)} className={backBtn}>
                  <ArrowLeft className="size-4" /> Wstecz
                </button>
                <button type="submit" disabled={status === "sending"} className={nextBtn}>
                  {status === "sending" ? "Wysyłam…" : (<><Send className="size-4" /> Wyślij i zobacz</>)}
                </button>
              </div>
            </form>
          )}

          {done && (
            <div className="space-y-8">
              <div className="rounded-3xl bg-forest p-7 text-paper sm:p-10">
                <p className="text-xs uppercase tracking-[0.18em] text-gold">Dziękuję, ankieta dotarła</p>
                <h2 className="mt-4 font-display text-4xl leading-[1.05] sm:text-5xl">
                  Proponuję pakiet <em className="text-clay-soft">{rec.pkg.name}.</em>
                </h2>
                <ul className="mt-8 space-y-3 text-sm">
                  {rec.lines.map(([n, v]) => (
                    <li key={n} className="flex justify-between gap-4 border-b border-paper/10 pb-3">
                      <span className="text-paper/80">{n}</span>
                      <span className="tabular-nums">{zl(v)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex items-end justify-between gap-4">
                  <span className="text-paper/70">Orientacyjnie</span>
                  <span className="font-display text-5xl tabular-nums">od {zl(rec.total)}</span>
                </div>
                {rec.care && rec.care.price > 0 && (
                  <p className="mt-2 text-right text-sm text-paper/60">+ {rec.care.label.toLowerCase()} {rec.care.price} zł / mies.</p>
                )}
                {rec.later.length > 0 && <p className="mt-6 text-sm text-paper/70">Do omówienia na rozmowie: {rec.later.join(", ")}.</p>}
                <p className="mt-6 text-sm text-paper/60">
                  Termin: {rec.pkg.time} od otrzymania materiałów. Płatność: 50% na start, 50% po oddaniu. Ostateczną wycenę wyślę na piśmie do 24 godzin po rozmowie.
                </p>
              </div>

              <div>
                <h2 className="font-display text-3xl leading-[1.1] sm:text-4xl">
                  Wybierz termin rozmowy. <em>20 minut, online.</em>
                </h2>
                <p className="mt-3 text-ink/70">Znam już Twoje odpowiedzi, więc porozmawiamy tylko o tym, co trzeba doprecyzować.</p>
                <div className="mt-6 min-h-[640px] overflow-hidden rounded-3xl border border-line bg-paper p-2 sm:p-4">
                  <CalEmbed className="min-h-[620px]" prefill={{ name: contact.name, email: contact.email }} />
                </div>
                <p className="mt-4 text-sm text-muted">
                  Kalendarz się nie wyświetla?{" "}
                  <a href={CONTACT.calUrl} target="_blank" rel="noopener" className="underline underline-offset-4 hover:text-clay">
                    Otwórz go w nowej karcie
                  </a>
                  .
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {!done && <p className="mt-6 text-center text-sm text-muted">Bez zobowiązań. Zajmie to około 3 minut.</p>}
    </div>
  );
}

const input = "w-full rounded-xl border border-line bg-cream/40 px-4 py-3 outline-none transition-colors focus:border-ink";
const backBtn = "flex items-center justify-center gap-2 rounded-full border border-line px-6 py-4 transition-colors hover:border-ink";
const nextBtn = "flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 text-paper transition-colors hover:bg-clay disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-ink";

function Nav({ onBack, onNext, nextDisabled }: { onBack?: () => void; onNext: () => void; nextDisabled: boolean }) {
  return (
    <div className="mt-8 grid grid-cols-2 gap-3">
      {onBack ? (
        <button type="button" onClick={onBack} className={backBtn}>
          <ArrowLeft className="size-4" /> Wstecz
        </button>
      ) : (
        <span />
      )}
      <button type="button" onClick={onNext} disabled={nextDisabled} className={nextBtn}>
        Dalej <ArrowRight className="size-4" />
      </button>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium">
        {label}
        {required && <span className="text-clay"> *</span>}
      </span>
      {children}
    </label>
  );
}
