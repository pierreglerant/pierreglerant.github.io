import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AnimateInView from "./AnimateInView";
import ProjectGalleryCarousel from "./ProjectGalleryCarousel";
import ProjectDetailAccordion from "./ProjectDetailAccordion";
import type { Locale } from "../i18n/config";
import type { ProjectSlug } from "../config/projects";
import { PROJECT_GALLERY_IMAGES } from "../config/projects";
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

  const accordionSections = [
    {
      title: t("projects.detailSectionTitles.overview"),
      body: t(`projects.items.${slug}.sectionOverview`),
    },
    {
      title: t("projects.detailSectionTitles.features"),
      body: t(`projects.items.${slug}.sectionFeatures`),
    },
    {
      title: t("projects.detailSectionTitles.stack"),
      body: t(`projects.items.${slug}.sectionStack`),
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
          <h1
            id="project-detail-title"
            className="mt-5 w-full text-left text-3xl font-bold tracking-tight text-[var(--color-text)] md:mt-6 md:text-4xl"
          >
            {title}
          </h1>
        </div>

        <ProjectDetailAccordion
          sections={accordionSections}
          defaultOpenIndex={0}
        />
      </AnimateInView>
    </div>
  );
}
