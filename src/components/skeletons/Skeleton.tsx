interface SkeletonProps {
  width?: string;
  height?: string;
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
}

const roundedClasses = {
  none: "",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

/**
 * Placeholder de chargement (shimmer) — utilisé par `app/[locale]/loading.tsx`.
 */
export default function Skeleton({
  width = "w-full",
  height = "h-4",
  rounded = "md",
  className = "",
}: SkeletonProps) {
  return (
    <div
      className={`skeleton-block ${roundedClasses[rounded]} ${width} ${height} ${className}`.trim()}
      aria-hidden
    />
  );
}
