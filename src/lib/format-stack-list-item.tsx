import type { ReactNode } from "react";

/** Met en avant `Libellé :` au début d’une puce (même convention que le stack technique). */
export function formatStackListItem(text: string): ReactNode {
  const idx = text.indexOf(": ");
  if (idx <= 0) return text;
  const label = text.slice(0, idx).trim();
  const value = text.slice(idx + 2).trim();
  if (!label || !value) return text;
  return (
    <>
      <span className="font-semibold text-[var(--color-text)]">{label}:</span>
      <span> {value}</span>
    </>
  );
}
