"use client";

import { useCallback, useId, useState } from "react";
import { ChevronDown } from "lucide-react";

export type AccordionSection = {
  title: string;
  body: string;
};

function bodyParagraphs(body: string): string[] {
  return body
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
}

type Props = {
  sections: AccordionSection[];
  /** Index de la section ouverte au chargement (-1 = toutes fermées) */
  defaultOpenIndex?: number;
};

export default function ProjectDetailAccordion({
  sections,
  defaultOpenIndex = 0,
}: Props) {
  const baseId = useId();
  const [open, setOpen] = useState<Record<number, boolean>>(() => {
    const init: Record<number, boolean> = {};
    sections.forEach((_, i) => {
      init[i] = defaultOpenIndex === i;
    });
    return init;
  });

  const toggle = useCallback((i: number) => {
    setOpen((prev) => ({ ...prev, [i]: !prev[i] }));
  }, []);

  return (
    <div className="project-detail-accordion space-y-2">
      {sections.map((section, i) => {
        const isOpen = open[i] ?? false;
        const panelId = `${baseId}-panel-${i}`;
        const headerId = `${baseId}-header-${i}`;
        return (
          <div
            key={i}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/40 overflow-hidden"
          >
            <button
              type="button"
              id={headerId}
              className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition-colors hover:bg-[var(--color-surface)]/80 md:px-5 md:py-4"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(i)}
            >
              <span className="text-base font-semibold tracking-tight text-[var(--color-text)] md:text-lg">
                {section.title}
              </span>
              <ChevronDown
                className={
                  "h-5 w-5 shrink-0 text-[rgb(var(--primary))] transition-transform duration-200 md:h-6 md:w-6 " +
                  (isOpen ? "rotate-180" : "rotate-0")
                }
                aria-hidden
              />
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              hidden={!isOpen}
              className="border-t border-[var(--color-border)] px-4 pb-4 pt-3 md:px-5 md:pb-5 md:pt-4"
            >
              <div className="space-y-3 text-sm leading-relaxed text-[var(--color-text-muted)] md:text-base">
                {bodyParagraphs(section.body).map((para, j) => (
                  <p key={j}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
