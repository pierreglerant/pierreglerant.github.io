"use client";

import { useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function scrollBehavior(): ScrollBehavior {
  return prefersReducedMotion() ? "auto" : "smooth";
}

function scrollToElementById(id: string): boolean {
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
  return true;
}

/**
 * Après navigation Next ou clic sur un lien même page + #ancre,
 * fait défiler la page jusqu’à l’élément cible (animation fluide).
 */
export default function ScrollToHash() {
  const pathname = usePathname();
  const router = useRouter();

  const runScrollForHash = useCallback((hash: string) => {
    const id = hash.replace(/^#/, "");
    if (!id) return;

    const tryScroll = (attempt: number) => {
      if (scrollToElementById(id)) return;
      if (attempt >= 12) return;
      window.requestAnimationFrame(() => tryScroll(attempt + 1));
    };

    window.requestAnimationFrame(() => tryScroll(0));
  }, []);

  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    if (hash) {
      const t = window.setTimeout(() => runScrollForHash(hash), 50);
      return () => clearTimeout(t);
    }
  }, [pathname, runScrollForHash]);

  useEffect(() => {
    const onHashChange = () => {
      if (window.location.hash) runScrollForHash(window.location.hash);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [runScrollForHash]);

  useEffect(() => {
    const onClickCapture = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }
      const a = (e.target as HTMLElement | null)?.closest("a");
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || href.startsWith("mailto:") || href.startsWith("tel:")) return;

      let url: URL;
      try {
        url = new URL(href, window.location.origin);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) return;
      if (!url.hash || url.hash === "#") return;

      const pathA = url.pathname.replace(/\/$/, "") || "/";
      const pathB = window.location.pathname.replace(/\/$/, "") || "/";
      if (pathA !== pathB) return;

      e.preventDefault();
      router.replace(`${url.pathname}${url.search}${url.hash}`, { scroll: false });
      runScrollForHash(url.hash);
    };

    document.addEventListener("click", onClickCapture, true);
    return () => document.removeEventListener("click", onClickCapture, true);
  }, [runScrollForHash, router]);

  return null;
}
