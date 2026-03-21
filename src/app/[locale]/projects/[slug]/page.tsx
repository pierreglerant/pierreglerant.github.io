import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import ProjectDetailContent from "../../../../components/ProjectDetailContent";
import { getTranslation } from "../../../../i18n/server";
import {
  SITE_URL,
  LOCALES,
  DEFAULT_LOCALE,
  type Locale,
} from "../../../../i18n/config";
import {
  PROJECT_SLUGS,
  isProjectSlug,
  PROJECT_COVER_IMAGE,
} from "../../../../config/projects";

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of LOCALES) {
    for (const slug of PROJECT_SLUGS) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!LOCALES.includes(locale as Locale) || !isProjectSlug(slug)) {
    return { title: "Not found" };
  }
  const t = getTranslation(locale as Locale);
  const title = t(`projects.items.${slug}.title`);
  const description = t(`projects.items.${slug}.excerpt`);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}/projects/${slug}`,
      images: [
        {
          url: `${SITE_URL}${PROJECT_COVER_IMAGE[slug]}`,
          width: 960,
          height: 540,
          alt: title,
        },
      ],
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/projects/${slug}`,
      languages: {
        ...Object.fromEntries(
          LOCALES.map((l) => [l, `${SITE_URL}/${l}/projects/${slug}`]),
        ),
        "x-default": `${SITE_URL}/${DEFAULT_LOCALE}/projects/${slug}`,
      },
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!LOCALES.includes(locale as Locale)) {
    notFound();
  }
  if (!isProjectSlug(slug)) {
    notFound();
  }

  return (
    <>
      <Header />
      <main
        id="main"
        className="min-h-[calc(100vh-var(--header-height)-120px)]"
      >
        <ProjectDetailContent locale={locale as Locale} slug={slug} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
