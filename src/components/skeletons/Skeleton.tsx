"use client";

import React from "react";

interface SkeletonProps {
  width?: string;
  height?: string;
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  className?: string;
}

const roundedClasses = {
  none: "",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

/**
 * Bloc skeleton avec animation pulse (chargement Next.js `loading.tsx`).
 */
const Skeleton: React.FC<SkeletonProps> = ({
  width = "w-full",
  height = "h-4",
  rounded = "md",
  className = "",
}) => {
  return (
    <div
      className={`animate-pulse bg-[var(--color-surface-hover)] ${roundedClasses[rounded]} ${width} ${height} ${className}`}
    />
  );
};

export default Skeleton;
