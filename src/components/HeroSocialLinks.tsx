"use client";

import { FaEnvelope, FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { CONTACT_EMAIL, SOCIAL_LINKS } from "../config/social";

const btnClass =
  "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[var(--color-border)] bg-transparent text-[var(--color-text)] transition-colors hover:bg-[var(--color-surface)] hover:border-[var(--color-text-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--primary))] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]";

const iconClass = "h-[1.25rem] w-[1.25rem]";

export default function HeroSocialLinks() {
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Contact portfolio")}`;

  return (
    <div
      className="hero-social flex flex-wrap justify-center gap-2 sm:gap-2.5"
      role="navigation"
      aria-label="Liens sociaux et contact"
    >
      <a
        href={SOCIAL_LINKS.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className={btnClass}
        aria-label="LinkedIn"
      >
        <FaLinkedinIn className={iconClass} aria-hidden />
      </a>
      <a href={mailto} className={btnClass} aria-label="Email">
        <FaEnvelope className={iconClass} aria-hidden />
      </a>
      <a
        href={SOCIAL_LINKS.github}
        target="_blank"
        rel="noopener noreferrer"
        className={btnClass}
        aria-label="GitHub"
      >
        <FaGithub className={iconClass} aria-hidden />
      </a>
    </div>
  );
}
