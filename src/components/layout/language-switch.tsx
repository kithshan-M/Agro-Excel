"use client";

import { useLang, usePath } from "@/i18n/context";
import { localHref } from "@/i18n/translate";

/** Same page in the other language, keeping filters and the section in the address. */
export function LanguageSwitch({
  className = "",
  compact = false,
}: {
  className?: string;
  /** Shorter on phones, for the header. */
  compact?: boolean;
}) {
  const lang = useLang();
  const path = usePath();
  const other = lang === "en" ? "si" : "en";
  const name = other === "si" ? "සිංහල" : "English";

  return (
    // A plain link: each language has its own layout, so the page loads afresh.
    <a
      href={localHref(other, path)}
      hrefLang={other}
      lang={other}
      aria-label={name}
      onClick={(event) => {
        event.currentTarget.href =
          localHref(other, path) + window.location.search + window.location.hash;
      }}
      className={`flex min-h-11 items-center gap-2 font-semibold whitespace-nowrap transition-colors ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="size-5 shrink-0 fill-none stroke-current stroke-[1.7]"
      >
        <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0c2.500-2.400 3.800-5.400 3.800-9S14.500 5.400 12 3m0 18c-2.500-2.400-3.800-5.400-3.800-9S9.500 5.400 12 3M3.500 9h17m-17 6h17" />
      </svg>
      {compact ? (
        <>
          <span className={other === "si" ? "max-[375px]:hidden" : "max-[430px]:hidden"}>{name}</span>
          <span className={other === "si" ? "min-[376px]:hidden" : "min-[431px]:hidden"}>
            {other === "si" ? "සිං" : "EN"}
          </span>
        </>
      ) : (
        name
      )}
    </a>
  );
}
