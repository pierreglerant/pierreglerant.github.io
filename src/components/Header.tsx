"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import type { Language } from "./LanguageProvider";

export default function Header() {
  const { language, setLanguage, t, lp } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  const DRAWER_CLOSE_DURATION_MS = 250;

  const closeMenu = useCallback(() => {
    if (closing) return;
    setClosing(true);
    setTimeout(() => {
      setMenuOpen(false);
      setClosing(false);
    }, DRAWER_CLOSE_DURATION_MS);
  }, [closing]);

  useEffect(() => {
    if (!menuOpen) return;
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [menuOpen, closeMenu]);

  const homeHash = `${lp("/")}#top`;
  const contactHash = `${lp("/")}#contact`;
  const aboutHash = `${lp("/")}#about`;
  const projectsHash = `${lp("/")}#projects`;

  const NAV_LINKS = [
    { label: t("header.home"), href: homeHash },
    { label: t("header.about"), href: aboutHash },
    { label: t("header.projects"), href: projectsHash },
    { label: t("header.contact"), href: contactHash },
  ];

  const toggleLanguage = () => {
    const newLang: Language = language === "en" ? "fr" : "en";
    setLanguage(newLang);
  };

  const languageFlag = language === "fr" ? "🇫🇷" : "🇬🇧";
  const switchLanguageLabel =
    language === "en"
      ? t("header.switchToFrench")
      : t("header.switchToEnglish");

  return (
    <header className={menuOpen ? "site-header z-[50]" : "site-header"}>
      <div className="nav">
        <Link href={homeHash} className="logo">
          <span>
            Pierre<span style={{ color: "rgb(var(--primary))" }}> Glerant</span>
          </span>
        </Link>
        <nav className="nav-links hidden md:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="nav-cta flex items-center gap-2 justify-self-end">
          <div className="hidden md:flex md:gap-2 md:items-center">
            <button
              type="button"
              onClick={toggleLanguage}
              className="btn btn-secondary p-2 rounded-full min-w-[2.25rem] min-h-[2.25rem] inline-flex items-center justify-center"
              style={{ cursor: "pointer" }}
              aria-label={switchLanguageLabel}
              title={switchLanguageLabel}
            >
              <span
                className="text-[1.125rem] leading-none select-none"
                aria-hidden
              >
                {languageFlag}
              </span>
            </button>
          </div>
          <button
            type="button"
            onClick={menuOpen ? closeMenu : () => setMenuOpen(true)}
            className="md:hidden btn btn-secondary p-2.5 rounded-full"
            aria-label={menuOpen ? t("header.closeMenu") : t("header.openMenu")}
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {(menuOpen || closing) && (
        <>
          <div
            className={`fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden transition-opacity duration-[250ms] ${
              closing ? "opacity-0" : "opacity-100"
            }`}
            aria-hidden
            onClick={closeMenu}
          />
          <div
            className={`header-drawer-panel fixed top-0 right-0 bottom-0 z-40 w-[min(320px,85vw)] bg-[var(--bg)] border-l border-[var(--color-border)] shadow-xl flex flex-col md:hidden ${
              closing ? "header-drawer-panel--closing" : ""
            }`}
            role="dialog"
            aria-modal="true"
            aria-label={t("header.menu")}
          >
            <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)] shrink-0">
              <span className="font-semibold text-[var(--color-text)]">
                {t("header.menu")}
              </span>
              <button
                type="button"
                onClick={closeMenu}
                className="p-2 rounded-full hover:bg-[var(--color-surface)] transition-colors"
                aria-label={t("header.closeMenu")}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-col gap-1 p-4 overflow-y-auto">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="py-3 px-4 rounded-lg text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="h-px bg-[var(--color-border)] my-2" />
              <div className="flex gap-2 py-2">
                <button
                  type="button"
                  onClick={toggleLanguage}
                  className="btn btn-secondary p-2 rounded-full min-w-[2.25rem] min-h-[2.25rem] inline-flex items-center justify-center"
                  aria-label={switchLanguageLabel}
                  title={switchLanguageLabel}
                >
                  <span
                    className="text-[1.125rem] leading-none select-none"
                    aria-hidden
                  >
                    {languageFlag}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
