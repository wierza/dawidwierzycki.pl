import { CONTACT } from "./content";

/** Link do kontaktu: Cal.com, jeśli jest ustawiony, inaczej e-mail z tematem i treścią. */
export function contactHref(subject: string, body?: string) {
  if (CONTACT.calUrl && !body) return CONTACT.calUrl;
  const params = new URLSearchParams({ subject });
  if (body) params.set("body", body);
  return `mailto:${CONTACT.email}?${params.toString().replace(/\+/g, "%20")}`;
}
