"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import {
  CONTACT_EMAIL,
  SOCIAL_LINKS,
} from "../config/social";

const btnClass =
  "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[var(--color-border)] bg-transparent text-[var(--color-text)] transition-colors hover:bg-[var(--color-surface)] hover:border-[var(--color-text-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--primary))] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]";

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
        <Linkedin className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.75} />
      </a>
      <a href={mailto} className={btnClass} aria-label="Email">
        <Mail className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.75} />
      </a>
      <a
        href={SOCIAL_LINKS.github}
        target="_blank"
        rel="noopener noreferrer"
        className={btnClass}
        aria-label="GitHub"
      >
        <Github className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.75} />
      </a>
    </div>
  );
}
