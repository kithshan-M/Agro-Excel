"use client";

import { useT } from "@/i18n/context";
import { Link } from "@/components/ui/link";
import { seasonLinks } from "@/data/home";
import { seasons } from "@/data/seeds";
import { useMonth } from "@/lib/month";

const names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** The season in the visitor's month, and what to get ready. */
export function ThisMonth() {
  const t = useT();
  const month = useMonth();
  const index = seasons.findIndex((item) => item.months.includes(month));
  const season = seasons[index];
  const next = seasons[1 - index];
  // Months left, counting this one, before the other season starts.
  const left = next ? (next.months[0] - month + 12) % 12 : 0;

  return (
    <div
      className={`flex min-h-112 flex-col rounded-lg p-6 sm:p-8 ${index === 1 ? "bg-sun text-ink" : "bg-leaf text-white"}`}
    >
      {season ? (
        <div className="enter flex flex-1 flex-col">
          <p className="font-semibold">{t("It is {month}", { month: t(names[month - 1]) })}</p>
          <h3 className="mt-1 text-3xl font-bold tracking-tight">{t("{season} season", { season: t(season.name) })}</h3>
          <p className="mt-1">{t(season.span)}</p>
          <div aria-hidden="true" className="mt-5 grid grid-cols-6 gap-1.5">
            {season.months.map((item) => (
              <span
                key={item}
                className={`h-2 rounded-full bg-current ${season.months.indexOf(item) <= season.months.indexOf(month) ? "" : "opacity-30"}`}
              />
            ))}
          </div>
          <p className="mt-5 leading-relaxed">{t(season.text)}</p>
          <p className="mt-5 font-semibold">{t("Get ready")}</p>
          <ul className="mt-2 mb-6 space-y-2">
            {season.ready.map((item) => (
              <li key={item} className="flex gap-3">
                <svg
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                  className="mt-1 size-4 shrink-0 fill-none stroke-current stroke-[3]"
                >
                  <path d="m3 10.5 4.5 4.5L17 5" />
                </svg>
                {t(item)}
              </li>
            ))}
          </ul>
          <p className="mb-4 border-t border-current/25 pt-4">
            {t(left === 1 ? "{season} starts next month." : "{season} starts in {count} months.", { season: t(next.name), count: left })}
          </p>
          <ul className="mt-auto flex flex-wrap gap-x-6 gap-y-1">
            {[{ href: "/seeds#seasons", label: "When to plant" }, ...(seasonLinks[season.name] ?? [])].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4"
                >
                  {t(link.label)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <Link href="/seeds#seasons" className="mt-auto font-semibold underline underline-offset-4">
          {t("When to plant")}
        </Link>
      )}
    </div>
  );
}
