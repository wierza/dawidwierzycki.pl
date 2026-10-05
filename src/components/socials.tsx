import { SOCIALS } from "@/lib/content";

const ICONS: Record<string, React.ReactNode> = {
  Facebook: (
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  ),
  GitHub: (
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4M9 18c-4.51 2-5-2-7-2" />
  ),
  Instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </>
  ),
};

/** Ikony mediów społecznościowych (Facebook, Instagram). */
export function Socials({ className = "", itemClassName = "" }: { className?: string; itemClassName?: string }) {
  return (
    <div className={`flex gap-3 ${className}`}>
      {SOCIALS.map((s) => (
        <a
          key={s.name}
          href={s.url}
          target="_blank"
          rel="noopener"
          aria-label={s.name}
          title={s.handle ?? s.name}
          className={`grid size-10 place-items-center rounded-full border transition-colors ${itemClassName}`}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-[18px]">
            {ICONS[s.name]}
          </svg>
        </a>
      ))}
    </div>
  );
}
