import Link from "next/link";
import Image from "next/image";
import type { Locale } from "../i18n/config";
import type { ProjectSlug } from "../config/projects";
import { PROJECT_COVER_IMAGE } from "../config/projects";
import { getTranslation } from "../i18n/server";

type Props = { locale: Locale; slug: ProjectSlug };

export default function ProjectCard({ locale, slug }: Props) {
  const t = getTranslation(locale);
  const href = `/${locale}/projects/${slug}`;
  const title = t(`projects.items.${slug}.title`);
  const excerpt = t(`projects.items.${slug}.excerpt`);
  const coverAlt = t(`projects.items.${slug}.coverAlt`);
  const cover = PROJECT_COVER_IMAGE[slug];
  const ring =
    "outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--primary))] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]";

  return (
    <article className="project-card card flex h-full flex-col overflow-hidden p-0">
      <Link
        href={href}
        className={
          "project-card__link group flex h-full min-h-0 flex-col no-underline text-inherit rounded-[inherit] " +
          ring
        }
      >
        <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden bg-[var(--color-surface)]">
          <Image
            src={cover}
            alt={coverAlt}
            width={960}
            height={540}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 360px"
          />
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-2 p-5 md:p-6">
          <h3 className="text-lg font-semibold tracking-tight text-[var(--color-text)] transition-colors group-hover:text-[rgb(var(--primary))] md:text-xl">
            {title}
          </h3>
          <p className="flex-1 text-sm leading-relaxed text-[var(--color-text-muted)] md:text-[0.9375rem]">
            {excerpt}
          </p>
          <span className="mt-1 text-sm font-medium text-[rgb(var(--primary))]">
            {t("projects.seeMore")}
          </span>
        </div>
      </Link>
    </article>
  );
}
