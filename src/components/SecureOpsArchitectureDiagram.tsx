import type { ReactNode } from "react";
import { getTranslation } from "../i18n/server";
import type { Locale } from "../i18n/config";

const TK = "projects.architecture.secureops" as const;

function VLine({ className = "" }: { className?: string }) {
  return (
    <div
      className={`w-px shrink-0 rounded-full bg-gradient-to-b from-[rgba(var(--primary),0.5)] to-[rgba(var(--primary),0.12)] ${className}`}
      aria-hidden
    />
  );
}

function FlowDown() {
  return (
    <span
      className="select-none text-[10px] leading-none text-[rgb(var(--primary))] opacity-90"
      aria-hidden
    >
      ▼
    </span>
  );
}

function LayerCard({
  title,
  subtitle,
  extra,
  variant = "default",
  className = "",
}: {
  title: string;
  subtitle?: string;
  extra?: ReactNode;
  variant?: "default" | "worker" | "database";
  className?: string;
}) {
  const ring =
    variant === "worker"
      ? "border-[rgba(var(--primary),0.22)] bg-[var(--color-surface)]/35 shadow-[0_0_0_1px_rgba(var(--primary),0.08)_inset]"
      : variant === "database"
        ? "border-[rgba(var(--primary),0.28)] bg-[rgba(var(--primary),0.06)] shadow-[0_0_24px_-8px_rgba(var(--primary),0.35),inset_0_1px_0_rgba(255,255,255,0.07)]"
        : "border-[var(--color-border)] bg-[var(--color-surface)]/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]";

  return (
    <div
      className={`w-full min-w-0 rounded-xl border px-2.5 py-2 text-center md:px-3 md:py-2.5 ${ring} ${className}`}
    >
      <p className="text-[0.7rem] font-semibold leading-tight tracking-tight text-[var(--color-text)] text-balance md:text-xs">
        {title}
      </p>
      {subtitle ? (
        <p className="mt-1 text-[0.65rem] leading-snug text-balance text-[var(--color-text-muted)] md:text-[0.7rem]">
          {subtitle}
        </p>
      ) : null}
      {extra}
    </div>
  );
}

