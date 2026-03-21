import { FolderKanban } from "lucide-react";
import AnimateInView from "./AnimateInView";
import ProjectCard from "./ProjectCard";
import SectionTitleWithIcon from "./SectionTitleWithIcon";
import { getTranslation } from "../i18n/server";
import type { Locale } from "../i18n/config";
import { PROJECT_SLUGS } from "../config/projects";

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
          <SectionTitleWithIcon id="projects-heading" icon={FolderKanban}>
            {t("projects.title")}
          </SectionTitleWithIcon>
          <p className="mx-auto mt-4 max-w-4xl text-center text-base leading-relaxed text-[var(--color-text-muted)] md:text-lg">
            {t("projects.intro")}
          </p>
          <p className="mx-auto mt-3 max-w-4xl text-center text-xs italic leading-relaxed text-[var(--color-text-muted)] md:text-sm">
            {t("projects.introConfidentiality")}
          </p>
        </div>

        <div className="projects-section__grid mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {PROJECT_SLUGS.map((slug) => (
            <ProjectCard key={slug} locale={l} slug={slug} />
          ))}
        </div>
      </div>
    </AnimateInView>
  );
}
