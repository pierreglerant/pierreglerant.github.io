import Link from "next/link";
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
    <div className="mx-auto max-w-[800px] px-4 py-10 md:py-16">
      <AnimateInView
        className="landing-reveal-page"
        as="article"
        aria-labelledby="project-detail-title"
      >
        <nav className="mb-8" aria-label="Breadcrumb">
          <Link
            href={projectsAnchor}
            className="cursor-pointer text-sm font-medium text-[rgb(var(--primary))] no-underline underline-offset-4 decoration-[rgb(var(--primary))] hover:underline"
          >
            {t("projects.backToProjects")}
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