export default function SecureOpsArchitectureDiagram({
  locale,
}: {
  locale: Locale;
}) {
  const t = getTranslation(locale);

  return (
    <article
      className="secureops-architecture -mx-0.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)]/35 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] md:-mx-0 md:p-4"
      aria-label={t(`${TK}.diagramAria`)}
    >
      <div className="overflow-x-auto pb-0.5 [scrollbar-width:thin]">
        <div className="mx-auto min-w-[min(100%,32rem)] max-w-3xl space-y-0 md:min-w-0">
          <LayerCard
            title={t(`${TK}.frontendTitle`)}
            subtitle={t(`${TK}.frontendMeta`)}
          />

          <div className="flex flex-col items-center py-1.5 md:py-2">
            <p className="mb-1 text-center text-[0.6rem] font-medium uppercase tracking-wider text-[var(--color-text-muted)] md:text-[0.65rem]">
              {t(`${TK}.httpLabel`)}
            </p>
            <VLine className="h-4 md:h-5" />
          </div>

          <LayerCard
            title={t(`${TK}.gatewayTitle`)}
            subtitle={t(`${TK}.gatewayMeta`)}
            extra={
              <p className="mt-2 border-t border-[var(--color-border)] pt-2 text-center font-mono text-[0.6rem] leading-snug text-balance text-[var(--color-text-muted)] md:text-[0.65rem]">
                {t(`${TK}.gatewayRoutes`)}
              </p>
            }
          />

          <div className="flex flex-col items-center py-1.5 md:py-2">
            <VLine className="h-4 md:h-5" />
          </div>

          {/* Cinq services — pdf-service à droite */}
          <div className="flex flex-row gap-1.5 md:gap-2.5">
            <div className="min-w-0 flex-1">
              <LayerCard
                title={t(`${TK}.adminTitle`)}
                subtitle={t(`${TK}.adminMeta`)}
              />
            </div>
            <div className="min-w-0 flex-1">
              <LayerCard
                title={t(`${TK}.userTitle`)}
                subtitle={t(`${TK}.userMeta`)}
              />
            </div>
            <div className="min-w-0 flex-1">
              <LayerCard
                title={t(`${TK}.scanTitle`)}
                subtitle={t(`${TK}.scanMeta`)}
              />
            </div>
            <div className="min-w-0 flex-1">
              <LayerCard
                title={t(`${TK}.crawlTitle`)}
                subtitle={t(`${TK}.crawlMeta`)}
              />
            </div>
            <div className="min-w-0 flex-1">
              <LayerCard
                title={t(`${TK}.pdfTitle`)}
                subtitle={t(`${TK}.pdfMeta`)}
              />
            </div>
          </div>

          {/* Lien gateway → couche suivante */}
          <div className="flex flex-row gap-1.5 pt-1 md:gap-2.5">
            <div className="flex flex-1 justify-center">
              <VLine className="h-3" />
            </div>
            <div className="flex flex-1 justify-center">
              <VLine className="h-3" />
            </div>
            <div className="flex flex-1 justify-center">
              <VLine className="h-3" />
            </div>
            <div className="flex flex-1 justify-center">
              <VLine className="h-3" />
            </div>
            <div className="flex flex-1 justify-center">
              <VLine className="h-3" />
            </div>
          </div>

          {/* Pont : admin/user → DB ; workers scan/crawl ; pdf sans suite */}
          <div className="flex flex-row items-stretch gap-1.5 md:gap-2.5">
            <div className="flex min-h-[5.5rem] flex-1 flex-col items-center md:min-h-[6rem]">
              <VLine className="min-h-8 flex-1" />
            </div>
            <div className="flex min-h-[5.5rem] flex-1 flex-col items-center md:min-h-[6rem]">
              <VLine className="min-h-8 flex-1" />
            </div>
            <div className="flex min-h-[5.5rem] flex-1 flex-col items-center md:min-h-[6rem]">
              <VLine className="h-2 shrink-0" />
              <LayerCard
                title={t(`${TK}.scanWorkerTitle`)}
                subtitle={t(`${TK}.scanWorkerMeta`)}
                variant="worker"
              />
              <div className="flex min-h-0 flex-1 flex-col items-center justify-end pt-2">
                <VLine className="h-3 shrink-0" />
              </div>
            </div>
            <div className="flex min-h-[5.5rem] flex-1 flex-col items-center md:min-h-[6rem]">
              <VLine className="h-2 shrink-0" />
              <LayerCard
                title={t(`${TK}.crawlWorkerTitle`)}
                subtitle={t(`${TK}.crawlWorkerMeta`)}
                variant="worker"
              />
              <div className="flex min-h-0 flex-1 flex-col items-center justify-end pt-2">
                <VLine className="h-3 shrink-0" />
              </div>
            </div>
            <div
              className="flex min-h-[5.5rem] flex-1 md:min-h-[6rem]"
              aria-hidden
            />
          </div>

          {/* Quatre liaisons distinctes vers PostgreSQL (pas de fusion) — colonne pdf vide */}
          <div className="flex flex-row gap-1.5 md:gap-2.5">
            <div className="flex flex-1 flex-col items-center gap-1">
              <FlowDown />
              <VLine className="h-6 md:h-7" />
            </div>
            <div className="flex flex-1 flex-col items-center gap-1">
              <FlowDown />
              <VLine className="h-6 md:h-7" />
            </div>
            <div className="flex flex-1 flex-col items-center gap-1">
              <FlowDown />
              <VLine className="h-6 md:h-7" />
            </div>
            <div className="flex flex-1 flex-col items-center gap-1">
              <FlowDown />
              <VLine className="h-6 md:h-7" />
            </div>
            <div className="flex-1" aria-hidden />
          </div>

          <LayerCard
            className="mt-1"
            title={t(`${TK}.postgresTitle`)}
            subtitle={t(`${TK}.postgresMeta`)}
            variant="database"
          />
        </div>
      </div>
    </article>
  );
}
