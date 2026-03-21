import type { MetadataRoute } from "next";
import { SITE_URL, LOCALES, DEFAULT_LOCALE } from "../i18n/config";
import { PROJECT_SLUGS } from "../config/projects";
import { SITE_LAST_UPDATE_ISO } from "../config/social";

/** Dernière mise à jour déclarée du site (section contact) — à ajuster quand le contenu change. */
const SITEMAP_LAST_MOD = new Date(`${SITE_LAST_UPDATE_ISO}T12:00:00.000Z`);

function hreflangAlternates(pathAfterLocale: string): Record<string, string> {
  const suffix = pathAfterLocale.replace(/^\//, "");
  const path = suffix ? `/${suffix}` : "";
  return {
    ...Object.fromEntries(
      LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`]),
    ),
    "x-default": `${SITE_URL}/${DEFAULT_LOCALE}${path}`,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    entries.push({
      url: `${SITE_URL}/${locale}`,
      lastModified: SITEMAP_LAST_MOD,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: hreflangAlternates("") },
    });

    for (const slug of PROJECT_SLUGS) {
      entries.push({
        url: `${SITE_URL}/${locale}/projects/${slug}`,
        lastModified: SITEMAP_LAST_MOD,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: { languages: hreflangAlternates(`projects/${slug}`) },
      });
    }
  }

  return entries;
}
