import { getTranslation } from "../i18n/server";
import type { Locale } from "../i18n/config";
import { FlowDown, LayerCard, VLine } from "./ArchitectureDiagramPrimitives";

const TK = "projects.architecture.immosphere" as const;

function parseServiceLines(raw: string): { title: string; meta: string }[] {
  return raw
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const i = line.indexOf("|");
      if (i <= 0) return { title: line, meta: "" };
      return {
        title: line.slice(0, i).trim(),
        meta: line.slice(i + 1).trim(),
      };
    });
}

export default function ImmoSphereArchitectureDiagram({
  locale,
}: {
  locale: Locale;
}) {
  const t = getTranslation(locale);
  const services = parseServiceLines(t(`${TK}.serviceLines`));

  return (
    <div
      className="immosphere-architecture w-full min-w-0"
      role="group"
      aria-label={t(`${TK}.diagramAria`)}
    >
      <div className="overflow-x-auto pb-0.5 [scrollbar-width:thin]">
        <div className="mx-auto min-w-[min(100%,32rem)] max-w-4xl space-y-0 md:min-w-0">
          <LayerCard
            title={t(`${TK}.frontendTitle`)}
            subtitle={t(`${TK}.frontendMeta`)}
          />
          <p className="mt-1.5 text-center text-[0.65rem] leading-snug text-[var(--color-text-muted)] md:text-[0.7rem]">
            {t(`${TK}.directTilesNote`)}
          </p>

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

          <div className="flex flex-col items-center gap-0.5 pt-1.5">
            <FlowDown />
            <VLine className="h-3" />
          </div>

          <p className="pb-1.5 text-center text-[0.65rem] font-medium uppercase tracking-wider text-[var(--color-text-muted)] md:text-[0.7rem]">
            {t(`${TK}.microservicesLabel`)}
          </p>

          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 md:grid-cols-3 md:gap-2">
            {services.map((svc) => (
              <LayerCard
                key={svc.title}
                title={svc.title}
                subtitle={svc.meta || undefined}
                className="text-left sm:text-center"
              />
            ))}
          </div>

          <div className="flex flex-col items-center gap-0.5 pt-2">
            <FlowDown />
            <VLine className="h-5 md:h-6" />
          </div>

          <LayerCard
            className="mt-0.5"
            title={t(`${TK}.postgresTitle`)}
            subtitle={t(`${TK}.postgresMeta`)}
            variant="database"
          />
        </div>
      </div>
    </div>
  );
}
