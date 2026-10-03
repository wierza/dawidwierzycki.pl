"use client";

import { useEffect, useState } from "react";
import { CONSENT_KEY, META_PIXEL_ID } from "@/lib/analytics";

type Consent = "accepted" | "declined" | null;
type Fn = ((...args: unknown[]) => void) & { callMethod?: Fn; queue?: unknown[]; loaded?: boolean; version?: string; push?: unknown };
type W = Window & { gtag?: Fn; fbq?: Fn; _fbq?: Fn };

const ONE_YEAR = 60 * 60 * 24 * 365;

function readConsent(): Consent {
  const m = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_KEY}=([^;]+)`));
  if (m) return m[1] as Consent;
  try {
    return (localStorage.getItem(CONSENT_KEY) as Consent) ?? null;
  } catch {
    return null;
  }
}

function saveConsent(value: Exclude<Consent, null>) {
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_KEY}=${value}; path=/; max-age=${ONE_YEAR}; SameSite=Lax${secure}`;
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {}
}

function applyConsent(granted: boolean) {
  const w = window as W;
  const v = granted ? "granted" : "denied";
  w.gtag?.("consent", "update", { ad_storage: v, ad_user_data: v, ad_personalization: v, analytics_storage: v });
  if (granted) loadMetaPixel();
}

// Oficjalny kod piksela Meta — ładowany wyłącznie po zgodzie.
function loadMetaPixel() {
  const w = window as W;
  if (!META_PIXEL_ID || w.fbq) return;
  const n: Fn = function (...args: unknown[]) {
    if (n.callMethod) n.callMethod(...args);
    else n.queue!.push(args);
  } as Fn;
  n.push = n;
  n.loaded = true;
  n.version = "2.0";
  n.queue = [];
  w.fbq = w._fbq = n;
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(s);
  n("init", META_PIXEL_ID);
  n("track", "PageView");
}

/** Link „Ustawienia cookies” w stopce: wycofuje zgodę i ponownie pokazuje baner. */
export function openCookieSettings() {
  document.cookie = `${CONSENT_KEY}=; path=/; max-age=0`;
  try {
    localStorage.removeItem(CONSENT_KEY);
  } catch {}
  applyConsent(false);
  window.dispatchEvent(new Event("dw-cookie-settings"));
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const c = readConsent();
    if (c === null) setVisible(true);
    if (c === "accepted") loadMetaPixel();
    const open = () => setVisible(true);
    window.addEventListener("dw-cookie-settings", open);
    return () => window.removeEventListener("dw-cookie-settings", open);
  }, []);

  const choose = (accepted: boolean) => {
    saveConsent(accepted ? "accepted" : "declined");
    applyConsent(accepted);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[90] p-3 sm:p-5" role="dialog" aria-label="Zgoda na pliki cookies">
      <div className="mx-auto flex max-w-4xl flex-col gap-4 rounded-2xl border border-paper/10 bg-forest px-5 py-5 text-paper shadow-2xl sm:flex-row sm:items-center sm:px-6">
        <p className="flex-1 text-sm leading-relaxed text-paper/75">
          Używam plików cookies niezbędnych do działania strony, a za Twoją zgodą także analitycznych (Google Analytics){META_PIXEL_ID ? " i marketingowych (piksel Meta)" : ""},
          żeby wiedzieć, co na stronie działa. Zgodę możesz zmienić w każdej chwili w „Ustawieniach cookies” w stopce.{" "}
          <a href="/polityka-prywatnosci/" className="text-paper underline underline-offset-2 hover:text-clay-soft">
            Polityka prywatności
          </a>
        </p>
        <div className="flex shrink-0 gap-2">
          <button onClick={() => choose(false)} className="rounded-full border border-paper/20 px-4 py-2.5 text-sm text-paper/70 hover:border-paper hover:text-paper">
            Tylko niezbędne
          </button>
          <button onClick={() => choose(true)} className="rounded-full bg-clay px-5 py-2.5 text-sm hover:bg-paper hover:text-ink">
            Akceptuję
          </button>
        </div>
      </div>
    </div>
  );
}
