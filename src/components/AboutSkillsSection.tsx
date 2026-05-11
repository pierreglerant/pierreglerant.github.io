import { Layers, FileText } from "lucide-react";
import { FeatureCard } from "./cards";
import CvPreviewLightbox from "./CvPreviewLightbox";
import AnimateInView from "./AnimateInView";
import SectionTitleWithIcon from "./SectionTitleWithIcon";
import { getTranslation } from "../i18n/server";
import type { Locale } from "../i18n/config";
import { ABOUT_SKILL_KEYS } from "../config/about-skills";

export default function AboutSkillsSection({ locale }: { locale: string }) {
  const l = locale as Locale;
  const t = getTranslation(l);
  const skillsIntro = t("about.skills.intro").trim();
  const cvPdfHref = l === "fr" ? "/cv/cv_fr.pdf" : "/cv/cv_en.pdf";
  const cvPdfDownloadName = l === "fr" ? "cv_fr.pdf" : "cv_en.pdf";
  const cvPreviewSrc =
    l === "fr" ? "/cv/cv_preview_fr.png" : "/cv/cv_preview_en.png";

  return (
    <AnimateInView
      id="about"
      className="about-section landing-section mx-auto max-w-[1200px] px-4 py-14 md:py-20 landing-reveal-stagger"
      as="section"
      aria-label={t("about.title")}
    >
      <div className="about-section__skills-head">
        <SectionTitleWithIcon id="about-skills-heading" icon={Layers}>
          {t("about.skills.heading")}
        </SectionTitleWithIcon>
        {skillsIntro ? (
          <p className="about-section__skills-intro mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-[var(--color-text-muted)] md:text-lg">
            {skillsIntro}
          </p>
        ) : null}
      </div>

      <div className="about-skills-grid grid mx-auto mt-12 w-full max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
        {ABOUT_SKILL_KEYS.map((key) => (
          <FeatureCard
            key={key}
            title={t(`about.skills.items.${key}.title`)}
            body={t(`about.skills.items.${key}.body`)}
            className="min-w-0 !text-left !px-5 !py-6 sm:!px-6 sm:!py-7 [&_h3]:text-left [&_h3]:text-lg [&_h3]:sm:text-xl [&_p]:text-left [&_p]:text-sm [&_p]:leading-relaxed [&_p]:sm:text-[0.9375rem]"
          />
        ))}
      </div>

      <div
        id="cv"
        className="about-section__resume mx-auto mt-28 max-w-2xl md:mt-40"
        aria-labelledby="about-resume-heading"
      >
        <SectionTitleWithIcon id="about-resume-heading" icon={FileText}>
          {t("about.resume.heading")}
        </SectionTitleWithIcon>
        <CvPreviewLightbox
          previewSrc={cvPreviewSrc}
          previewAlt={t("about.resume.previewAlt")}
          openViewerLabel={t("about.resume.openViewer")}
          closeLabel={t("about.resume.closeViewer")}
          lightboxZoomInLabel={t("about.resume.lightboxZoomIn")}
          lightboxZoomOutLabel={t("about.resume.lightboxZoomOut")}
        />
        <div className="mt-6 flex justify-center">
          <a
            href={cvPdfHref}
            download={cvPdfDownloadName}
            className="btn btn-primary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm no-underline"
          >
            {t("about.resume.download")}
          </a>
        </div>
      </div>
    </AnimateInView>
  );
}
