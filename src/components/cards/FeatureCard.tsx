import React from "react";
import Card from "./Card";

interface FeatureCardProps {
  title: string;
  body: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

/**
 * Composant de carte de fonctionnalité réutilisable.
 * Memoïsé pour éviter les re-renders inutiles dans les listes (.map).
 */
const FeatureCard: React.FC<FeatureCardProps> = React.memo(
  ({ title, body, className = "", icon }) => {
    return (
      <Card className={`text-center ${className}`.trim()}>
        {icon && (
          <div className="mb-3 flex min-h-[2.25rem] items-center justify-center [&_img]:max-h-10 [&_img]:w-auto [&_img]:max-w-[min(100%,11rem)] [&_img]:object-contain">
            {icon}
          </div>
        )}
        <h3
          className="text-xl font-semibold mb-2 text-balance"
          style={{ color: "var(--text)" }}
        >
          {title}
        </h3>
        <p className="text-balance" style={{ color: "var(--muted)" }}>
          {body}
        </p>
      </Card>
    );
  },
);

FeatureCard.displayName = "FeatureCard";

export default FeatureCard;
