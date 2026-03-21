import { GenericButton } from "./buttons";
import { TestimonialCard, FeatureCard } from "./cards";
import AnimateInView from "./AnimateInView";
import HeroSocialLinks from "./HeroSocialLinks";
import { getTranslation } from "../i18n/server";
import { localePath, type Locale } from "../i18n/config";
import { CONTACT_EMAIL } from "../config/social";

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
  const homeHref = localePath(l, "/");
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Contact portfolio")}`;

  const HIGHLIGHTS = [
    { title: t("home.highlight1Title"), body: t("home.highlight1Body") },
    { title: t("home.highlight2Title"), body: t("home.highlight2Body") },
    { title: t("home.highlight3Title"), body: t("home.highlight3Body") },
  ];

  const TESTIMONIALS = [
    {
      quote: t("home.testimonial1Quote"),
      author: t("home.testimonial1Author"),
    },
    {
      quote: t("home.testimonial2Quote"),
      author: t("home.testimonial2Author"),
    },
    {
      quote: t("home.testimonial3Quote"),
      author: t("home.testimonial3Author"),
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
          <p className="hero-slash" aria-hidden="true">
            {t("home.heroSlash")}
          </p>
          <div className="hero-lines">
            <p>{t("home.heroLine1")}</p>
            <p>{t("home.heroLine2")}</p>
            <p>{t("home.heroLine3")}</p>
          </div>
          <HeroSocialLinks />
          <div className="actions">
            <GenericButton
              label={t("home.requestDemo")}
              href={localePath(l, "/contact")}
              variant="primary"
            />
            <GenericButton
              label={t("home.secondaryCta")}
              href={`${homeHref}#features`}
              variant="outline"
            />
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
        id="features"
        className="landing-section landing-reveal-stagger"
        as="section"
      >
        <div className="section-title">
          <h3>{t("home.featuresTitle")}</h3>
          <p>{t("home.featuresSub")}</p>
        </div>
        <div className="grid">
          {HIGHLIGHTS.map((highlight) => (
            <FeatureCard
              key={highlight.title}
              title={highlight.title}
              body={highlight.body}
            />
          ))}
        </div>
      </AnimateInView>

      <AnimateInView
        id="trust"
        className="landing-section landing-reveal-stagger"
        as="section"
      >
        <div className="section-title">
          <h3>{t("home.trustTitle")}</h3>
        </div>
        <div className="grid">
          {TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard
              key={`${testimonial.author}-${index}`}
              quote={testimonial.quote}
              author={testimonial.author}
            />
          ))}
        </div>
      </AnimateInView>

      <AnimateInView
        className="landing-section landing-reveal-cta"
        as="section"
      >
        <div className="cta">
          <h3>{t("home.ctaTitle")}</h3>
          <p className="my-4 mx-auto max-w-[600px] text-muted-theme mb-8">
            {t("home.ctaSub")}
          </p>
          <GenericButton
            label={t("home.ctaBtn")}
            href={mailto}
            variant="primary"
            className="!inline-flex !w-auto !py-2 !px-5 !text-sm"
          />
        </div>
      </AnimateInView>
    </>
  );
}
