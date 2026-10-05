import { Check } from "lucide-react";
import { PACKAGES } from "@/lib/content";
import { contactHref } from "@/lib/contact";
import { Reveal } from "./reveal";
import { zl } from "@/lib/format";


export function Pricing() {
  return (
    <section id="cennik" className="bg-forest py-24 text-paper sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.18em] text-gold">Cennik</p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl leading-[1.05] sm:text-6xl">
            Stała cena. <em className="text-clay-soft">Bez</em> „to zależy”.
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-paper/70">
            Wiesz, ile zapłacisz, zanim zaczniemy. Domenę i hosting opłacasz na swoim koncie, więc strona zawsze należy do Ciebie.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {PACKAGES.map((pkg, i) => (
            <Reveal key={pkg.name} delay={i * 0.1}>
              <div
                className={`flex h-full flex-col rounded-3xl p-8 sm:p-10 ${
                  i === 0 ? "bg-paper text-ink" : "border border-paper/15 bg-moss/40"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-4xl">{pkg.name}</h3>
                  <span className={`rounded-full px-3 py-1 text-xs ${i === 0 ? "bg-cream text-muted" : "bg-paper/10 text-paper/70"}`}>
                    {pkg.time}
                  </span>
                </div>
                <p className={`mt-3 ${i === 0 ? "text-ink/70" : "text-paper/70"}`}>{pkg.lead}</p>

                <div className="mt-8 flex items-end gap-3">
                  <span className="font-display text-6xl leading-none">{zl(pkg.price)}</span>
                  <span className={`pb-1 text-sm ${i === 0 ? "text-muted" : "text-paper/60"}`}>jednorazowo</span>
                </div>
                {pkg.pilot && (
                  <p className="mt-3 inline-flex w-fit rounded-full bg-clay-soft px-3 py-1 text-sm text-clay">
                    Cena pilotażowa: {zl(pkg.pilot)} · zostały 3 miejsca
                  </p>
                )}

                <ul className="mt-8 flex-1 space-y-3">
                  {pkg.items.map((it) => (
                    <li key={it} className="flex gap-3 text-[15px]">
                      <Check className={`mt-0.5 size-4 shrink-0 ${i === 0 ? "text-clay" : "text-gold"}`} />
                      {it}
                    </li>
                  ))}
                </ul>

                <a
                  href={contactHref(`Pakiet ${pkg.name}`)}
                  className={`mt-10 rounded-full px-6 py-4 text-center transition-colors ${
                    i === 0 ? "bg-ink text-paper hover:bg-clay" : "bg-paper text-ink hover:bg-clay hover:text-paper"
                  }`}
                >
                  Chcę {pkg.name === "Strona" ? "stronę" : "sklep"}
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-10 text-center text-sm text-paper/60">
            Potrzebujesz czegoś nietypowego, np. aplikacji, kalkulatora albo strony z wyjątkowymi animacjami?{" "}
            <a href={contactHref("Projekt indywidualny")} className="text-paper underline underline-offset-4 hover:text-clay-soft">
              Wyceniam indywidualnie
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
