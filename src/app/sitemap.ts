import type { MetadataRoute } from "next";
import { SITE_URL, LOCALES } from "../i18n/config";
import { PROJECT_SLUGS } from "../config/projects";

const SITEMAP_LAST_MOD =
  (typeof process.env.VERCEL_BUILD_TIME !== "undefined" &&
    new Date(process.env.VERCEL_BUILD_TIME)) ||
  new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    const url = `${SITE_URL}/${locale}`;
    const languages: Record<string, string> = {};
    for (const altLocale of LOCALES) {
      languages[altLocale] = `${SITE_URL}/${altLocale}`;
    }

    entries.push({
      url,
      lastModified: SITEMAP_LAST_MOD,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages },
    });

    for (const slug of PROJECT_SLUGS) {
      const projectUrl = `${SITE_URL}/${locale}/projects/${slug}`;
      const projectLanguages: Record<string, string> = {};
      for (const altLocale of LOCALES) {
        projectLanguages[altLocale] =
          `${SITE_URL}/${altLocale}/projects/${slug}`;
      }
      entries.push({
        url: projectUrl,
        lastModified: SITEMAP_LAST_MOD,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: { languages: projectLanguages },
      });
    }
  }

  return entries;
}
