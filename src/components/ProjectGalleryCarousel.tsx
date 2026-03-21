"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AUTO_ADVANCE_MS = 10_000;
const SWIPE_THRESHOLD_PX = 48;

export type ProjectGallerySlide = { src: string; alt: string };

type Props = {
  slides: ProjectGallerySlide[];
  prevLabel: string;
  nextLabel: string;
  regionLabel: string;
};

export default function ProjectGalleryCarousel({
  slides,
  prevLabel,
  nextLabel,
  regionLabel,
}: Props) {
  const n = slides.length;
  const [index, setIndex] = useState(0);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
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

  return (
    <div
      className="project-gallery relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_10px_40px_rgba(2,8,26,0.55)]"
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
          {slides.map((slide, i) => (
            <div
              key={slide.src}
              className="relative h-full shrink-0"
              style={{ width: `${slidePct}%` }}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover"
                sizes="(max-width: 900px) 100vw, 800px"
                priority={i === 0}
                draggable={false}
              />
            </div>
          ))}
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
  );
}
