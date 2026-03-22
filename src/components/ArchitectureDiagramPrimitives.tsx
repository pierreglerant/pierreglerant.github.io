import type { ReactNode } from "react";

export function VLine({ className = "" }: { className?: string }) {
  return (
    <div
      className={`w-px shrink-0 rounded-full bg-gradient-to-b from-[rgba(var(--primary),0.5)] to-[rgba(var(--primary),0.12)] ${className}`}
      aria-hidden
    />
  );
}

export function FlowDown() {
  return (
    <span
      className="select-none text-xs leading-none text-[rgb(var(--primary))] opacity-90"
      aria-hidden
    >
      ▼
    </span>
  );
}

export function LayerCard({
  title,
  subtitle,
  extra,
  variant = "default",
  className = "",
}: {
  title: string;
  subtitle?: string;
  extra?: ReactNode;
  variant?: "default" | "worker" | "database" | "storage";
  className?: string;
}) {
  const ring =
    variant === "worker"
      ? "border-[rgba(var(--primary),0.22)] bg-[var(--color-surface)]/35 shadow-[0_0_0_1px_rgba(var(--primary),0.08)_inset]"
      : variant === "database"
        ? "border-[rgba(var(--primary),0.28)] bg-[rgba(var(--primary),0.06)] shadow-[0_0_24px_-8px_rgba(var(--primary),0.35),inset_0_1px_0_rgba(255,255,255,0.07)]"
        : variant === "storage"
          ? "border-[rgba(var(--primary),0.2)] bg-[var(--color-surface)]/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
          : "border-[var(--color-border)] bg-[var(--color-surface)]/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]";

  return (
    <div
      className={`w-full min-w-0 rounded-xl border px-2.5 py-2 text-center md:px-3 md:py-2.5 ${ring} ${className}`}
    >
      <p className="text-xs font-semibold leading-tight tracking-tight text-[var(--color-text)] text-balance md:text-sm">
        {title}
      </p>
      {subtitle ? (
        <p className="mt-1 text-[0.7rem] leading-snug text-balance text-[var(--color-text-muted)] md:text-xs">
          {subtitle}
        </p>
      ) : null}
      {extra}
    </div>
  );
}
