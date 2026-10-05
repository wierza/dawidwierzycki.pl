"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { contactHref } from "@/lib/contact";

const ease = [0.22, 1, 0.36, 1] as const;


export function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-28 sm:pb-24 sm:pt-36">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-1.5 text-xs uppercase tracking-[0.16em] text-muted"
          >
            <span className="size-1.5 rounded-full bg-clay" />
            Strony i sklepy internetowe
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="font-display text-[44px] leading-[1.02] tracking-[-0.01em] sm:text-6xl lg:text-[76px]"
          >
            Strona albo sklep, który <em className="text-clay">sprzedaje</em>. Gotowy w&nbsp;7&nbsp;dni.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-ink/75"
          >
            Projektuję i wdrażam strony oraz sklepy dla małych firm. W cenie dostajesz to, czego zwykle brakuje tanim
            stronom: płatności BLIK, zgodność z RODO, Google Analytics i wizytówkę Google.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <a
              href="#wycena"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 text-paper transition-colors hover:bg-clay"
            >
              Sprawdź cenę w 30 sekund
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={contactHref("Rozmowa o stronie")}
              className="inline-flex items-center justify-center rounded-full border border-ink/20 px-7 py-4 transition-colors hover:border-ink"
            >
              Umów 20 minut rozmowy
            </a>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted"
          >
            {["Strona od 1 500 zł", "Sklep od 3 000 zł", "Stała cena, bez niespodzianek"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Check className="size-4 text-clay" /> {t}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease }}
          className="relative mx-auto w-full max-w-[420px]"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-forest shadow-[0_40px_80px_-30px_rgba(19,32,27,0.55)]">
            <Image
              src="/dawid.jpg"
              alt="Dawid Wierzycki"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 420px"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest/90 to-transparent p-6 pt-16">
              <p className="font-display text-2xl text-paper">Dawid Wierzycki</p>
              <p className="text-sm text-paper/70">strony, sklepy i lejki sprzedażowe</p>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
