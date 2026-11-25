"use client";

import { useHref, useT, useWhatsapp } from "@/i18n/context";
import { SectionHeading } from "@/components/sections/section-heading";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { seasons } from "@/data/seeds";
import { useMonth } from "@/lib/month";
import { step } from "@/lib/motion";

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// The year starts with Maha so each season is one unbroken run.
const year = seasons.flatMap((season, s) =>
  season.months.map((month) => ({ month, season: s })),
);

/** Months until a season starts: 0 while it is on, and null before the month is known. */
function wait(season: (typeof seasons)[number], month: number) {
  if (!month) return null;
  return season.months.includes(month) ? 0 : (season.months[0] - month + 12) % 12;
}

export function SeasonCalendar() {
  const t = useT();
  const month = useMonth();
  const to = useHref();
  const whatsappLink = useWhatsapp();

  return (
    <section id="seasons" className="scroll-mt-4 py-16 md:py-24">
      <Container>
        <SectionHeading
          title={t("When to plant")}
          text={t("Sri Lanka has two main growing seasons. The best weeks depend on your area and crop, so ask us before you sow.")}
        />
        <Reveal className="mt-10">
          <ol aria-hidden="true" className="grid grid-cols-6 gap-1.5 md:grid-cols-12">
            {year.map(({ month: item, season }, index) => (
              <li
                key={item}
                style={step(index)}
                className={`reveal-pop relative flex min-h-16 flex-col items-center justify-center rounded-md font-semibold ${season === 0 ? "bg-leaf text-white" : "bg-sun"} ${item === month ? "outline-3 outline-offset-2 outline-ink" : ""}`}
              >
                {t(monthNames[item - 1])}
                {item === month && <span className="text-sm leading-tight">{t("Now")}</span>}
              </li>
            ))}
          </ol>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {seasons.map((season, index) => {
              const left = wait(season, month);
              const link = whatsappLink("seeds for the {season} season", { season: t(season.name) });
              return (
                <div
                  key={season.name}
                  style={step(index * 6 + 3)}
                  className={`reveal-up flex flex-col rounded-lg border-t-8 bg-white p-6 sm:p-8 ${index === 0 ? "border-leaf" : "border-sun"}`}
                >
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <h3 className="text-2xl font-semibold sm:text-3xl">{t(season.name)}</h3>
                    {left !== null && (
                      <span
                        className={`rounded px-2.5 py-1 text-sm font-semibold ${left === 0 ? "bg-ink text-white" : "bg-film"}`}
                      >
                        {t(left === 0 ? "Now" : left === 1 ? "Starts next month" : "Starts in {count} months", { count: left })}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 font-semibold">{t(season.span)}</p>
                  <p className="mt-2 text-lg leading-relaxed text-muted">{t(season.text)}</p>
                  <p className="mt-5 font-semibold">{t("Get ready")}</p>
                  <ul className="mt-2 mb-6 space-y-2">
                    {season.ready.map((item) => (
                      <li key={item} className="flex gap-3">
                        <svg
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                          className="mt-1 size-4 shrink-0 fill-none stroke-leaf stroke-[3]"
                        >
                          <path d="m3 10.5 4.5 4.5L17 5" />
                        </svg>
                        {t(item)}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={link ?? to("/contact")}
                    {...(link && { target: "_blank", rel: "noopener noreferrer" })}
                    className="mt-auto inline-flex min-h-12 items-center self-start rounded-md border border-leaf px-6 font-semibold text-leaf transition-colors hover:bg-leaf hover:text-white"
                  >
                    {t("Ask what to sow for {season}", { season: t(season.name) })}
                  </a>
                </div>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
