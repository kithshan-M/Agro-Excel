"use client";

import { useLang, usePath, useT } from "@/i18n/context";
import { langNames, langs, localHref } from "@/i18n/translate";

/** Shorter names for small phones. Tamil is short enough as it is. */
const shortNames = { en: "EN", si: "සිං", ta: "தமிழ்" };

/** Links to the same page in the other languages, keeping filters and the section in the address. */
export function LanguageSwitch({
  className = "",
  linkClassName = "",
  compact = false,
}: {
  className?: string;
  linkClassName?: string;
  /** Shorter on phones, for the header. */
  compact?: boolean;
}) {
  const t = useT();
  const lang = useLang();
  const path = usePath();
  const others = langs.filter((each) => each !== lang);

  return (
    <div role="group" aria-label={t("Language")} className={`flex items-center ${className}`}>
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={`size-5 shrink-0 fill-none stroke-current stroke-[1.7] ${compact ? "max-[30rem]:hidden" : ""}`}
      >
        <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0c2.500-2.400 3.800-5.400 3.800-9S14.500 5.400 12 3m0 18c-2.500-2.400-3.800-5.400-3.800-9S9.500 5.400 12 3M3.500 9h17m-17 6h17" />
      </svg>
      {others.map((other) => (
        // A plain link: each language has its own layout, so the page loads afresh.
        <a
          key={other}
          href={localHref(other, path)}
          hrefLang={other}
          lang={other}
          aria-label={langNames[other]}
          onClick={(event) => {
            event.currentTarget.href =
              localHref(other, path) + window.location.search + window.location.hash;
          }}
          className={`flex min-h-11 items-center font-semibold whitespace-nowrap transition-colors ${linkClassName}`}
        >
          {compact && shortNames[other] !== langNames[other] ? (
            <>
              <span className="max-[30rem]:hidden">{langNames[other]}</span>
              <span className="min-[30rem]:hidden">{shortNames[other]}</span>
            </>
          ) : (
            langNames[other]
          )}
        </a>
      ))}
    </div>
  );
}
