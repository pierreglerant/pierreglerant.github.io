import Link from "next/link";
import type { Locale } from "../i18n/config";
import { getTranslation } from "../i18n/server";
import CopyEmailButton from "./CopyEmailButton";
import AnimateInView from "./AnimateInView";
import { CONTACT_EMAIL } from "../config/social";

export default function Footer({ locale }: { locale: string }) {
  const t = getTranslation(locale as Locale);

  return (
    <AnimateInView
      as="footer"
      role="contentinfo"
      className="border-t border-[var(--color-border)] pt-10 px-4 pb-4 text-[var(--color-text-muted)] text-sm text-center md:text-left mt-6 landing-reveal-footer"
    >
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex flex-wrap justify-center md:justify-between gap-12 pl-0 md:pl-4 footer-columns">
          <div className="flex-[1_1_280px] max-w-[400px] text-center md:text-left">
            <h2 className="text-lg font-semibold text-[var(--color-text)] mb-3">
              Pierre
              <span className="text-[rgb(var(--primary))]"> Glerant</span>
            </h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              {t("footer.description")}
            </p>
          </div>

          <div className="flex-[1_1_280px] max-w-[400px] text-center md:text-left">
            <h3 className="text-base font-semibold text-[var(--color-text)] mb-3">
              {t("footer.contact")}
            </h3>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              {t("footer.emailLabel")}{" "}
              <CopyEmailButton
                email={CONTACT_EMAIL}
                copyLabel={t("footer.copyEmail")}
                copiedLabel={t("footer.emailCopied")}
                ariaLabel={t("footer.copyEmailAria")}
              />
              <br />
              <Link
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-[rgb(var(--primary))] no-underline hover:underline inline-block mt-2"
              >
                {t("footer.writeEmail")}
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center text-[var(--color-text-muted)] text-xs footer-copyright">
          <p>
            &copy; {new Date().getFullYear()} Pierre Glerant.{" "}
            {t("footer.allRightsReserved")}
          </p>
        </div>
      </div>
    </AnimateInView>
  );
}
