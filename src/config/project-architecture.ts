import type { Locale } from "../i18n/config";
import type { ProjectSlug } from "./projects";

export type ArchitectureSection =
  | { variant: "prose"; body: string }
  | { variant: "secureopsDiagram" }
  | { variant: "immosphereDiagram" }
  | { variant: "bettingAppDiagram" };

export function getProjectArchitectureSection(
  locale: Locale,
  slug: ProjectSlug,
): ArchitectureSection {
  if (slug === "secureops") {
    return { variant: "secureopsDiagram" };
  }
  if (slug === "immosphere") {
    return { variant: "immosphereDiagram" };
  }
  if (slug === "bettingapp") {
    return { variant: "bettingAppDiagram" };
  }
  return {
    variant: "prose",
    body: locale === "en" ? "Coming soon." : "À venir.",
  };
}
