import type { CSSProperties } from "react";
import Image from "next/image";
import { Mail } from "lucide-react";
import { FeatureCard } from "./cards";
import AnimateInView from "./AnimateInView";
import HeroSocialLinks from "./HeroSocialLinks";
import AboutSkillsSection from "./AboutSkillsSection";
import ProjectsSection from "./ProjectsSection";
import SectionTitleWithIcon from "./SectionTitleWithIcon";
import { getTranslation } from "../i18n/server";
import { localePath, type Locale } from "../i18n/config";
import { CONTACT_EMAIL, SITE_LAST_UPDATE_ISO } from "../config/social";
import { HERO_SCROLL_SKILLS } from "../config/hero-scroll-skills";

/** Répétitions de la liste côte à côte : boucle infinie sans saut (≥ 2). */
const SKILLS_MARQUEE_COPIES = 3;

export default function HomeContent({ locale }: { locale: string }) {
  const t = getTranslation(locale as Locale);
  const l = locale as Locale;
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Contact portfolio")}`;
  const projectsHash = `${localePath(l, "/")}#projects`;

  const lastUpdateDate = new Date(`${SITE_LAST_UPDATE_ISO}T12:00:00`);
  const lastUpdateFormatted = lastUpdateDate.toLocaleDateString(
    l === "fr" ? "fr-FR" : "en-US",
    { year: "numeric", month: "numeric", day: "numeric" },
  );

  const skillsMarqueeItems = Array.from(
    { length: SKILLS_MARQUEE_COPIES },
    (_, copy) =>
      HERO_SCROLL_SKILLS.map((label, i) => ({
        key: `${copy}-${i}-${label}`,
        label,
      })),
  ).flat();

  const HIGHLIGHTS = [
    {
      key: "education",
      title: t("home.highlight1Title"),
      body: t("home.highlight1Body"),
      icon: (
        <Image
          src="/logos/centrale-supelec.svg"
          alt={t("home.highlight1LogoAlt")}
          width={96}
          height={72}
          unoptimized
          className="max-h-10 w-auto max-w-[5.5rem] object-contain object-center"
        />
      ),
    },
    {
      key: "safran",
      title: t("home.highlight2Title"),
      body: t("home.highlight2Body"),
      icon: (
        <Image
          src="/logos/safran.svg"
          alt={t("home.highlight2LogoAlt")}
          width={76}
          height={84}
          unoptimized
          className="max-h-10 w-auto max-w-[5.5rem] object-contain object-center"
        />
      ),
    },
    {
      key: "projects",
      title: t("home.highlight3Title"),
      body: (
        <>
          {t("home.highlight3BodyPrefix")}
          <a
            href={projectsHash}
            className="font-medium text-[rgb(var(--primary))] no-underline hover:underline"
            aria-label={t("home.highlight3LinkAria")}
          >
            {t("home.highlight3LinkLabel")}
          </a>
        </>
      ),
      icon: (
        <Image
          src="/logos/github-mark.svg"
          alt={t("home.highlight3LogoAlt")}
          width={32}
          height={32}
          unoptimized
          className="hero-github-logo max-h-10 w-8 object-contain"
        />
      ),
    },
  ];

  return (
    <>
      <AnimateInView
        id="top"
        initialOnly
        delay={80}
        className="hero-wrapper landing-reveal-hero"
        as="section"
      >
        <div className="hero-content hero-content--intro">
          <h1 className="hero-title">
            {t("home.titleHighlight") ? (
              <>
                <span className="hero-title__greeting">
                  {t("home.titleLine1")}
                </span>{" "}
                <span className="hero-title__name">
                  {t("home.titleHighlight")}
                </span>
              </>
            ) : (
              <span className="hero-title__greeting">
                {t("home.titleLine1Before")}
                <span className="hero-title__name">
                  {t("home.titleLine1Accent")}
                </span>
              </span>
            )}
          </h1>
          <div className="hero-lines">
            <p>{t("home.heroLine1")}</p>
            <p>{t("home.heroLine2")}</p>
          </div>
          <HeroSocialLinks />
        </div>
        <div id="features" className="hero-highlights">
          <div className="grid w-full min-w-0 grid-cols-3 gap-3 sm:gap-4 md:gap-7">
            {HIGHLIGHTS.map((highlight) => (
              <FeatureCard
                key={highlight.key}
                title={highlight.title}
                body={highlight.body}
                icon={highlight.icon}
                className="min-w-0 [&_h3]:text-base [&_h3]:sm:text-xl [&_p]:text-sm [&_p]:sm:text-base [&_h3]:mb-1.5 sm:[&_h3]:mb-2 !px-3 !py-4 sm:!px-5 sm:!py-6 md:!p-8"
              />
            ))}
          </div>
          {HERO_SCROLL_SKILLS.length > 0 && (
            <div className="skills-marquee-wrap">
              <p className="sr-only">
                {t("home.skillsMarqueeIntro")}: {HERO_SCROLL_SKILLS.join(", ")}.
              </p>
              <div className="skills-marquee" aria-hidden="true">
                <div
                  className="skills-marquee__track"
                  style={
                    {
                      "--skills-marquee-copies": SKILLS_MARQUEE_COPIES,
                    } as CSSProperties
                  }
                >
                  {skillsMarqueeItems.map(({ key, label }) => (
                    <span key={key} className="skills-marquee__item">
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </AnimateInView>

      <h2 className="sr-only">{t("home.sectionsTitle")}</h2>

      <AboutSkillsSection locale={locale} />

      <ProjectsSection locale={locale} />

      <AnimateInView
        id="contact"
        className="landing-section landing-reveal-cta mx-auto max-w-[1200px] px-4 py-14 md:py-20"
        as="section"
        aria-labelledby="contact-heading"
      >
        <div className="contact-section">
          <div className="contact-section__head">
            <SectionTitleWithIcon id="contact-heading" icon={Mail}>
              {t("contact.title")}
            </SectionTitleWithIcon>
            <p className="contact-section__intro mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-[var(--color-text-muted)] md:text-lg">
              {t("contact.headline")}
            </p>
          </div>
          <div className="contact-section-inner mx-auto mt-12 max-w-xl space-y-5 text-center">
            <div className="flex flex-col items-center gap-3 pt-1">
              <a
                href={mailto}
                className="btn btn-primary inline-flex items-center justify-center px-6 py-3 rounded-full no-underline !text-sm"
              >
                {t("contact.cta")}
              </a>
              <a
                href={mailto}
                className="text-sm font-medium text-[rgb(var(--primary))] no-underline hover:underline break-all"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
            <p className="text-sm text-[var(--color-text-muted)] pt-4 border-t border-[var(--color-border)]">
              {t("contact.location")}
            </p>
            <p className="text-xs text-[var(--color-text-muted)] opacity-90">
              {t("contact.lastUpdate", { date: lastUpdateFormatted })}
            </p>
          </div>
        </div>
      </AnimateInView>
    </>
  );
}
