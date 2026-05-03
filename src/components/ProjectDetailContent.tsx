import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, FileDown, Github } from "lucide-react";
import AnimateInView from "./AnimateInView";
import ProjectGalleryCarousel from "./ProjectGalleryCarousel";
import ProjectDetailAccordion, {
  type AccordionSection,
} from "./ProjectDetailAccordion";
import { bodyParagraphs, stackBulletItems } from "../lib/body-paragraphs";
import { renderInlineBold } from "../lib/render-inline-bold";
import type { Locale } from "../i18n/config";
import type { ProjectSlug } from "../config/projects";
import { getProjectArchitectureSection } from "../config/project-architecture";
import SecureOpsArchitectureDiagram from "./SecureOpsArchitectureDiagram";
import ImmoSphereArchitectureDiagram from "./ImmoSphereArchitectureDiagram";
import BettingAppArchitectureDiagram from "./BettingAppArchitectureDiagram";
import {
  PROJECT_GALLERY_IMAGES,
  PROJECT_REPO_URLS,
  PROJECT_REPORT_PDF_URLS,
  PROJECT_SITE_URLS,
  SECUREOPS_ACTIONS_SCAN_REPO_URL,
} from "../config/projects";
import { getTranslation } from "../i18n/server";

/** Puce « Libellé : valeur » avec **gras** possible dans la valeur (ImmoSphere). */
function immosphereFeatureBulletItem(item: string): ReactNode {
  const idx = item.indexOf(": ");
  if (idx <= 0) {
    return renderInlineBold(item);
  }
  const label = item.slice(0, idx).trim();
  const value = item.slice(idx + 2).trim();
  return (
    <>
      <span className="font-semibold text-[var(--color-text)]">{label}:</span>{" "}
      {renderInlineBold(value)}
    </>
  );
}

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
  const repoUrl = PROJECT_REPO_URLS[slug];
  const reportPdfUrl = PROJECT_REPORT_PDF_URLS[slug];

  const overviewText =
    slug === "secureops" ? "" : t(`projects.items.${slug}.sectionOverview`);
  const keywordsText = t(`projects.items.${slug}.sectionKeywords`);

  const overviewBody: string | ReactNode =
    slug === "secureops" ? (
      <>
        <p>
          {renderInlineBold(t("projects.items.secureops.sectionOverviewLead"))}
        </p>
        <p>
          {renderInlineBold(
            t("projects.items.secureops.sectionOverviewCiPrefix"),
          )}
          <a
            href={SECUREOPS_ACTIONS_SCAN_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[rgb(var(--primary))] underline decoration-[rgb(var(--primary))]/60 underline-offset-2 transition-opacity hover:opacity-90"
          >
            {t("projects.items.secureops.sectionOverviewCiLinkLabel")}
          </a>
          {renderInlineBold(
            t("projects.items.secureops.sectionOverviewCiSuffix"),
          )}
        </p>
        <p>
          {renderInlineBold(
            t("projects.items.secureops.sectionOverviewStatus"),
          )}
        </p>
        {keywordsText.trim().length > 0 ? (
          <p>
            <span className="font-semibold text-[var(--color-text)]">
              {t("projects.keywordsLabel")}
            </span>{" "}
            {keywordsText}
          </p>
        ) : null}
      </>
    ) : keywordsText.trim().length > 0 ||
      slug === "crypto-prediction" ||
      slug === "project-four" ? (
      <>
        {bodyParagraphs(overviewText).map((para, j) => (
          <p key={j}>
            {slug === "immosphere" ||
            slug === "crypto-prediction" ||
            slug === "project-four"
              ? renderInlineBold(para)
              : para}
          </p>
        ))}
        {keywordsText.trim().length > 0 ? (
          <p>
            <span className="font-semibold text-[var(--color-text)]">
              {t("projects.keywordsLabel")}
            </span>{" "}
            {keywordsText}
          </p>
        ) : null}
      </>
    ) : (
      overviewText
    );

  const architecture = getProjectArchitectureSection(locale, slug);
  const architectureBody: ReactNode =
    architecture.variant === "secureopsDiagram" ? (
      <SecureOpsArchitectureDiagram locale={locale} />
    ) : architecture.variant === "immosphereDiagram" ? (
      <ImmoSphereArchitectureDiagram locale={locale} />
    ) : architecture.variant === "bettingAppDiagram" ? (
      <BettingAppArchitectureDiagram locale={locale} />
    ) : (
      architecture.body
    );

  const featuresBody: string | ReactNode =
    slug === "secureops" ? (
      <>
        {bodyParagraphs(t("projects.items.secureops.sectionFeatures")).map(
          (para, j) => (
            <p key={j}>{renderInlineBold(para)}</p>
          ),
        )}
      </>
    ) : slug === "immosphere" ? (
      <>
        {bodyParagraphs(t("projects.items.immosphere.sectionFeatures")).map(
          (para, j) => (
            <p key={j}>{renderInlineBold(para)}</p>
          ),
        )}
        <p className="mt-3 font-semibold text-[var(--color-text)]">
          {t("projects.items.immosphere.sectionFeaturesListTitle")}
        </p>
        <ul className="mt-2 list-disc space-y-2 pl-5 marker:text-[rgb(var(--primary))]">
          {stackBulletItems(
            t("projects.items.immosphere.sectionFeaturesList"),
          ).map((item, j) => (
            <li key={j} className="pl-1">
              {immosphereFeatureBulletItem(item)}
            </li>
          ))}
        </ul>
      </>
    ) : slug === "project-four" ? (
      <>
        <ul className="mt-1 list-disc space-y-2 pl-5 marker:text-[rgb(var(--primary))]">
          {stackBulletItems(
            t("projects.items.project-four.sectionFeatures"),
          ).map((item, j) => (
            <li key={j} className="pl-1">
              {renderInlineBold(item)}
            </li>
          ))}
        </ul>
      </>
    ) : (
      t(`projects.items.${slug}.sectionFeatures`)
    );

  const accordionSections: AccordionSection[] =
    slug === "crypto-prediction"
      ? [
          {
            title: t("projects.detailSectionTitles.overview"),
            body: overviewBody,
          },
          {
            title: t("projects.detailSectionTitles.method"),
            body: (
              <>
                {bodyParagraphs(
                  t("projects.items.crypto-prediction.sectionMethod"),
                ).map((para, j) => (
                  <p key={j}>{renderInlineBold(para)}</p>
                ))}
              </>
            ),
          },
          {
            title: t("projects.detailSectionTitles.results"),
            body: (
              <>
                {bodyParagraphs(
                  t("projects.items.crypto-prediction.sectionResults"),
                ).map((para, j) => (
                  <p key={j}>{renderInlineBold(para)}</p>
                ))}
              </>
            ),
          },
        ]
      : [
          {
            title: t("projects.detailSectionTitles.overview"),
            body: overviewBody,
          },
          {
            title: t("projects.detailSectionTitles.features"),
            body: featuresBody,
          },
          {
            title: t("projects.detailSectionTitles.stack"),
            body: t(`projects.items.${slug}.sectionStack`),
            bodyVariant: "bulletList" as const,
          },
          {
            title: t("projects.detailSectionTitles.architecture"),
            body: architectureBody,
          },
        ];

  return (
    <div className="mx-auto max-w-[min(100%,64rem)] px-4 py-10 md:py-16">
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
            openLightboxLabel={t("projects.carouselOpenLightbox")}
            closeLightboxLabel={t("projects.carouselCloseLightbox")}
            lightboxZoomInLabel={t("projects.carouselLightboxZoomIn")}
            lightboxZoomOutLabel={t("projects.carouselLightboxZoomOut")}
            imageFit={slug === "crypto-prediction" ? "contain" : "cover"}
            aspectRatioClass={
              slug === "crypto-prediction"
                ? "aspect-[1124/450]"
                : slug === "immosphere"
                  ? "aspect-[1809/964]"
                  : undefined
            }
          />
          <div className="mt-5 flex w-full flex-wrap items-baseline justify-between gap-x-4 gap-y-2 md:mt-6">
            <h1
              id="project-detail-title"
              className="min-w-0 text-left text-3xl font-bold tracking-tight text-[var(--color-text)] md:text-4xl"
            >
              {title}
            </h1>
            {siteUrl || repoUrl || reportPdfUrl ? (
              <div className="flex max-w-full flex-wrap items-center justify-end gap-x-4 gap-y-2">
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
                {repoUrl ? (
                  <a
                    href={repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-1.5 border-b border-transparent pb-0.5 text-sm font-medium text-[rgb(var(--primary))] no-underline transition-colors hover:border-[rgb(var(--primary))] md:text-base"
                  >
                    <Github
                      className="h-4 w-4 shrink-0 opacity-90 md:h-[1.125rem] md:w-[1.125rem]"
                      strokeWidth={2}
                      aria-hidden
                    />
                    {t(`projects.items.${slug}.githubLinkLabel`)}
                  </a>
                ) : null}
                {reportPdfUrl ? (
                  <a
                    href={reportPdfUrl}
                    download
                    className="inline-flex shrink-0 items-center gap-1.5 border-b border-transparent pb-0.5 text-sm font-medium text-[rgb(var(--primary))] no-underline transition-colors hover:border-[rgb(var(--primary))] md:text-base"
                  >
                    <FileDown
                      className="h-4 w-4 shrink-0 opacity-90 md:h-[1.125rem] md:w-[1.125rem]"
                      strokeWidth={2}
                      aria-hidden
                    />
                    {t(`projects.items.${slug}.pdfReportLinkLabel`)}
                  </a>
                ) : null}
              </div>
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
