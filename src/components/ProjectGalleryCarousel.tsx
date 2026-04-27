"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const AUTO_ADVANCE_MS = 10_000;
const SWIPE_THRESHOLD_PX = 48;

export type ProjectGallerySlide = { src: string; alt: string };

type Props = {
  slides: ProjectGallerySlide[];
  prevLabel: string;
  nextLabel: string;
  regionLabel: string;
  openLightboxLabel: string;
  closeLightboxLabel: string;
  lightboxZoomInLabel: string;
  lightboxZoomOutLabel: string;
  imageFit?: "cover" | "contain" | "auto";
};

export default function ProjectGalleryCarousel({
  slides,
  prevLabel,
  nextLabel,
  regionLabel,
  openLightboxLabel,
  closeLightboxLabel,
  lightboxZoomInLabel,
  lightboxZoomOutLabel,
  imageFit = "cover",
}: Props) {
  const n = slides.length;
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxZoomed, setLightboxZoomed] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const tickAuto = useCallback(() => {
    setIndex((i) => (i + 1) % n);
  }, [n]);

  const goNextUser = useCallback(() => {
    setAutoplayEnabled(false);
    setIndex((i) => (i + 1) % n);
  }, [n]);

  const goPrevUser = useCallback(() => {
    setAutoplayEnabled(false);
    setIndex((i) => (i - 1 + n) % n);
  }, [n]);

  const goNextLightbox = useCallback(() => {
    if (n <= 1) return;
    setLightboxIndex((i) => (i + 1) % n);
    setLightboxZoomed(false);
  }, [n]);

  const goPrevLightbox = useCallback(() => {
    if (n <= 1) return;
    setLightboxIndex((i) => (i - 1 + n) % n);
    setLightboxZoomed(false);
  }, [n]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxOpen(false);
        setLightboxZoomed(false);
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNextLightbox();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrevLightbox();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [goNextLightbox, goPrevLightbox, lightboxOpen]);

  useEffect(() => {
    if (!autoplayEnabled || n <= 1) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const id = window.setInterval(tickAuto, AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [autoplayEnabled, n, tickAuto]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < SWIPE_THRESHOLD_PX) return;
    if (dx > 0) goPrevUser();
    else goNextUser();
  };

  if (n === 0) return null;

  const trackPct = n * 100;
  const slidePct = 100 / n;
  const currentSlide = slides[index] ?? slides[0];
  const currentIsSecureOps = currentSlide?.src.includes("/secureops/") ?? false;
  const currentIsSecureOpsPortrait = currentSlide?.src.includes("/secureops/4.png");
  const carouselAspectClass = currentIsSecureOps
    ? currentIsSecureOpsPortrait
      ? "aspect-[635/899]"
      : currentSlide?.src.includes("/secureops/5.png")
        ? "aspect-[1851/961]"
        : "aspect-[1869/957]"
    : "aspect-[16/9]";
  const lightboxSlide = slides[lightboxIndex] ?? slides[0];
  const lightboxImageFitClass = lightboxSlide.src.includes("/secureops/4.png")
    ? "object-contain"
    : "object-cover";

  const lightboxOverlay =
    mounted && lightboxOpen && lightboxSlide
      ? createPortal(
          <div
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-[var(--color-overlay)] backdrop-blur-sm"
            role="presentation"
            onClick={() => {
              setLightboxOpen(false);
              setLightboxZoomed(false);
            }}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxOpen(false);
                setLightboxZoomed(false);
              }}
              className="fixed right-3 top-3 z-[10001] flex h-11 w-11 items-center justify-center rounded-xl border border-[rgba(255,255,255,0.12)] bg-[rgba(5,10,24,0.92)] text-[var(--color-text)] shadow-lg backdrop-blur-md transition-colors hover:bg-[var(--color-surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--primary))] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
              aria-label={closeLightboxLabel}
            >
              <X className="h-5 w-5 shrink-0" aria-hidden />
            </button>

            <div
              role="dialog"
              aria-modal="true"
              aria-label={lightboxSlide.alt}
              className="pointer-events-auto flex h-[100dvh] w-full max-w-[100vw] items-center justify-center overflow-hidden p-2 sm:p-3"
              onClick={() => {
                setLightboxOpen(false);
                setLightboxZoomed(false);
              }}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxZoomed((z) => !z);
                }}
                aria-label={
                  lightboxZoomed ? lightboxZoomOutLabel : lightboxZoomInLabel
                }
                aria-pressed={lightboxZoomed}
                className={`relative block border-0 bg-transparent p-0 outline-none transition-transform duration-300 ease-out motion-reduce:transition-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--primary))] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)] ${lightboxZoomed ? "scale-[1.6] cursor-zoom-out" : "scale-100 cursor-zoom-in"}`}
              >
                <div className="relative h-[calc(100dvh-1rem)] w-[calc(100vw-1rem)] overflow-hidden rounded-lg sm:h-[calc(100dvh-1.5rem)] sm:w-[calc(100vw-1.5rem)]">
                  <Image
                    src={lightboxSlide.src}
                    alt={lightboxSlide.alt}
                    fill
                    className={lightboxImageFitClass}
                    sizes="94vw"
                    quality={100}
                    priority
                    draggable={false}
                  />
                </div>
              </button>

              {n > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      goPrevLightbox();
                    }}
                    className="fixed left-3 top-1/2 z-[10001] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[var(--color-bg)]/80 text-[var(--color-text)] shadow-md backdrop-blur-sm transition-colors hover:border-[rgb(var(--primary))]/45 hover:bg-[var(--color-surface)]/95 hover:text-[rgb(var(--primary))] md:left-5 md:h-12 md:w-12"
                    aria-label={prevLabel}
                  >
                    <ChevronLeft className="h-7 w-7" aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      goNextLightbox();
                    }}
                    className="fixed right-3 top-1/2 z-[10001] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[var(--color-bg)]/80 text-[var(--color-text)] shadow-md backdrop-blur-sm transition-colors hover:border-[rgb(var(--primary))]/45 hover:bg-[var(--color-surface)]/95 hover:text-[rgb(var(--primary))] md:right-5 md:h-12 md:w-12"
                    aria-label={nextLabel}
                  >
                    <ChevronRight className="h-7 w-7" aria-hidden />
                  </button>
                </>
              ) : null}
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <div
        className={`project-gallery relative ${carouselAspectClass} w-full overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_10px_40px_rgba(2,8,26,0.55)]`}
        role="region"
        aria-roledescription="carousel"
        aria-label={regionLabel}
        onTouchStart={n > 1 ? onTouchStart : undefined}
        onTouchEnd={n > 1 ? onTouchEnd : undefined}
      >
        <div className="relative h-full w-full overflow-hidden">
          <div
            className="project-gallery__track flex h-full ease-out motion-safe:transition-transform motion-safe:duration-500 motion-reduce:transition-none"
            style={{
              width: `${trackPct}%`,
              transform: `translateX(-${index * slidePct}%)`,
            }}
          >
            {slides.map((slide, i) => {
              const isPortraitPage = slide.src.includes("/secureops/4.png");
              const slideFitClass =
                isPortraitPage
                  ? "object-contain"
                  : imageFit === "contain"
                    ? "object-contain"
                    : "object-cover";

              return (
                <div
                  key={slide.src}
                  className={`relative h-full shrink-0 ${isPortraitPage ? "bg-[var(--color-bg)]" : ""}`}
                  style={{ width: `${slidePct}%` }}
                >
                  <button
                    type="button"
                    className="block h-full w-full cursor-zoom-in border-0 bg-transparent p-0"
                    aria-label={`${openLightboxLabel} (${i + 1}/${n})`}
                    onClick={() => {
                      setAutoplayEnabled(false);
                      setLightboxIndex(i);
                      setLightboxOpen(true);
                      setLightboxZoomed(false);
                    }}
                  >
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      className={slideFitClass}
                      sizes="(max-width: 900px) 100vw, 896px"
                      quality={100}
                      priority={i === 0}
                      draggable={false}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {n > 1 && (
          <>
            <button
              type="button"
              className="project-gallery__btn project-gallery__btn--prev absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[var(--color-bg)]/75 text-[var(--color-text)] shadow-md backdrop-blur-sm transition-colors hover:border-[rgb(var(--primary))]/45 hover:bg-[var(--color-surface)]/95 hover:text-[rgb(var(--primary))] md:left-3 md:h-11 md:w-11"
              onClick={goPrevUser}
              aria-label={prevLabel}
            >
              <ChevronLeft className="h-6 w-6 md:h-7 md:w-7" aria-hidden />
            </button>
            <button
              type="button"
              className="project-gallery__btn project-gallery__btn--next absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[var(--color-bg)]/75 text-[var(--color-text)] shadow-md backdrop-blur-sm transition-colors hover:border-[rgb(var(--primary))]/45 hover:bg-[var(--color-surface)]/95 hover:text-[rgb(var(--primary))] md:right-3 md:h-11 md:w-11"
              onClick={goNextUser}
              aria-label={nextLabel}
            >
              <ChevronRight className="h-6 w-6 md:h-7 md:w-7" aria-hidden />
            </button>
          </>
        )}
      </div>
      {lightboxOverlay}
    </>
  );
}
