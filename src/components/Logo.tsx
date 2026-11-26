export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2">
      <svg viewBox="0 0 32 32" className="size-8" aria-hidden="true">
        <rect width="32" height="32" rx="9" fill={light ? "#ffffff" : "#393e99"} />
        <path d="M16 7v18M10 13h12" stroke={light ? "#393e99" : "#ffffff"} strokeWidth="3" strokeLinecap="round" />
        <circle cx="24.5" cy="24.5" r="3.5" fill="#f2c14e" />
      </svg>
      <span className={`display text-xl font-bold ${light ? "text-white" : "text-ink"}`}>
        Ministerio<span className={light ? "text-gold" : "text-indigo"}>On</span>
      </span>
    </span>
  );
}
