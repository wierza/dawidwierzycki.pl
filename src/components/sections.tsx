import Image from "next/image";
import { ArrowRight, Mail, Plus } from "lucide-react";
import { COMPANY, CONTACT, FAQ, STEPS } from "@/lib/content";
import { contactHref } from "@/lib/contact";
import { Reveal } from "./reveal";
import { CalEmbed } from "./cal-embed";
import { CookieSettingsButton } from "./tracking";
import { Socials } from "./socials";
import { CertificateBadge } from "./certificate";

export function Process() {
  return (
    <section id="jak-pracuje" className="border-t border-line bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.18em] text-clay">Jak pracuję</p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl leading-[1.05] sm:text-6xl">
            Cztery kroki. <em>Zero chaosu.</em>
          </h2>
        </Reveal>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.title} className="bg-paper p-7 sm:p-8">
              <Reveal delay={i * 0.08}>
                <span className="font-display text-6xl italic text-clay/80">0{i + 1}</span>
                <h3 className="mt-6 text-xl font-medium">{s.title}</h3>
                <p className="mt-1 text-sm text-muted">{s.time}</p>
                <p className="mt-4 text-[15px] leading-relaxed text-ink/75">{s.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="o-mnie" className="py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[380px] overflow-hidden rounded-[28px]">
            <Image src="/dawid.jpg" alt="Dawid Wierzycki" fill sizes="380px" className="object-cover" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-xs uppercase tracking-[0.18em] text-clay">O mnie</p>
          <h2 className="mt-3 font-display text-4xl leading-[1.05] sm:text-5xl">
            Cześć, jestem Dawid. <em>Łączę technologię z marketingiem.</em>
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink/75">
            <p>
              Współtworzę agencję InstaPara, w której pomagamy prawnikom, klinikom i agentom nieruchomości budować zaufanie
              w sieci. Na co dzień widzę, że strona ma jedno zadanie: zamieniać odwiedzających w klientów.
            </p>
            <p>
              Dlatego razem ze stroną dostajesz to, czego zwykle brakuje: płatności, analitykę, formularze, które naprawdę
              trafiają do Ciebie, i zgodność z RODO. Pracuję bezpośrednio z Tobą, bez pośredników i bez juniorów.
            </p>
            <p>
              Programowania uczyłem się na 800-godzinnym bootcampie Full Stack Developer w Kodilli. Dlatego oprócz stron
              na WordPressie robię też rzeczy w kodzie: React, Next.js, Node.js, integracje i bazy danych.
            </p>
          </div>
          <CertificateBadge />
          <a
            href={contactHref("Rozmowa o stronie")}
            className="group mt-9 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 text-paper transition-colors hover:bg-clay"
          >
            Porozmawiajmy o Twojej stronie
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
          <div className="mt-8 flex items-center gap-4">
            <span className="text-sm text-muted">Obserwuj, co tworzę:</span>
            <Socials itemClassName="border-line text-ink/70 hover:border-clay hover:text-clay" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Booking() {
  return (
    <section id="rozmowa" className="border-t border-line py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-start gap-12 px-4 sm:px-6 lg:grid-cols-[0.75fr_1.25fr]">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.18em] text-clay">Rozmowa</p>
          <h2 className="mt-3 font-display text-4xl leading-[1.05] sm:text-6xl">
            Umów 20 minut. <em>Bez zobowiązań.</em>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-ink/75">
            Wybierz termin w kalendarzu. Porozmawiamy o Twojej firmie, a na koniec usłyszysz, co ma sens, ile to kosztuje i kiedy
            może być gotowe.
          </p>
          <ul className="mt-8 space-y-3 text-ink/80">
            {["Rozmowa online: wystarczy telefon lub komputer", "Konkretna wycena i termin po rozmowie", "Bez presji i bez ukrytych kosztów"].map((t) => (
              <li key={t} className="flex gap-3">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-clay" />
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-muted">
            Kalendarz się nie wyświetla?{" "}
            <a href={CONTACT.calUrl} target="_blank" rel="noopener" className="underline underline-offset-4 hover:text-clay">
              Otwórz go w nowej karcie
            </a>
            .
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="min-h-[640px] overflow-hidden rounded-3xl border border-line bg-paper p-2 sm:p-4">
            <CalEmbed className="min-h-[620px]" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="faq" className="border-t border-line bg-paper py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.18em] text-clay">FAQ</p>
          <h2 className="mt-3 font-display text-4xl leading-[1.05] sm:text-6xl">
            Pytania, które <em>zwykle padają.</em>
          </h2>
          <p className="mt-5 text-ink/70">
            Nie ma Twojego pytania? Napisz na{" "}
            <a href={`mailto:${CONTACT.email}`} className="underline underline-offset-4 hover:text-clay">
              {CONTACT.email}
            </a>
            .
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="divide-y divide-line border-y border-line">
            {FAQ.map((f) => (
              <details key={f.q} className="group py-1">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg">
                  {f.q}
                  <Plus className="faq-icon size-5 shrink-0 text-clay transition-transform duration-300" />
                </summary>
                <p className="pb-6 pr-10 leading-relaxed text-ink/75">{f.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="kontakt" className="bg-forest py-24 text-paper sm:py-32">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <Reveal>
          <h2 className="mx-auto max-w-4xl font-display text-5xl leading-[1.02] sm:text-7xl">
            Twoja strona może działać <em className="text-clay-soft">już za tydzień.</em>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-paper/70">
            Napisz w dwóch zdaniach, czym zajmuje się Twoja firma. Odpowiem w ciągu jednego dnia roboczego z propozycją
            i terminem.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={contactHref("Rozmowa o stronie")}
              className="rounded-full bg-clay px-8 py-4 transition-colors hover:bg-paper hover:text-ink"
            >
              Umów 20 minut rozmowy
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-paper/25 px-8 py-4 transition-colors hover:border-paper"
            >
              <Mail className="size-4" /> {CONTACT.email}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-forest pb-10 text-paper/50">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-paper/10 px-4 pt-8 text-sm sm:flex-row sm:px-6">
        <div>
          <p>© {new Date().getFullYear()} Dawid Wierzycki · strony i sklepy internetowe</p>
          <p className="mt-1 text-xs text-paper/35">
            {COMPANY.name} · {COMPANY.street}, {COMPANY.city} · NIP {COMPANY.nip} · REGON {COMPANY.regon}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <Socials itemClassName="border-paper/15 text-paper/60 hover:border-paper hover:text-paper" />
          <a href="/polityka-prywatnosci/" className="hover:text-paper">
            Polityka prywatności
          </a>
          <CookieSettingsButton className="hover:text-paper" />
          <a href="https://instapara.pl" target="_blank" rel="noopener" className="hover:text-paper">
            InstaPara
          </a>
        </div>
      </div>
    </footer>
  );
}
