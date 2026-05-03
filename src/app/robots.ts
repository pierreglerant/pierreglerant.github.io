import type { MetadataRoute } from "next";
import { SITE_URL } from "../i18n/config";

/**
 * Portfolio statique : pas de zone membre. On laisse indexer les pages publiques
 * et on exclut les routes API (manifest, etc.).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
