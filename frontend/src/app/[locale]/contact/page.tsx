import type { Metadata } from "next";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { getTranslation } from "../../../i18n/server";
import {
  SITE_URL,
  LOCALES,
  DEFAULT_LOCALE,
  SLUG_MAP,
  type Locale,
} from "../../../i18n/config";
import { CONTACT_EMAIL } from "../../../config/social";

const MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Contact portfolio")}`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslation(locale as Locale);
  const l = locale as Locale;
  const slug = SLUG_MAP[l].contact;

  return {
    title: t("metadata.contactTitle"),
    description: t("metadata.contactDescription"),
    openGraph: {
      title: `${t("metadata.contactTitle")} — Pierre Glerant`,
      description: t("metadata.contactDescription"),
      url: `${SITE_URL}/${locale}/${slug}`,
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/${slug}`,
      languages: {
        ...Object.fromEntries(
          LOCALES.map((loc) => [
            loc,
            `${SITE_URL}/${loc}/${SLUG_MAP[loc].contact}`,
          ]),
        ),
        "x-default": `${SITE_URL}/${DEFAULT_LOCALE}/${SLUG_MAP[DEFAULT_LOCALE].contact}`,
      },
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getTranslation(locale as Locale);
  const l = locale as Locale;
  const pageUrl = `${SITE_URL}/${locale}/${SLUG_MAP[l].contact}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Pierre Glerant",
        item: `${SITE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t("metadata.contactTitle"),
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />
      <main
        id="main"
        className="min-h-[calc(100vh-var(--header-height)-120px)] max-w-[640px] mx-auto px-4 py-16 text-center"
      >
        <h1 className="text-3xl font-semibold text-[var(--color-text)] mb-4">
          {t("metadata.contactTitle")}
        </h1>
        <p className="text-[var(--color-text-muted)] mb-10 leading-relaxed">
          {t("contact.intro")}
        </p>
        <a
          href={MAILTO}
          className="btn btn-primary inline-flex items-center justify-center px-6 py-3 rounded-full no-underline"
        >
          {t("contact.emailLink")}
        </a>
      </main>
      <Footer locale={locale} />
    </>
  );
}
