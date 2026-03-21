"use client";

import { FaEnvelope, FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { CONTACT_EMAIL, SOCIAL_LINKS } from "../config/social";

const linkClass = "hero-social-link";

const iconClass = "h-[1.25rem] w-[1.25rem]";

export default function HeroSocialLinks() {
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Contact portfolio")}`;

  return (
    <div
      className="hero-social flex flex-wrap justify-center gap-3 sm:gap-3.5"
      role="navigation"
      aria-label="Liens sociaux et contact"
    >
      <a
        href={SOCIAL_LINKS.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
        aria-label="LinkedIn"
      >
        <FaLinkedinIn className={iconClass} aria-hidden />
      </a>
      <a href={mailto} className={linkClass} aria-label="Email">
        <FaEnvelope className={iconClass} aria-hidden />
      </a>
      <a
        href={SOCIAL_LINKS.github}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
        aria-label="GitHub"
      >
        <FaGithub className={iconClass} aria-hidden />
      </a>
    </div>
  );
}
