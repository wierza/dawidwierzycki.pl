import { FEATURES } from "@/lib/content";

export function Marquee() {
  const items = [...FEATURES, ...FEATURES];
  return (
    <div className="overflow-hidden border-y border-forest bg-forest py-5 text-paper" aria-label="Co jest w cenie">
      <div className="marquee flex w-max gap-10">
        {items.map((f, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap font-display text-2xl italic">
            {f}
            <span className="text-gold not-italic">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
