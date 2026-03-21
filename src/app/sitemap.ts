import type { MetadataRoute } from "next";
import { SITE_URL, LOCALES } from "../i18n/config";

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
  }

  return entries;
}
