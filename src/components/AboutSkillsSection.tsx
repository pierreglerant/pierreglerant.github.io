import { FeatureCard } from "./cards";
import CvPreviewLightbox from "./CvPreviewLightbox";
import AnimateInView from "./AnimateInView";
import { getTranslation } from "../i18n/server";
import type { Locale } from "../i18n/config";
import { ABOUT_SKILL_KEYS } from "../config/about-skills";

export default function AboutSkillsSection({ locale }: { locale: string }) {
  const t = getTranslation(locale as Locale);

  return (
    <AnimateInView
      id="about"
      className="about-section landing-section mx-auto max-w-[1200px] px-4 py-14 md:py-20 landing-reveal-stagger"
      as="section"
      aria-label={t("about.title")}
    >
      <div className="about-section__skills-head">
        <h2
          id="about-skills-heading"
          className="text-center text-3xl font-bold tracking-tight text-[var(--color-text)] md:text-4xl"
        >
          {t("about.skills.heading")}
        </h2>
        <p className="about-section__skills-intro mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-[var(--color-text-muted)] md:text-lg">
          {t("about.skills.intro")}
        </p>
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
        className="about-section__resume mx-auto mt-16 max-w-2xl md:mt-20"
        aria-labelledby="about-resume-heading"
      >
        <h2
          id="about-resume-heading"
          className="text-center text-3xl font-bold tracking-tight text-[var(--color-text)] md:text-4xl"
        >
          {t("about.resume.heading")}
        </h2>
        <CvPreviewLightbox
          previewAlt={t("about.resume.previewAlt")}
          openViewerLabel={t("about.resume.openViewer")}
          closeLabel={t("about.resume.closeViewer")}
        />
        <div className="mt-6 flex justify-center">
          <a
            href="/cv/cv.pdf"
            download="cv.pdf"
            className="btn btn-primary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm no-underline"
          >
            {t("about.resume.download")}
          </a>
        </div>
      </div>
    </AnimateInView>
  );
}
