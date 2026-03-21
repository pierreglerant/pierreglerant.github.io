"use client";

import { LanguageProvider } from "./LanguageProvider";
import ErrorBoundary from "./ErrorBoundary";
import type { Locale } from "../i18n/config";

export function Providers({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  return (
    <ErrorBoundary
      showDetails={process.env.NODE_ENV === "development"}
      fallbackMessage="Une erreur inattendue s'est produite. Nous travaillons à la résoudre."
    >
      <LanguageProvider initialLocale={locale}>{children}</LanguageProvider>
    </ErrorBoundary>
  );
}
