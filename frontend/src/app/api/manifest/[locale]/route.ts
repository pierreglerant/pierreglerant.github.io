import { NextRequest, NextResponse } from "next/server";
import type { MetadataRoute } from "next";
import { LOCALES, SLUG_MAP, type Locale } from "../../../../i18n/config";
import { getTranslation } from "../../../../i18n/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ locale: string }> },
): Promise<NextResponse> {
  const { locale } = await params;

  if (!LOCALES.includes(locale as Locale)) {
    return NextResponse.json({ error: "Invalid locale" }, { status: 400 });
  }

  const t = getTranslation(locale as Locale);
  const l = locale as Locale;

  const manifest: MetadataRoute.Manifest = {
    name: t("metadata.siteTitle"),
    short_name: "Pierre Glerant",
    description: t("metadata.siteDescription"),
    start_url: `/${locale}`,
    scope: `/${locale}`,
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1e3a8a",
    orientation: "portrait-primary",
    lang: l === "fr" ? "fr-FR" : "en-US",
    dir: "ltr",
    icons: [
      {
        src: "/favicon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "/logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    categories: ["portfolio", "personal"],
    shortcuts: [
      {
        name: t("header.contact"),
        short_name: t("header.contact"),
        url: `/${locale}/${SLUG_MAP[l].contact}`,
        icons: [
          {
            src: "/logo.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    ],
    prefer_related_applications: false,
    display_override: ["standalone", "minimal-ui", "browser"],
  };

  return NextResponse.json(manifest, {
    headers: {
      "Content-Type": "application/manifest+json",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
