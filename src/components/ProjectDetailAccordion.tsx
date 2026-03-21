"use client";

import type { ReactNode } from "react";
import { useCallback, useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { bodyParagraphs, stackBulletItems } from "../lib/body-paragraphs";

export type AccordionSection = {
  title: string;
  body: string | ReactNode;
  /** `bulletList` : une ligne = une puce, préfixe `- ` (ou `• ` / `* `). `preformatted` : bloc monospace (schéma ASCII). */
  bodyVariant?: "prose" | "bulletList" | "preformatted";
};

type Props = {
  sections: AccordionSection[];
  /** Index de la section ouverte au chargement (-1 = toutes fermées) */
  defaultOpenIndex?: number;
};

/** Met en avant `Libellé :` au début de chaque puce (format stack). */
function formatStackListItem(text: string): ReactNode {
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

function renderStringAccordionBody(
  body: string,
  variant: AccordionSection["bodyVariant"],
) {
  if (variant === "preformatted") {
    return (
      <pre
        className="overflow-x-auto rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)]/90 p-3 font-mono text-[0.62rem] leading-snug text-[var(--color-text-muted)] [tab-size:2] md:p-4 md:text-[0.72rem]"
        style={{ whiteSpace: "pre" }}
      >
        {body}
      </pre>
    );
  }
  if (variant === "bulletList") {
    const items = stackBulletItems(body);
    if (items.length > 0) {
      return (
        <ul className="list-disc space-y-2 pl-5 marker:text-[rgb(var(--primary))]">
          {items.map((item, j) => (
            <li key={j} className="pl-1">
              {formatStackListItem(item)}
            </li>
          ))}
        </ul>
      );
    }
    return <p>{body}</p>;
  }
  return bodyParagraphs(body).map((para, j) => <p key={j}>{para}</p>);
}

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
                  "h-5 w-5 shrink-0 text-[rgb(var(--primary))] transition-transform duration-300 ease-out motion-reduce:duration-150 md:h-6 md:w-6 " +
                  (isOpen ? "rotate-180" : "rotate-0")
                }
                aria-hidden
              />
            </button>
            <div
              className={
                "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none " +
                (isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")
              }
            >
              <div className="min-h-0 overflow-hidden">
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  aria-hidden={!isOpen}
                  inert={!isOpen}
                  className="border-t border-[var(--color-border)] px-4 pb-4 pt-3 md:px-5 md:pb-5 md:pt-4"
                >
                  <div className="space-y-3 text-sm leading-relaxed text-[var(--color-text-muted)] md:text-base">
                    {typeof section.body === "string"
                      ? renderStringAccordionBody(
                          section.body,
                          section.bodyVariant,
                        )
                      : section.body}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
