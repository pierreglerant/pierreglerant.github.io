/**
 * Projets affichés sur l’accueil et pages détail.
 * Slugs utilisés dans les URLs : /[locale]/projects/[slug]
 *
 * Images : public/projects/<slug>/1.<ext> … (ordre carrousel / couverture = 1)
 */
export const PROJECT_SLUGS = [
  "immosphere",
  "secureops",
  "crypto-prediction",
  "project-four",
  "project-five",
] as const;

export type ProjectSlug = (typeof PROJECT_SLUGS)[number];

/** Badges affichés sur les cartes projets (accueil) — une couleur par id dans `ProjectCard`. */
export type ProjectBadgeId = "data" | "software" | "cyber" | "ai";

export const PROJECT_CARD_BADGES: Record<
  ProjectSlug,
  readonly ProjectBadgeId[]
> = {
  immosphere: ["data", "software"],
  secureops: ["cyber", "software"],
  "crypto-prediction": ["data", "ai"],
  "project-four": ["data", "ai"],
  "project-five": ["software"],
};

export function isProjectSlug(value: string): value is ProjectSlug {
  return (PROJECT_SLUGS as readonly string[]).includes(value);
}

const DEFAULT_GALLERY_COUNT = 4;
const GALLERY_COUNT_BY_SLUG: Partial<Record<ProjectSlug, number>> = {
  "crypto-prediction": 1,
  secureops: 5,
};

const GALLERY_EXT_BY_SLUG: Partial<Record<ProjectSlug, "jpg" | "png">> = {
  "crypto-prediction": "png",
  secureops: "png",
};

function galleryForSlug(slug: ProjectSlug): readonly string[] {
  const count = GALLERY_COUNT_BY_SLUG[slug] ?? DEFAULT_GALLERY_COUNT;
  const ext = GALLERY_EXT_BY_SLUG[slug] ?? "jpg";
  return Array.from(
    { length: count },
    (_, i) => `/projects/${slug}/${i + 1}.${ext}`,
  );
}

/** Images du carrousel (page détail) : 1 = couverture carte liste */
export const PROJECT_GALLERY_IMAGES: Record<ProjectSlug, readonly string[]> = {
  immosphere: galleryForSlug("immosphere"),
  secureops: galleryForSlug("secureops"),
  "crypto-prediction": galleryForSlug("crypto-prediction"),
  "project-four": galleryForSlug("project-four"),
  "project-five": galleryForSlug("project-five"),
};

/** Première image = aperçu carte liste */
export const PROJECT_COVER_IMAGE: Record<ProjectSlug, string> = {
  immosphere: PROJECT_GALLERY_IMAGES.immosphere[0],
  secureops: "/projects/secureops/logo.png",
  "crypto-prediction": "/projects/crypto-prediction/logo.png",
  "project-four": PROJECT_GALLERY_IMAGES["project-four"][0],
  "project-five": PROJECT_GALLERY_IMAGES["project-five"][0],
};

/** URL du site public pour un projet (lien affiché dans la fiche). */
export const PROJECT_SITE_URLS: Partial<Record<ProjectSlug, string>> = {
  immosphere: "https://www.immosphere.co",
  secureops: "https://www.secureops.fr",
};

/** Dépôt source (ex. GitHub), optionnel par projet. */
export const PROJECT_REPO_URLS: Partial<Record<ProjectSlug, string>> = {
  secureops: "https://github.com/pierreglerant/secureops",
  "crypto-prediction": "https://github.com/pierreglerant/crypto-prediction",
};

/** Rapport PDF statique sous /public (téléchargement depuis la fiche projet). */
export const PROJECT_REPORT_PDF_URLS: Partial<Record<ProjectSlug, string>> = {
  "crypto-prediction": "/projects/crypto-prediction/report.pdf",
};

/** Action GitHub CI (org secureopsfr), liée depuis la fiche projet SecureOps. */
export const SECUREOPS_ACTIONS_SCAN_REPO_URL =
  "https://github.com/secureopsfr/actions-scan";
