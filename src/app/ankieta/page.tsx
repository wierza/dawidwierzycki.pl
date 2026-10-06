import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/sections";
import { Survey } from "@/components/survey";

// Ankieta przed rozmową. Nie ma jej w menu ani w mapie strony: link wysyłam klientom razem z zaproszeniem na rozmowę.
export const metadata: Metadata = {
  title: "Ankieta przed rozmową | Dawid Wierzycki",
  description: "Kilka pytań o Twoją firmę i stronę. Na końcu zobaczysz rekomendowany pakiet i wybierzesz termin rozmowy.",
  alternates: { canonical: "/ankieta/" },
  robots: { index: false, follow: false },
};

export default function SurveyPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-4 pb-24 pt-32 sm:px-6 sm:pt-40">
        <p className="text-xs uppercase tracking-[0.18em] text-clay">Ankieta przed rozmową</p>
        <h1 className="mt-3 font-display text-4xl leading-[1.05] sm:text-6xl">
          Opowiedz mi o firmie. <em>W 3 minuty.</em>
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink/75">
          Klikasz odpowiedzi, a ja przychodzę na rozmowę przygotowany. Na końcu zobaczysz rekomendowany pakiet ze stałą ceną i
          wybierzesz termin rozmowy. Strona jest gotowa w tydzień.
        </p>
        <div className="mt-12">
          <Survey />
        </div>
      </main>
      <Footer />
    </>
  );
}
