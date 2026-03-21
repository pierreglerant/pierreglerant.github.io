import type { Locale } from "../i18n/config";
import type { ProjectSlug } from "./projects";

export type ArchitectureSection =
  | { variant: "prose"; body: string }
  | { variant: "secureopsDiagram" };

export function getProjectArchitectureSection(
  locale: Locale,
  slug: ProjectSlug,
): ArchitectureSection {
  if (slug === "secureops") {
    return { variant: "secureopsDiagram" };
  }
  return {
    variant: "prose",
    body: locale === "en" ? "Coming soon." : "À venir.",
  };
}
