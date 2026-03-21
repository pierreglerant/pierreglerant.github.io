import type { Locale } from "../i18n/config";
import { getTranslation } from "../i18n/server";
import AnimateInView from "./AnimateInView";

export default function Footer({ locale }: { locale: string }) {
  const t = getTranslation(locale as Locale);
  const year = new Date().getFullYear();

  return (
    <AnimateInView
      as="footer"
      role="contentinfo"
      className="px-4 py-3 text-center text-[var(--color-text-muted)] text-xs landing-reveal-footer"
    >
      <p className="footer-copyright">{t("footer.copyright", { year })}</p>
    </AnimateInView>
  );
}
