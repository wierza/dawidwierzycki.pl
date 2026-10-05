import { ArrowUpRight, Check } from "lucide-react";
import { CONCEPTS, PROJECTS, type Project } from "@/lib/content";
import { contactHref } from "@/lib/contact";
import { Reveal } from "./reveal";

function Showcase({ p }: { p: Project }) {
  return (
    <div className="group relative">
      {/* Przeglądarka */}
      <div className="overflow-hidden rounded-2xl border border-ink/10 bg-paper shadow-[0_30px_60px_-30px_rgba(19,32,27,0.45)]">
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="size-2.5 rounded-full bg-[#e8a598]" />
          <span className="size-2.5 rounded-full bg-[#e9cf8f]" />
          <span className="size-2.5 rounded-full bg-[#a9c9a4]" />
          <span className="ml-3 truncate rounded-full bg-cream px-3 py-1 text-xs text-muted">{p.urlLabel}</span>
        </div>
        <div className={`relative aspect-[16/10] overflow-hidden ${p.scroll ? "scrollshot" : ""}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.desktop} alt={`${p.title}: widok na komputerze`} loading="lazy" className="absolute left-0 top-0 w-full" />
        </div>
      </div>
      {/* Telefon */}
      <div className="absolute -bottom-8 -right-2 w-[26%] min-w-[96px] overflow-hidden rounded-[22px] border-[5px] border-forest bg-forest shadow-2xl sm:-right-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.mobile} alt={`${p.title}: widok na telefonie`} className="block aspect-[390/844] w-full object-cover object-top" />
      </div>
      {p.scroll && (
        <p className="mt-3 hidden text-xs text-muted lg:block">Najedź kursorem, żeby przewinąć stronę</p>
      )}
    </div>
  );
}

export function Work() {
  return (
    <section id="realizacje" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.18em] text-clay">Realizacje</p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl leading-[1.05] sm:text-6xl">
            Nie tylko ładne. <em>Działają</em> i zarabiają.
          </h2>
        </Reveal>

        <div className="mt-16 space-y-28 sm:mt-20 sm:space-y-36">
          {PROJECTS.map((p, i) => (
            <div key={p.slug} className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
              <Reveal className={i % 2 ? "lg:order-2" : ""}>
                <Showcase p={p} />
              </Reveal>

              <Reveal delay={0.1}>
                <p className="text-sm text-muted">{p.client}</p>
                <h3 className="mt-2 font-display text-3xl leading-tight sm:text-4xl">{p.title}</h3>

                <dl className="mt-6 space-y-4 text-[15px] leading-relaxed">
                  <div>
                    <dt className="text-xs uppercase tracking-[0.16em] text-muted">Wyzwanie</dt>
                    <dd className="mt-1 text-ink/80">{p.problem}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.16em] text-muted">Rozwiązanie</dt>
                    <dd className="mt-1 text-ink/80">{p.solution}</dd>
                  </div>
                </dl>

                <ul className="mt-6 space-y-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-3 text-[15px]">
                      <Check className="mt-0.5 size-4 shrink-0 text-clay" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span key={s} className="rounded-full border border-line bg-paper px-3 py-1 text-xs text-muted">
                      {s}
                    </span>
                  ))}
                </div>

                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener"
                  className="mt-7 inline-flex items-center gap-1.5 border-b border-ink pb-0.5 text-sm transition-colors hover:border-clay hover:text-clay"
                >
                  Zobacz {p.urlLabel} <ArrowUpRight className="size-4" />
                </a>
              </Reveal>
            </div>
          ))}
        </div>

        <div id="koncepcje" className="mt-32 scroll-mt-24">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.18em] text-clay">Projekty koncepcyjne</p>
            <h3 className="mt-3 max-w-3xl font-display text-4xl leading-[1.05] sm:text-5xl">
              Tak może wyglądać <em>strona Twojej branży.</em>
            </h3>
            <p className="mt-4 max-w-2xl text-ink/70">
              Działające wersje pokazowe dla fikcyjnych firm. Kliknij i przetestuj rezerwację, kalendarz czy koszyk.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {CONCEPTS.map((c, i) => (
              <Reveal key={c.slug} delay={(i % 2) * 0.1}>
                <a href={`/koncepcje/${c.slug}/`} className="group block">
                  <div className="overflow-hidden rounded-2xl border border-ink/10 bg-paper shadow-[0_24px_50px_-30px_rgba(19,32,27,0.45)]">
                    <div className="flex items-center gap-1.5 border-b border-line px-4 py-2.5">
                      <span className="size-2 rounded-full bg-[#e8a598]" />
                      <span className="size-2 rounded-full bg-[#e9cf8f]" />
                      <span className="size-2 rounded-full bg-[#a9c9a4]" />
                    </div>
                    <div className="scrollshot relative aspect-[16/10] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`/koncepcje/miniatury/${c.slug}.jpg`} alt={`${c.name}: podgląd`} loading="lazy" className="absolute left-0 top-0 w-full" />
                    </div>
                  </div>
                  <div className="mt-5 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-muted">{c.kind}</p>
                      <p className="mt-1 font-display text-3xl">{c.name}</p>
                    </div>
                    <span className="mt-2 inline-flex shrink-0 items-center gap-1 text-sm transition-colors group-hover:text-clay">
                      Otwórz <ArrowUpRight className="size-4" />
                    </span>
                  </div>
                  <p className="mt-2 text-[15px] text-ink/70">{c.desc}</p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal>
          <div className="mt-32 flex flex-col items-start justify-between gap-6 rounded-3xl border border-dashed border-ink/25 p-8 sm:flex-row sm:items-center sm:p-10">
            <div>
              <p className="font-display text-3xl">
                Tu może być <em className="text-clay">Twoja firma.</em>
              </p>
              <p className="mt-2 max-w-xl text-ink/70">
                Zostały 3 miejsca w cenie pilotażowej: strona za 1 000 zł zamiast 1 500 zł, w zamian za opinię i zgodę na
                pokazanie projektu w portfolio.
              </p>
            </div>
            <a
              href={contactHref("Miejsce w cenie pilotażowej")}
              className="shrink-0 rounded-full bg-clay px-6 py-3.5 text-paper transition-colors hover:bg-ink"
            >
              Zarezerwuj miejsce
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
