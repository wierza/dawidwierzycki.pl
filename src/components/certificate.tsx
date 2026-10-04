"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Award, X } from "lucide-react";

/** Plakietka z certyfikatem Kodilla — po kliknięciu pokazuje skan zaświadczenia. */
export function CertificateBadge() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group mt-8 flex w-full max-w-md items-center gap-4 rounded-2xl border border-line bg-paper p-4 text-left transition-colors hover:border-clay"
      >
        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-clay-soft text-clay">
          <Award className="size-6" />
        </span>
        <span>
          <span className="block font-medium">Full Stack Developer — Kodilla</span>
          <span className="block text-sm text-muted">Bootcamp 800 godzin · 2023–2024 · zobacz zaświadczenie</span>
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[95] grid place-items-center bg-forest/80 p-4 backdrop-blur-sm"
            role="dialog"
            aria-label="Zaświadczenie o ukończeniu bootcampu Full Stack Developer Plus"
          >
            <motion.div initial={{ scale: 0.96, y: 10 }} animate={{ scale: 1, y: 0 }} className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Zamknij"
                className="absolute -top-12 right-0 grid size-10 place-items-center rounded-full bg-paper text-ink"
              >
                <X className="size-5" />
              </button>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/certyfikat-kodilla.jpg" alt="Zaświadczenie Kodilla: Bootcamp Full Stack Developer Plus, 800 godzin" className="w-full rounded-xl shadow-2xl" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
