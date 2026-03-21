"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { Card } from "./cards";

const CV_SRC = "/cv/cv-preview.png";
const CV_WIDTH = 715;
const CV_HEIGHT = 922;

type CvPreviewLightboxProps = {
  previewAlt: string;
  openViewerLabel: string;
  closeLabel: string;
};

export default function CvPreviewLightbox({
  previewAlt,
  openViewerLabel,
  closeLabel,
}: CvPreviewLightboxProps) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  const overlay =
    open && mounted ? (
      <div
        className="cv-lightbox-backdrop fixed inset-0 z-[10000] flex items-center justify-center bg-[var(--color-overlay)] p-3 backdrop-blur-sm sm:p-6"
        role="presentation"
        onClick={close}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            close();
          }}
          className="fixed right-3 top-3 z-[10001] flex h-11 w-11 items-center justify-center rounded-xl border border-[rgba(255,255,255,0.12)] bg-[rgba(5,10,24,0.92)] text-[var(--color-text)] shadow-lg backdrop-blur-md transition-colors hover:bg-[var(--color-surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--primary))] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
          aria-label={closeLabel}
        >
          <X className="h-5 w-5 shrink-0" aria-hidden />
        </button>
        <div
          role="dialog"
          aria-modal="true"
          aria-label={previewAlt}
          className="flex max-h-[100dvh] max-w-full cursor-zoom-in items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={CV_SRC}
            alt=""
            width={CV_WIDTH}
            height={CV_HEIGHT}
            className="block h-auto max-h-[min(95dvh,922px)] w-auto max-w-[min(100vw-1.5rem,715px)] cursor-zoom-in object-contain"
            sizes="100vw"
            priority
          />
        </div>
      </div>
    ) : null;

  return (
    <>
      <button
        type="button"
        className="about-resume-preview-trigger mt-5 w-full cursor-zoom-in rounded-2xl border-0 bg-transparent p-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--primary))] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={openViewerLabel}
      >
        <Card disableHover className="about-resume-preview-card overflow-hidden">
          <Image
            src={CV_SRC}
            alt={previewAlt}
            width={CV_WIDTH}
            height={CV_HEIGHT}
            className="block h-auto w-full max-w-full"
            sizes="(max-width: 768px) 100vw, 672px"
          />
        </Card>
      </button>
      {mounted && overlay ? createPortal(overlay, document.body) : null}
    </>
  );
}
