/**
 * i18n configuration – locales, default locale, slug mappings.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const LOCALES = ["fr", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "fr";

/** Public routes (internal slug = URL segment in `app/[locale]/`). */
const INTERNAL_SLUGS = ["contact"] as const;

export const SLUG_MAP: Record<Locale, Record<string, string>> = {
  fr: Object.fromEntries(INTERNAL_SLUGS.map((s) => [s, s])),
  en: {
    contact: "contact",
  },
};

export const EN_SLUG_TO_INTERNAL: Record<string, string> = Object.fromEntries(
  Object.entries(SLUG_MAP.en)
    .filter(([internal, external]) => internal !== external)
    .map(([internal, external]) => [external, internal]),
);

export function localePath(locale: Locale, internalPath: string): string {
  const clean = internalPath.replace(/^\//, "");

  if (!clean) return `/${locale}`;

  const [firstSegment, ...rest] = clean.split("/");

  const mappedSlug = SLUG_MAP[locale]?.[firstSegment] ?? firstSegment;
  const suffix = rest.length > 0 ? `/${rest.join("/")}` : "";

  return `/${locale}/${mappedSlug}${suffix}`;
}

export function switchLocalePath(
  currentPathname: string,
  targetLocale: Locale,
): string {
  const segments = currentPathname.split("/").filter(Boolean);

  const currentLocale = segments[0] as Locale;
  const restSegments = segments.slice(1);

  if (restSegments.length === 0) return `/${targetLocale}`;

  const [firstSlug, ...remainingSegments] = restSegments;

  let internalSlug = firstSlug;
  if (currentLocale === "en") {
    internalSlug = EN_SLUG_TO_INTERNAL[firstSlug] ?? firstSlug;
  }

  const targetSlug = SLUG_MAP[targetLocale]?.[internalSlug] ?? internalSlug;

  const suffix =
    remainingSegments.length > 0 ? `/${remainingSegments.join("/")}` : "";

  return `/${targetLocale}/${targetSlug}${suffix}`;
}
