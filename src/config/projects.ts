/**
 * Projets affichés sur l’accueil et pages détail.
 * Slugs utilisés dans les URLs : /[locale]/projects/[slug]
 *
 * Images : public/projects/<slug>/1.jpg … (ordre carrousel / couverture = 1)
 */
export const PROJECT_SLUGS = [
  "immosphere",
  "secureops",
  "crypto-prediction",
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
};

export function isProjectSlug(value: string): value is ProjectSlug {
  return (PROJECT_SLUGS as readonly string[]).includes(value);
}

const GALLERY_COUNT = 4;

function galleryForSlug(slug: ProjectSlug): readonly string[] {
  return Array.from(
    { length: GALLERY_COUNT },
    (_, i) => `/projects/${slug}/${i + 1}.jpg`,
  );
}

/** Images du carrousel (page détail) : 1 = couverture carte liste */
export const PROJECT_GALLERY_IMAGES: Record<ProjectSlug, readonly string[]> = {
  immosphere: galleryForSlug("immosphere"),
  secureops: galleryForSlug("secureops"),
  "crypto-prediction": galleryForSlug("crypto-prediction"),
};

/** Première image = aperçu carte liste */
export const PROJECT_COVER_IMAGE: Record<ProjectSlug, string> = {
  immosphere: PROJECT_GALLERY_IMAGES.immosphere[0],
  secureops: PROJECT_GALLERY_IMAGES.secureops[0],
  "crypto-prediction": PROJECT_GALLERY_IMAGES["crypto-prediction"][0],
};

/** URL du site public pour un projet (lien affiché dans la fiche). */
export const PROJECT_SITE_URLS: Partial<Record<ProjectSlug, string>> = {
  immosphere: "https://www.immosphere.co",
  secureops: "https://secureops.fr",
};

/** Dépôt source (ex. GitHub), optionnel par projet. */
export const PROJECT_REPO_URLS: Partial<Record<ProjectSlug, string>> = {
  secureops: "https://github.com/pierreglerant/secureops",
  "crypto-prediction": "https://github.com/pierreglerant/crypto-prediction",
};

/** Rapport PDF statique sous /public (téléchargement depuis la fiche projet). */
export const PROJECT_REPORT_PDF_URLS: Partial<Record<ProjectSlug, string>> = {
  "crypto-prediction": "/projects/crypto-prediction/rapport-final.pdf",
};

/** Action GitHub CI (org secureopsfr), liée depuis la fiche projet SecureOps. */
export const SECUREOPS_ACTIONS_SCAN_REPO_URL =
  "https://github.com/secureopsfr/actions-scan";
