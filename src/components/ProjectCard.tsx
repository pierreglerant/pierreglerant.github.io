import Link from "next/link";
import Image from "next/image";
import type { Locale } from "../i18n/config";
import type { ProjectBadgeId, ProjectSlug } from "../config/projects";
import { PROJECT_CARD_BADGES, PROJECT_COVER_IMAGE, UNOPTIMIZED_PROJECT_IMAGES_IN_DEV } from "../config/projects";
import { getTranslation } from "../i18n/server";

const BADGE_STYLES: Record<ProjectBadgeId, string> = {
  data: "border-[rgba(var(--success),0.38)] bg-[rgba(var(--success),0.14)] text-[rgb(134,239,172)]",
  software:
    "border-[rgba(var(--primary),0.4)] bg-[rgba(var(--primary),0.14)] text-[rgb(var(--primary))]",
  cyber:
    "border-[rgba(192,132,252,0.45)] bg-[rgba(168,85,247,0.12)] text-[rgb(216,180,254)]",
  ai: "border-[rgba(var(--warning),0.42)] bg-[rgba(var(--warning),0.12)] text-[rgb(253,224,139)]",
};

type Props = { locale: Locale; slug: ProjectSlug };

export default function ProjectCard({ locale, slug }: Props) {
  const t = getTranslation(locale);
  const href = `/${locale}/projects/${slug}`;
  const title = t(`projects.items.${slug}.title`);
  const excerpt = t(`projects.items.${slug}.excerpt`);
  const coverAlt = t(`projects.items.${slug}.coverAlt`);
  const cover = PROJECT_COVER_IMAGE[slug];
  const badges = PROJECT_CARD_BADGES[slug];
  const isLogoCard =
    slug === "secureops" ||
    slug === "immosphere" ||
    slug === "crypto-prediction" ||
    slug === "project-four";

  const coverFitClass = isLogoCard
    ? slug === "project-four"
      ? "object-contain object-center p-3 md:p-4"
      : "object-contain object-center p-5 md:p-7"
    : "object-cover object-center";
  const coverHoverClass = isLogoCard ? "" : "group-hover:scale-[1.04]";
  const coverContainerClass = "bg-[var(--color-surface)]";
  const ring =
    "outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--primary))] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]";

  return (
    <article className="project-card card flex h-full flex-col overflow-hidden p-0">
      <Link
        href={href}
        className={
          "project-card__link group flex h-full min-h-0 cursor-pointer flex-col no-underline text-inherit rounded-[inherit] " +
          ring
        }
      >
        <div
          className={`relative aspect-[16/9] w-full shrink-0 overflow-hidden ${coverContainerClass}`}
        >
          <Image
            src={cover}
            alt={coverAlt}
            width={960}
            height={540}
            className={`h-full w-full transition-transform duration-500 ease-out ${coverHoverClass} ${coverFitClass}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 360px"
            quality={100}
            unoptimized={UNOPTIMIZED_PROJECT_IMAGES_IN_DEV}
          />
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-2 p-5 md:p-6">
          <div className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1">
            <h3 className="min-w-0 text-lg font-semibold leading-snug tracking-tight text-[var(--color-text)] transition-colors group-hover:text-[rgb(var(--primary))] md:text-xl">
              {title}
            </h3>
            <ul
              className="flex list-none shrink-0 flex-row flex-wrap items-center justify-end gap-1.5 p-0"
              aria-label={t("projects.badgeListLabel")}
            >
              {badges.map((id) => (
                <li key={id}>
                  <span
                    className={
                      "inline-block rounded-md border px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide md:text-[0.7rem] " +
                      BADGE_STYLES[id]
                    }
                  >
                    {t(`projects.badges.${id}`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <p className="flex-1 text-sm leading-relaxed text-[var(--color-text-muted)] md:text-[0.9375rem]">
            {excerpt}
          </p>
          <span className="mt-1 inline-block w-fit text-sm font-medium text-[rgb(var(--primary))] no-underline underline-offset-4 decoration-[rgb(var(--primary))] hover:underline">
            {t("projects.seeMore")}
          </span>
        </div>
      </Link>
    </article>
  );
}
