import type { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import HomeContent from "../../components/HomeContent";
import { getTranslation } from "../../i18n/server";
import { SITE_URL, LOCALES, DEFAULT_LOCALE, type Locale } from "../../i18n/config";
import { CONTACT_EMAIL } from "../../config/social";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslation(locale as Locale);

  return {
    title: t("metadata.homeTitle"),
    description: t("metadata.homeDescription"),
    openGraph: {
      title: t("metadata.homeTitle"),
      description: t("metadata.homeDescription"),
      url: `${SITE_URL}/${locale}`,
      images: [
        {
          url: `${SITE_URL}/logo.png`,
          width: 512,
          height: 512,
          alt: "Pierre Glerant",
          type: "image/png",
        },
      ],
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        ...Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}`])),
        "x-default": `${SITE_URL}/${DEFAULT_LOCALE}`,
      },
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getTranslation(locale as Locale);
  const contactUrl = `${SITE_URL}/${locale}#contact`;

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Pierre Glerant",
    url: SITE_URL,
    image: `${SITE_URL}/logo.png`,
    description: t("metadata.siteDescription"),
    email: CONTACT_EMAIL,
    sameAs: [],
  };

  const webSiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Pierre Glerant",
    url: SITE_URL,
    description: t("metadata.siteDescription"),
    inLanguage: locale === "fr" ? "fr-FR" : "en-US",
    publisher: {
      "@type": "Person",
      name: "Pierre Glerant",
    },
  };

  const contactPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: t("metadata.contactTitle"),
    url: contactUrl,
    mainEntity: {
      "@type": "Person",
      name: "Pierre Glerant",
      email: CONTACT_EMAIL,
      url: SITE_URL,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webSiteJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactPageJsonLd),
        }}
      />
      <Header />
      <main id="main">
        <HomeContent locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
