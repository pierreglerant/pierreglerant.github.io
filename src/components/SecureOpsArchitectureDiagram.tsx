import { getTranslation } from "../i18n/server";
import type { Locale } from "../i18n/config";
import { FlowDown, LayerCard, VLine } from "./ArchitectureDiagramPrimitives";

const TK = "projects.architecture.secureops" as const;

export default function SecureOpsArchitectureDiagram({
  locale,
}: {
  locale: Locale;
}) {
  const t = getTranslation(locale);

  return (
    <div
      className="secureops-architecture w-full min-w-0"
      role="group"
      aria-label={t(`${TK}.diagramAria`)}
    >
      <div className="overflow-x-auto pb-0.5 [scrollbar-width:thin]">
        <div className="mx-auto min-w-[min(100%,32rem)] max-w-3xl space-y-0 md:min-w-0">
          <LayerCard
            title={t(`${TK}.frontendTitle`)}
            subtitle={t(`${TK}.frontendMeta`)}
          />

          <div className="flex flex-col items-center py-1.5 md:py-2">
            <p className="mb-1 text-center text-[0.65rem] font-medium uppercase tracking-wider text-[var(--color-text-muted)] md:text-[0.7rem]">
              {t(`${TK}.httpsLabel`)}
            </p>
            <VLine className="h-4 md:h-5" />
          </div>

          <LayerCard
            title={t(`${TK}.gatewayTitle`)}
            subtitle={t(`${TK}.gatewayMeta`)}
          />

          {/* Flèches gateway → chaque service */}
          <div className="flex flex-row gap-1.5 pt-1 md:gap-2.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-1 flex-col items-center gap-0.5"
              >
                <FlowDown />
                <VLine className="h-3" />
              </div>
            ))}
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

          {/* Services → couche suivante (pas de lien sous pdf-service) */}
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
            <div className="flex flex-1" aria-hidden />
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
    </div>
  );
}
