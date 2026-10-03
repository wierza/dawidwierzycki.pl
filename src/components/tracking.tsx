"use client";

import { useEffect } from "react";
import { openCookieSettings } from "./cookie-consent";
import { track } from "@/lib/analytics";

/** Zlicza kliknięcia w adres e-mail w całej stronie. */
export function TrackClicks() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (href.startsWith("mailto:") && !href.includes("body=")) track("kontakt_email", { link_url: href.split("?")[0] });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}

export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openCookieSettings} className={className}>
      Ustawienia cookies
    </button>
  );
}
