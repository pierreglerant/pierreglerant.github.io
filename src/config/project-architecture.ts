import type { Locale } from "../i18n/config";
import type { ProjectSlug } from "./projects";

/** Schéma ASCII SecureOps (sans numéros de port). */
const SECUREOPS_DIAGRAM_FR = `
┌──────────────────────────────────────────────────────────────────────────┐
│                       Frontend (Next.js)                                 │
│           Cognito (auth) • i18n fr/en • Tailwind CSS                      │
└───────────────────────────────┬──────────────────────────────────────────┘
                                │
                                │ HTTP (Bearer JWT ou X-API-Key)
                                ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                         API Gateway                                      │
│             Auth JWT + clés API • CORS • Proxy                          │
│   Routes : /health, /admin/*, /user/*, /scan/*, /crawl/* …                │
└───┬───────────┬───────────┬───────────┬───────────┬─────────────────────┘
    │           │           │           │           │
    ▼           ▼           ▼           ▼           ▼
┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────────────────────────────────┐
│ admin-  │ │ user-   │ │ pdf-    │ │ scan-service (API)                   │
│ service │ │ service │ │ service │ │ REST : création / statut / résultat  │
│         │ │         │ │         │ │ job de scan                          │
│ PG +    │ │ PG +    │ │ Weasy-  │ └──────────────────┬──────────────────┘
│ Alembic │ │ Alembic │ │ Print   │                    │
└────┬────┘ └────┬────┘ └─────────┘                    ▼
     │           │                         ┌─────────────────────────────┐
     │           │                         │ scan-worker                 │
     │           │                         │ poll + exécution des jobs   │
     │           │                         │ (sans exposition HTTP)      │
     │           │                         └──────────────┬──────────────┘
     │           │                                        │
     └───────────┴────────────────────────────────────────────┘
                                │
                                ▼
┌───────────────────────────────┐    ┌─────────────────────────────────────┐
│ PostgreSQL (PostGIS)          │    │ crawl-service (API)                 │
│ template_db, schémas dédiés,  │    │ REST : création / statut / résultat │
│ tables file d’attente async   │    │ job de crawl                        │
└───────────────┬───────────────┘    └──────────────────┬──────────────────┘
                │                                       ▼
                │                       ┌─────────────────────────────┐
                │                       │ crawl-worker                │
                │                       │ poll + exécution des jobs   │
                │                       │ (sans exposition HTTP)      │
                │                       └──────────────┬──────────────┘
                │                                  │
                └──────────────────────────────────┘
`.trim();

const SECUREOPS_DIAGRAM_EN = `
┌──────────────────────────────────────────────────────────────────────────┐
│                       Frontend (Next.js)                                 │
│           Cognito (auth) • i18n en/fr • Tailwind CSS                      │
└───────────────────────────────┬──────────────────────────────────────────┘
                                │
                                │ HTTP (Bearer JWT or X-API-Key)
                                ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                         API Gateway                                      │
│             JWT + API key auth • CORS • Proxy                             │
│   Routes: /health, /admin/*, /user/*, /scan/*, /crawl/* …                 │
└───┬───────────┬───────────┬───────────┬───────────┬─────────────────────┘
    │           │           │           │           │
    ▼           ▼           ▼           ▼           ▼
┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────────────────────────────────┐
│ admin-  │ │ user-   │ │ pdf-    │ │ scan-service (API)                   │
│ service │ │ service │ │ service │ │ REST: create / status / scan job     │
│         │ │         │ │         │ │ result                               │
│ PG +    │ │ PG +    │ │ Weasy-  │ └──────────────────┬──────────────────┘
│ Alembic │ │ Alembic │ │ Print   │                    │
└────┬────┘ └────┬────┘ └─────────┘                    ▼
     │           │                         ┌─────────────────────────────┐
     │           │                         │ scan-worker                 │
     │           │                         │ poll + job execution        │
     │           │                         │ (no HTTP exposure)          │
     │           │                         └──────────────┬──────────────┘
     │           │                                        │
     └───────────┴────────────────────────────────────────────┘
                                │
                                ▼
┌───────────────────────────────┐    ┌─────────────────────────────────────┐
│ PostgreSQL (PostGIS)          │    │ crawl-service (API)                 │
│ template_db, dedicated        │    │ REST: create / status / result      │
│ schemas, async queue tables   │    │ crawl jobs                            │
└───────────────┬───────────────┘    └──────────────────┬──────────────────┘
                │                                       ▼
                │                       ┌─────────────────────────────┐
                │                       │ crawl-worker                │
                │                       │ poll + job execution        │
                │                       │ (no HTTP exposure)          │
                │                       └──────────────┬──────────────┘
                │                                  │
                └──────────────────────────────────┘
`.trim();

export type ArchitectureSection = {
  body: string;
  bodyVariant?: "prose" | "preformatted";
};

export function getProjectArchitectureSection(
  locale: Locale,
  slug: ProjectSlug,
): ArchitectureSection {
  if (slug === "secureops") {
    return {
      body: locale === "en" ? SECUREOPS_DIAGRAM_EN : SECUREOPS_DIAGRAM_FR,
      bodyVariant: "preformatted",
    };
  }
  return {
    body: locale === "en" ? "Coming soon." : "À venir.",
  };
}
