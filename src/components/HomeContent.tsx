import Image from "next/image";
import { FeatureCard } from "./cards";
import AnimateInView from "./AnimateInView";
import HeroSocialLinks from "./HeroSocialLinks";
import { getTranslation } from "../i18n/server";
import type { Locale } from "../i18n/config";
import {
  CONTACT_EMAIL,
  SITE_LAST_UPDATE_ISO,
  SOCIAL_LINKS,
} from "../config/social";

const TRUSTED_LOGOS = [
  "ACME CORP",
  "FINTECHX",
  "GOVTECH",
  "CLOUDSAFE",
  "DATAFLOW",
];

export default function HomeContent({ locale }: { locale: string }) {
  const t = getTranslation(locale as Locale);
  const l = locale as Locale;
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Contact portfolio")}`;

  const lastUpdateDate = new Date(`${SITE_LAST_UPDATE_ISO}T12:00:00`);
  const lastUpdateFormatted = lastUpdateDate.toLocaleDateString(
    l === "fr" ? "fr-FR" : "en-US",
    { year: "numeric", month: "numeric", day: "numeric" },
  );

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
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
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
        initialOnly
        delay={80}
        className="hero-wrapper landing-reveal-hero"
        as="section"
      >
        <div className="hero-content hero-content--intro">
          <h1 className="hero-title">
            <span className="hero-title__greeting">{t("home.titleLine1")}</span>{" "}
            <span className="hero-title__name">{t("home.titleHighlight")}</span>
          </h1>
          <div className="hero-lines">
            <p>{t("home.heroLine1")}</p>
            <p>{t("home.heroLine2")}</p>
            <p>{t("home.heroLine3")}</p>
          </div>
          <HeroSocialLinks />
        </div>
        <div id="features" className="hero-highlights">
          <div className="grid w-full min-w-0 grid-cols-3 gap-2 sm:gap-3 md:gap-6">
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
        </div>
      </AnimateInView>

      <AnimateInView
        className="landing-section landing-reveal-stagger"
        as="section"
      >
        <div className="logos">
          {TRUSTED_LOGOS.map((logo) => (
            <div key={logo}>{logo}</div>
          ))}
        </div>
      </AnimateInView>

      <h2 className="sr-only">{t("home.sectionsTitle")}</h2>

      <AnimateInView
        id="contact"
        className="landing-section landing-reveal-cta"
        as="section"
      >
        <div className="cta">
          <div className="contact-section-inner mx-auto max-w-xl space-y-5 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-[var(--color-text)] leading-tight">
              {t("contact.title")}
            </h2>
            <p className="text-lg md:text-xl font-medium text-[var(--color-text)] leading-snug">
              {t("contact.headline")}
            </p>
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
