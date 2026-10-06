"use client";

import { useEffect, useRef } from "react";
import { track } from "@/lib/analytics";

const CAL_ORIGIN = "https://app.cal.com";
const CAL_NAMESPACE = "rozmowa-o-stronie-www";
const CAL_LINK = "instapara/rozmowa-o-stronie-www";
// Tło karty z kalendarzem i kolor przycisków jak na stronie.
const BG_COLOR = "#fbf8f2";
const BRAND_COLOR = "#16201b";

type CalFn = ((...args: unknown[]) => void) & {
  loaded?: boolean;
  q?: unknown[];
  ns?: Record<string, ((...args: unknown[]) => void) | undefined>;
  config?: Record<string, unknown>;
};

declare global {
  interface Window {
    Cal?: CalFn;
  }
}

// Oficjalny skrypt ładujący Cal.com, przepisany na TypeScript.
function loadCal(w: Window) {
  if (w.Cal) return;
  const queue = (api: CalFn, args: unknown) => {
    (api.q = api.q || []).push(args);
  };
  const cal: CalFn = function (...args: unknown[]) {
    if (!cal.loaded) {
      cal.ns = {};
      cal.q = cal.q || [];
      const s = w.document.createElement("script");
      s.src = `${CAL_ORIGIN}/embed/embed.js`;
      w.document.head.appendChild(s);
      cal.loaded = true;
    }
    if (args[0] === "init") {
      const namespace = args[1];
      const api = ((...a: unknown[]) => queue(api, a)) as CalFn;
      api.q = api.q || [];
      if (typeof namespace === "string") {
        cal.ns![namespace] = cal.ns![namespace] || api;
        queue(cal.ns![namespace]!, args);
        queue(cal, ["initNamespace", namespace]);
      } else {
        queue(cal, args);
      }
      return;
    }
    queue(cal, args);
  };
  w.Cal = cal;
}

export function CalEmbed({ className, prefill }: { className?: string; prefill?: { name?: string; email?: string } }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    loadCal(window);
    const Cal = window.Cal!;

    Cal("init", CAL_NAMESPACE, { origin: CAL_ORIGIN });
    Cal.config = Cal.config || {};
    Cal.config.forwardQueryParams = true;

    const ns = Cal.ns![CAL_NAMESPACE]!;
    ns("inline", {
      elementOrSelector: el,
      config: { layout: "month_view", useSlotsViewOnSmallScreen: "true", theme: "light", ...prefill },
      calLink: CAL_LINK,
    });
    ns("ui", {
      theme: "light",
      hideEventTypeDetails: false,
      layout: "month_view",
      styles: { branding: { brandColor: BRAND_COLOR } },
      cssVarsPerTheme: {
        light: { "cal-bg": BG_COLOR, "cal-brand": BRAND_COLOR },
        dark: { "cal-bg": BG_COLOR, "cal-brand": BRAND_COLOR },
      },
    });

    // Główna konwersja: rezerwacja rozmowy w kalendarzu
    const onBooked = () => track("generate_lead", { method: prefill ? "cal_po_ankiecie" : "cal_rozmowa" }, "Lead");
    ns("on", { action: "bookingSuccessfulV2", callback: onBooked });

    return () => {
      el.innerHTML = "";
    };
  }, []);

  return <div ref={ref} className={className} style={{ width: "100%", overflow: "auto" }} />;
}
