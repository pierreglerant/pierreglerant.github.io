import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import AnimateInView from "./AnimateInView";
import ProjectGalleryCarousel from "./ProjectGalleryCarousel";
import ProjectDetailAccordion, {
  type AccordionSection,
} from "./ProjectDetailAccordion";
import { bodyParagraphs } from "../lib/body-paragraphs";
import type { Locale } from "../i18n/config";
import type { ProjectSlug } from "../config/projects";
import { getProjectArchitectureSection } from "../config/project-architecture";
import {
  PROJECT_GALLERY_IMAGES,
  PROJECT_SITE_URLS,
} from "../config/projects";
import { getTranslation } from "../i18n/server";

export default function ProjectDetailContent({
  locale,
  slug,
}: {
  locale: Locale;
  slug: ProjectSlug;
}) {
  const t = getTranslation(locale);
  const title = t(`projects.items.${slug}.title`);
  const coverAlt = t(`projects.items.${slug}.coverAlt`);
  const gallerySrcs = [...PROJECT_GALLERY_IMAGES[slug]];
  const totalSlides = String(gallerySrcs.length);
  const slides = gallerySrcs.map((src, i) => ({
    src,
    alt:
      i === 0
        ? coverAlt
        : t("projects.carouselSlideAltShort", {
            current: String(i + 1),
            total: totalSlides,
          }),
  }));
  const projectsAnchor = `/${locale}#projects`;

  const siteUrl = PROJECT_SITE_URLS[slug];

  const overviewText = t(`projects.items.${slug}.sectionOverview`);
  const keywordsText = t(`projects.items.${slug}.sectionKeywords`);
  const overviewBody: string | ReactNode =
    keywordsText.trim().length > 0 ? (
      <>
        {bodyParagraphs(overviewText).map((para, j) => (
          <p key={j}>{para}</p>
        ))}
        <p>
          <span className="font-semibold text-[var(--color-text)]">
            {t("projects.keywordsLabel")}
          </span>{" "}
          {keywordsText}
        </p>
      </>
    ) : (
      overviewText
    );

  const architecture = getProjectArchitectureSection(locale, slug);

  const accordionSections: AccordionSection[] = [
    {
      title: t("projects.detailSectionTitles.overview"),
      body: overviewBody,
    },
    {
      title: t("projects.detailSectionTitles.features"),
      body: t(`projects.items.${slug}.sectionFeatures`),
    },
    {
      title: t("projects.detailSectionTitles.stack"),
      body: t(`projects.items.${slug}.sectionStack`),
      bodyVariant: "bulletList" as const,
    },
    {
      title: t("projects.detailSectionTitles.architecture"),
      body: architecture.body,
      bodyVariant: architecture.bodyVariant,
    },
  ];

  return (
    <div className="mx-auto max-w-[min(100%,56rem)] px-4 py-10 md:py-16">
      <AnimateInView
        className="landing-reveal-page"
        as="article"
        aria-labelledby="project-detail-title"
      >
        <nav className="mb-2 md:mb-3" aria-label="Breadcrumb">
          <Link
            href={projectsAnchor}
            className="inline-flex cursor-pointer items-center gap-0.5 border-b border-transparent pb-0.5 text-base font-medium text-[rgb(var(--primary))] no-underline transition-colors hover:border-[rgb(var(--primary))]"
          >
            <ArrowLeft
              className="h-5 w-5 shrink-0 text-[rgb(var(--primary))]"
              strokeWidth={2}
              aria-hidden
            />
            <span>{t("projects.backToProjects")}</span>
          </Link>
        </nav>

        <div className="project-detail-hero mb-8 flex w-full flex-col">
          <ProjectGalleryCarousel
            slides={slides}
            prevLabel={t("projects.carouselPrev")}
            nextLabel={t("projects.carouselNext")}
            regionLabel={t("projects.carouselRegion", { title })}
          />
          <div className="mt-5 flex w-full flex-wrap items-baseline justify-between gap-x-4 gap-y-2 md:mt-6">
            <h1
              id="project-detail-title"
              className="min-w-0 text-left text-3xl font-bold tracking-tight text-[var(--color-text)] md:text-4xl"
            >
              {title}
            </h1>
            {siteUrl ? (
              <a
                href={siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-1.5 border-b border-transparent pb-0.5 text-sm font-medium text-[rgb(var(--primary))] no-underline transition-colors hover:border-[rgb(var(--primary))] md:text-base"
              >
                <ExternalLink
                  className="h-4 w-4 shrink-0 opacity-90 md:h-[1.125rem] md:w-[1.125rem]"
                  strokeWidth={2}
                  aria-hidden
                />
                {t(`projects.items.${slug}.websiteLinkLabel`)}
              </a>
            ) : null}
          </div>
        </div>

        <ProjectDetailAccordion
          sections={accordionSections}
          defaultOpenIndex={0}
        />
      </AnimateInView>
    </div>
  );
}
