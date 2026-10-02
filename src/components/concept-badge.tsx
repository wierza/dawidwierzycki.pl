import { ArrowLeft } from "lucide-react";

/** Pasek na stronach koncepcyjnych: wyraźna informacja, że firma jest fikcyjna + powrót do portfolio. */
export function ConceptBadge({ dark = false }: { dark?: boolean }) {
  return (
    <div
      data-concept-badge
      className={`fixed bottom-4 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-3 rounded-full px-2 py-2 pl-4 text-[13px] shadow-xl backdrop-blur ${
        dark ? "bg-white/90 text-neutral-900" : "bg-neutral-900/90 text-white"
      }`}
    >
      <span className="whitespace-nowrap">Projekt koncepcyjny · firma fikcyjna</span>
      <a
        href="/#koncepcje"
        className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 ${
          dark ? "bg-neutral-900 text-white" : "bg-white text-neutral-900"
        }`}
      >
        <ArrowLeft className="size-3.5" /> Portfolio
      </a>
    </div>
  );
}
