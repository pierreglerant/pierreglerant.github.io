/**
 * Ordre des cartes « Skills » dans la section About (clés = chemins i18n about.skills.items.<key>).
 */
export const ABOUT_SKILL_KEYS = [
  "ml",
  "llm",
  "data",
  "backend",
  "frontend",
  "cloud",
] as const;

export type AboutSkillKey = (typeof ABOUT_SKILL_KEYS)[number];
