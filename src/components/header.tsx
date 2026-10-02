"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { contactHref } from "@/lib/contact";

const NAV = [
  { href: "/#realizacje", label: "Realizacje" },
  { href: "/#cennik", label: "Cennik" },
  { href: "/#wycena", label: "Wycena" },
  { href: "/#jak-pracuje", label: "Jak pracuję" },
  { href: "/#faq", label: "FAQ" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "bg-cream/85 backdrop-blur-md border-b border-line" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="/" className="flex items-baseline gap-2" onClick={() => setOpen(false)}>
          <span className="font-display text-2xl leading-none">Dawid Wierzycki</span>
          <span className="hidden text-[11px] uppercase tracking-[0.18em] text-muted sm:inline">strony · sklepy</span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="text-sm text-ink/70 transition-colors hover:text-ink">
              {n.label}
            </a>
          ))}
          <a
            href={contactHref("Rozmowa o stronie")}
            className="rounded-full bg-ink px-5 py-2.5 text-sm text-paper transition-colors hover:bg-clay"
          >
            Umów rozmowę
          </a>
        </nav>

        <button
          type="button"
          aria-label={open ? "Zamknij menu" : "Otwórz menu"}
          className="grid size-10 place-items-center rounded-full border border-line md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-line px-4 pb-6 pt-2 md:hidden">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block border-b border-line/70 py-3.5 text-lg"
            >
              {n.label}
            </a>
          ))}
          <a
            href={contactHref("Rozmowa o stronie")}
            className="mt-5 block rounded-full bg-ink px-5 py-3.5 text-center text-paper"
          >
            Umów rozmowę
          </a>
        </nav>
      )}
    </header>
  );
}
