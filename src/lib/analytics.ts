// Analityka: Google Analytics 4 i (opcjonalnie) piksel Meta — oba działają dopiero po zgodzie w banerze cookies.
export const GA_ID = "G-GV4K1F7LD2";
// Identyfikator zbioru danych Meta (piksel). Pusty = piksel się nie ładuje.
export const META_PIXEL_ID = "1110382261400588";

export const CONSENT_KEY = "dw_cookie_consent";

type Fn = (...args: unknown[]) => void;
type W = Window & { gtag?: Fn; fbq?: Fn };

/** Wysyła zdarzenie do GA4 (a jeśli podano metaEvent — także do piksela Meta). */
export function track(event: string, params: Record<string, unknown> = {}, metaEvent?: string) {
  if (typeof window === "undefined") return;
  const w = window as W;
  w.gtag?.("event", event, params);
  if (metaEvent) w.fbq?.("track", metaEvent, params);
}
