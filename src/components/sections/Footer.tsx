import { Copyright } from "lucide-react";

export function Footer() {
  return (
    <footer className="mx-[var(--page-x)] flex flex-col gap-2 border-t border-rule py-6 font-mono text-[10px] uppercase tracking-[0.11em] text-ink-2 sm:flex-row sm:items-center sm:justify-between">
      <span className="inline-flex items-center gap-1.5">
        <Copyright size={12} strokeWidth={1.8} aria-hidden="true" />
        2026 전종환
      </span>
      <span>Designed &amp; Built by 전종환 (DalYeoU)</span>
    </footer>
  );
}
