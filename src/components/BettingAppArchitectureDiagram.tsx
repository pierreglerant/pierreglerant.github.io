import type { Locale } from "../i18n/config";

export default function BettingAppArchitectureDiagram({
  locale,
}: {
  locale: Locale;
}) {
  const isFr = locale === "fr";

  return (
    <div
      className="mt-4 w-full min-w-0 md:mt-12"
      role="group"
      aria-label={
        isFr
          ? "Architecture en oignon de l'application de paris"
          : "Onion architecture of the betting app"
      }
    >
      <div className="overflow-x-auto pb-1 [scrollbar-width:thin]">
        <div className="mx-auto min-w-[min(100%,22rem)] max-w-5xl pb-3 md:min-w-0">
          <div className="mx-auto flex w-full max-w-[min(100%,28rem)] flex-col items-center sm:max-w-[32rem] md:max-w-[36rem] lg:max-w-[40rem]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 420 500"
              className="h-auto w-full max-w-[28rem] text-slate-200 sm:max-w-[32rem] md:max-w-[36rem] lg:max-w-[40rem]"
              role="img"
              aria-labelledby="betting-onion-title"
            >
              <title id="betting-onion-title">
                {isFr
                  ? "Schéma onion : Domain, Application, Presentation, Infrastructure"
                  : "Onion diagram: Domain, Application, Presentation, Infrastructure"}
              </title>
              <defs>
                <clipPath id="betting-onion-top">
                  <rect x="0" y="0" width="420" height="210" />
                </clipPath>
                <clipPath id="betting-onion-bot">
                  <rect x="0" y="210" width="420" height="230" />
                </clipPath>
              </defs>

              <g transform="translate(0 28)">
                <circle
                  cx="210"
                  cy="210"
                  r="200"
                  fill="#0b1120"
                  stroke="#253448"
                  strokeWidth="2"
                />

                <g clipPath="url(#betting-onion-top)">
                  <circle
                    cx="210"
                    cy="210"
                    r="169"
                    fill="none"
                    stroke="#546b8f"
                    strokeWidth="54"
                    opacity="0.92"
                  />
                </g>
                <g clipPath="url(#betting-onion-bot)">
                  <circle
                    cx="210"
                    cy="210"
                    r="169"
                    fill="none"
                    stroke="#0c6fa3"
                    strokeWidth="54"
                    opacity="0.92"
                  />
                </g>

                <circle
                  cx="210"
                  cy="210"
                  r="106"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="46"
                  opacity="0.9"
                />

                <circle cx="210" cy="210" r="70" fill="#172554" />
                <text
                  x="210"
                  y="200"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="13.5"
                  fontWeight="700"
                  fontFamily="ui-sans-serif, system-ui, sans-serif"
                >
                  Domain
                </text>
                <text
                  x="210"
                  y="216"
                  textAnchor="middle"
                  fill="#93c5fd"
                  fontSize="8.5"
                  fontFamily="ui-monospace, monospace"
                >
                  entities · repositories
                </text>

                <text
                  x="210"
                  y="102"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="9.5"
                  fontWeight="600"
                  fontFamily="ui-sans-serif, system-ui, sans-serif"
                >
                  Application
                </text>
                <text
                  x="210"
                  y="118"
                  textAnchor="middle"
                  fill="#bfdbfe"
                  fontSize="8.2"
                  fontFamily="ui-monospace, monospace"
                >
                  usecases
                </text>

                <text
                  x="210"
                  y="38"
                  textAnchor="middle"
                  fill="#f1f5f9"
                  fontSize="11.2"
                  fontWeight="600"
                  fontFamily="ui-sans-serif, system-ui, sans-serif"
                >
                  Presentation
                </text>
                <text
                  x="210"
                  y="54"
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize="8.2"
                  fontFamily="ui-monospace, monospace"
                >
                  hooks · screens
                </text>
                <text
                  x="210"
                  y="366"
                  textAnchor="middle"
                  fill="#e0f2fe"
                  fontSize="11.2"
                  fontWeight="600"
                  fontFamily="ui-sans-serif, system-ui, sans-serif"
                >
                  Infrastructure
                </text>
                <text
                  x="210"
                  y="382"
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize="7.6"
                  fontFamily="ui-monospace, monospace"
                >
                  API · DAO · mappers · repositories
                </text>
                <text
                  x="210"
                  y="395"
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize="7.6"
                  fontFamily="ui-monospace, monospace"
                >
                  notifications · storage
                </text>
              </g>

              <g aria-label="Expo Router app root">
                <rect
                  x="115"
                  y="0"
                  width="190"
                  height="26"
                  rx="5"
                  fill="#151d2f"
                  stroke="#3b82f6"
                  strokeOpacity="0.65"
                  strokeWidth="1"
                />
                <text
                  x="210"
                  y="16.5"
                  textAnchor="middle"
                  fill="#dbeafe"
                  fontSize="9.2"
                  fontWeight="600"
                  fontFamily="ui-monospace, monospace"
                >
                  Expo · app/
                </text>
              </g>

              <g aria-label="Supabase backend root">
                <rect
                  x="108"
                  y="460"
                  width="204"
                  height="28"
                  rx="5"
                  fill="#151d2f"
                  stroke="#0c6fa3"
                  strokeOpacity="0.75"
                  strokeWidth="1"
                />
                <text
                  x="210"
                  y="476"
                  textAnchor="middle"
                  fill="#bae6fd"
                  fontSize="9.2"
                  fontWeight="600"
                  fontFamily="ui-sans-serif, system-ui, sans-serif"
                >
                  Backend · Supabase
                </text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
