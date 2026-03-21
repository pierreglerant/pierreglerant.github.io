import AnimateInView from "./AnimateInView";
import ProjectCard from "./ProjectCard";
import { getTranslation } from "../i18n/server";
import type { Locale } from "../i18n/config";
import { PROJECT_SLUGS } from "../config/projects";
import { SOCIAL_LINKS } from "../config/social";

export default function ProjectsSection({ locale }: { locale: string }) {
  const l = locale as Locale;
  const t = getTranslation(l);

  return (
    <AnimateInView
      id="projects"
      className="landing-section landing-reveal-stagger mx-auto max-w-[1200px] px-4 py-14 md:py-20"
      as="section"
      aria-labelledby="projects-heading"
    >
      <div className="projects-section">
        <div className="projects-section__head">
          <h2
            id="projects-heading"
            className="text-center text-3xl font-bold tracking-tight text-[var(--color-text)] md:text-4xl"
          >
            {t("projects.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-[var(--color-text-muted)] md:text-lg">
            {t("projects.intro")}
          </p>
        </div>

        <div className="projects-section__grid mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {PROJECT_SLUGS.map((slug) => (
            <ProjectCard key={slug} locale={l} slug={slug} />
          ))}
        </div>

        <div className="projects-section__footer mt-12 flex flex-col items-center gap-3">
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary inline-flex items-center justify-center rounded-full px-6 py-3 text-sm no-underline"
            aria-label={t("projects.githubAria")}
          >
            {t("projects.cta")}
          </a>
          <p className="text-center text-sm text-[var(--color-text-muted)] max-w-xl">
            {t("projects.githubHint")}
          </p>
        </div>
      </div>
    </AnimateInView>
  );
}
