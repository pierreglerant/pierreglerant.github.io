import Skeleton from "../../components/skeletons/Skeleton";
import { ABOUT_SKILL_KEYS } from "../../config/about-skills";
import { PROJECT_SLUGS } from "../../config/projects";

/**
 * Squelette de la page d’accueil : aligné sur Header + HomeContent
 * (hero, cartes, marquee, à propos / CV, projets, contact, footer).
 */
function SectionHeadingSkeleton({
  titleWidth = "w-44",
}: {
  titleWidth?: string;
}) {
  return (
    <div className="flex items-center justify-center gap-3 md:gap-3.5">
      <Skeleton width="w-8" height="h-8" rounded="lg" />
      <Skeleton width={titleWidth} height="h-9 md:h-10" rounded="md" />
    </div>
  );
}

export default function Loading() {
  const skillPlaceholders = ABOUT_SKILL_KEYS.length;
  const projectPlaceholders = PROJECT_SLUGS.length;

  return (
    <>
      <header className="site-header" aria-hidden>
        <div className="nav">
          <div className="flex items-center gap-2 min-w-0">
            <Skeleton width="w-[10.5rem] sm:w-52" height="h-7" rounded="md" />
          </div>
          <div className="hidden md:flex justify-self-center">
            <div className="flex items-center gap-3 rounded-full bg-[var(--color-nav-bg)] px-5 py-2.5 shadow-[0_10px_30px_var(--color-nav-shadow)]">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} width="w-12" height="h-3.5" rounded="sm" />
              ))}
            </div>
          </div>
          <div className="nav-cta">
            <Skeleton
              width="w-9 min-w-[2.25rem]"
              height="h-9"
              rounded="full"
              className="hidden md:block"
            />
            <Skeleton
              width="w-11"
              height="h-11"
              rounded="full"
              className="md:hidden"
            />
          </div>
        </div>
      </header>

      <main id="main">
        <section className="hero-wrapper landing-reveal-hero" aria-hidden>
          <div className="hero-content hero-content--intro">
            <div className="mx-auto max-w-2xl px-2">
              <Skeleton
                width="w-full max-w-[min(100%,520px)] mx-auto"
                height="h-12 sm:h-14"
                rounded="lg"
                className="min-h-[2.75rem]"
              />
            </div>
            <div className="hero-lines mt-2 space-y-2 px-2">
              <Skeleton
                width="w-full max-w-md mx-auto"
                height="h-5"
                rounded="md"
              />
            </div>
            <div className="hero-social mt-2 flex flex-wrap justify-center gap-3 sm:gap-3.5 px-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} width="w-11" height="h-11" rounded="xl" />
              ))}
            </div>
          </div>

          <div className="hero-highlights">
            <div className="grid w-full min-w-0 grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-4 md:gap-7">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="card !px-3 !py-4 sm:!px-5 sm:!py-6 md:!p-8 text-center"
                >
                  <div className="mb-3 flex min-h-[2.25rem] justify-center">
                    <Skeleton width="w-14" height="h-10" rounded="md" />
                  </div>
                  <Skeleton
                    width="w-3/4 mx-auto"
                    height="h-5 sm:h-6"
                    rounded="md"
                    className="mb-2.5"
                  />
                  <Skeleton width="w-full" height="h-3" rounded="sm" />
                  <Skeleton
                    width="w-[92%] mx-auto"
                    height="h-3"
                    rounded="sm"
                    className="mt-1.5"
                  />
                </div>
              ))}
            </div>

            <div className="skills-marquee-wrap">
              <div className="skills-marquee">
                <div className="flex w-full flex-wrap justify-center gap-3 py-1 sm:gap-4 md:justify-start md:gap-6">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <Skeleton
                      key={i}
                      width="w-[4.5rem] sm:w-20"
                      height="h-4"
                      rounded="full"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="about-section landing-section landing-reveal-stagger mx-auto max-w-[1200px] px-4 py-14 md:py-20"
          aria-hidden
        >
          <div className="about-section__skills-head">
            <SectionHeadingSkeleton titleWidth="w-40 sm:w-48" />
          </div>
          <div className="about-skills-grid mx-auto mt-12 grid w-full max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
            {Array.from({ length: skillPlaceholders }).map((_, i) => (
              <div
                key={i}
                className="card min-w-0 !px-5 !py-6 sm:!px-6 sm:!py-7"
              >
                <Skeleton
                  width="w-[72%]"
                  height="h-5 sm:h-6"
                  rounded="md"
                  className="mb-3"
                />
                <Skeleton width="w-full" height="h-3" rounded="sm" />
                <Skeleton
                  width="w-full"
                  height="h-3"
                  rounded="sm"
                  className="mt-1.5"
                />
                <Skeleton
                  width="w-[55%]"
                  height="h-3"
                  rounded="sm"
                  className="mt-1.5"
                />
              </div>
            ))}
          </div>

          <div className="about-section__resume mx-auto mt-28 max-w-2xl md:mt-40">
            <SectionHeadingSkeleton titleWidth="w-36 sm:w-44" />
            <div className="mt-8 space-y-4">
              <Skeleton
                width="w-full"
                height="h-64 sm:h-72 md:h-80"
                rounded="xl"
                className="max-h-[320px]"
              />
              <div className="flex justify-center pt-2">
                <Skeleton width="w-48" height="h-11" rounded="full" />
              </div>
            </div>
          </div>
        </section>

        <section
          className="landing-section landing-reveal-stagger mx-auto max-w-[1200px] px-4 py-14 md:py-20"
          aria-hidden
        >
          <div className="projects-section__head">
            <SectionHeadingSkeleton titleWidth="w-36 sm:w-40" />
            <div className="mx-auto mt-4 max-w-4xl space-y-3 px-1">
              <Skeleton width="w-full" height="h-5" rounded="md" />
              <Skeleton
                width="w-full max-w-2xl mx-auto"
                height="h-4"
                rounded="md"
              />
            </div>
            <div className="mx-auto mt-3 max-w-3xl px-1">
              <Skeleton width="w-full" height="h-3" rounded="sm" />
            </div>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {Array.from({ length: projectPlaceholders }).map((_, i) => (
              <div
                key={i}
                className="project-card card flex flex-col overflow-hidden !p-0"
              >
                <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden bg-[var(--color-surface)]">
                  <Skeleton
                    width="w-full"
                    height="h-full"
                    rounded="none"
                    className="absolute inset-0 min-h-0 border-0"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5 md:p-6">
                  <div className="flex items-start justify-between gap-2">
                    <Skeleton
                      width="w-full"
                      height="h-6 md:h-7"
                      rounded="md"
                      className="min-w-0 flex-1 max-w-[85%]"
                    />
                    <Skeleton width="w-14" height="h-5" rounded="sm" />
                  </div>
                  <Skeleton width="w-full" height="h-3" rounded="sm" />
                  <Skeleton width="w-[94%]" height="h-3" rounded="sm" />
                  <Skeleton width="w-24" height="h-4" rounded="sm" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          className="landing-section landing-reveal-cta mx-auto max-w-[1200px] px-4 py-14 md:py-20"
          aria-hidden
        >
          <div className="contact-section">
            <div className="contact-section__head">
              <SectionHeadingSkeleton titleWidth="w-36 sm:w-44" />
              <div className="mx-auto mt-4 max-w-2xl space-y-3 px-1">
                <Skeleton width="w-full" height="h-5" rounded="md" />
                <Skeleton width="w-[88%] mx-auto" height="h-5" rounded="md" />
              </div>
            </div>
            <div className="contact-section-inner mx-auto mt-12 max-w-xl space-y-4 text-center">
              <Skeleton width="w-48 mx-auto" height="h-11" rounded="full" />
              <Skeleton
                width="w-full max-w-xs mx-auto"
                height="h-4"
                rounded="md"
              />
              <Skeleton
                width="w-2/3 mx-auto"
                height="h-3"
                rounded="sm"
                className="mt-6 border-t border-[var(--color-border)] pt-6"
              />
              <Skeleton width="w-40 mx-auto" height="h-3" rounded="sm" />
            </div>
          </div>
        </section>
      </main>

      <footer
        className="px-4 py-3 text-center landing-reveal-footer"
        aria-hidden
      >
        <Skeleton width="w-56 mx-auto max-w-[90vw]" height="h-3" rounded="sm" />
      </footer>
    </>
  );
}
