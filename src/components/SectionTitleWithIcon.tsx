import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

type Props = {
  id?: string;
  icon: LucideIcon;
  children: ReactNode;
};

export default function SectionTitleWithIcon({
  id,
  icon: Icon,
  children,
}: Props) {
  return (
    <h2
      id={id}
      className="flex items-center justify-center gap-3 text-3xl font-bold tracking-tight text-[var(--color-text)] md:gap-3.5 md:text-4xl"
    >
      <Icon
        className="h-8 w-8 shrink-0 text-[rgb(var(--primary))] md:h-9 md:w-9"
        strokeWidth={2}
        aria-hidden
      />
      <span>{children}</span>
    </h2>
  );
}
