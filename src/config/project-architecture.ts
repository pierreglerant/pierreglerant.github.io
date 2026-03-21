import type { Locale } from "../i18n/config";
import type { ProjectSlug } from "./projects";

/** Schéma ASCII SecureOps (sans numéros de port). */
const SECUREOPS_DIAGRAM_FR = `
┌──────────────────────────────────────────────────────────────────────────┐
│                       Frontend (Next.js)                                 │
│           Cognito (auth) • i18n fr/en • Tailwind CSS                     │
└───────────────────────────────┬──────────────────────────────────────────┘
                                │
                                │ HTTP (Bearer JWT ou X-API-Key)
                                ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                         API Gateway                                      │
│             Auth JWT + clés API • CORS • Proxy                           │
│   Routes : /health, /admin/*, /user/*, /scan/*, /crawl/* …                │
└───┬───────────┬───────────┬───────────┬───────────┬─────────────────────┘
    │           │           │           │           │
    ▼           ▼           ▼           ▼           ▼
┌─────────┐ ┌─────────┐ ┌─────────┐ ┌───────────────┐ ┌───────────────┐
│ admin-  │ │ user-   │ │ pdf-    │ │ scan-service  │ │ crawl-service │
│ service │ │ service │ │ service │ │ (API)         │ │ (API)         │
│         │ │         │ │         │ │ REST async    │ │ REST async    │
│ PG +    │ │ PG +    │ │ Weasy-  │ │ (jobs scan)   │ │ (jobs crawl)  │
│ Alembic │ │ Alembic │ │ Print   │ │               │ │               │
└────┬────┘ └────┬────┘ └─────────┘ └───────┬───────┘ └───────┬───────┘
     │           │                           │                 │
     │           │                           ▼                 ▼
     │           │                 ┌─────────────────┐ ┌─────────────────┐
     │           │                 │ scan-worker     │ │ crawl-worker    │
     │           │                 │ poll + jobs     │ │ poll + jobs     │
     │           │                 │ (sans HTTP)     │ │ (sans HTTP)     │
     │           │                 │ → PostgreSQL    │ │ → PostgreSQL    │
     │           │                 └────────┬────────┘ └────────┬────────┘
     │           │                           │                 │
     │           │                           │                 │
     │           │                           │                 │
     ▼           ▼                           ▼                 ▼
┌──────────────────────────────────────────────────────────────────────────┐
│ PostgreSQL (PostGIS)                                                     │
│ template_db, schémas dédiés, tables file d’attente async                 │
└──────────────────────────────────────────────────────────────────────────┘
`.trim();

const SECUREOPS_DIAGRAM_EN = `
┌──────────────────────────────────────────────────────────────────────────┐
│                       Frontend (Next.js)                                 │
│           Cognito (auth) • i18n en/fr • Tailwind CSS                     │
└───────────────────────────────┬──────────────────────────────────────────┘
                                │
                                │ HTTP (Bearer JWT or X-API-Key)
                                ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                         API Gateway                                      │
│             JWT + API key auth • CORS • Proxy                            │
│   Routes: /health, /admin/*, /user/*, /scan/*, /crawl/* …                │
└───┬───────────┬───────────┬───────────┬───────────┬─────────────────────┘
    │           │           │           │           │
    ▼           ▼           ▼           ▼           ▼
┌─────────┐ ┌─────────┐ ┌─────────┐ ┌───────────────┐ ┌───────────────┐
│ admin-  │ │ user-   │ │ pdf-    │ │ scan-service  │ │ crawl-service │
│ service │ │ service │ │ service │ │ (API)         │ │ (API)         │
│         │ │         │ │         │ │ REST: create /│ │ REST: create /│
│ PG +    │ │ PG +    │ │ Weasy-  │ │ status / scan │ │ status / crawl│
│ Alembic │ │ Alembic │ │ Print   │ │ job result    │ │ job result    │
│         │ │         │ │         │ │               │ │               │
└────┬────┘ └────┬────┘ └─────────┘ └───────┬───────┘ └───────┬───────┘
     │           │                           │                 │
     │           │                           ▼                 ▼
     │           │                 ┌─────────────────┐ ┌─────────────────┐
     │           │                 │ scan-worker     │ │ crawl-worker    │
     │           │                 │ poll + jobs     │ │ poll + jobs     │
     │           │                 │ (no HTTP)       │ │ (no HTTP)       │
     │           │                 │ → PostgreSQL    │ │ → PostgreSQL    │
     │           │                 └────────┬────────┘ └────────┬────────┘
     │           │                           │                 │
     │           │                           │                 │
     │           │                           │                 │
     ▼           ▼                           ▼                 ▼
┌──────────────────────────────────────────────────────────────────────────┐
│ PostgreSQL (PostGIS)                                                     │
│ template_db, dedicated schemas, async queue tables                         │
└──────────────────────────────────────────────────────────────────────────┘
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
