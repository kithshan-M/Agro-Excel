"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useLang, usePath, useT } from "@/i18n/context";
import { langNames, langs, localHref, type Lang } from "@/i18n/translate";

/** Shorter names for phones. Tamil is short enough as it is. */
const shortNames = { en: "EN", si: "සිං", ta: "தமிழ்" };

/** Goes to the same page in another language, keeping filters and the section from the address bar. */
function keepPlace(lang: Lang, path: string) {
  return (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.currentTarget.href = localHref(lang, path) + window.location.search + window.location.hash;
  };
}

/** Where the menu sits changes its colours, its size and which way the list opens. */
const looks = {
  // Tight on phones: a short name, and below 400px only the globe.
  header: {
    button: "px-2 text-leaf-dark hover:bg-film max-[30rem]:px-1.5 max-[25rem]:gap-1 max-[25rem]:px-1",
    open: "bg-film",
    list: "top-full right-0 mt-1.5",
    shift: "-translate-y-1",
  },
  // The phone menu: roomy, and opens upwards so it is never cut off at the bottom.
  menu: {
    button: "px-3 text-lg text-leaf hover:bg-film",
    open: "bg-film",
    list: "bottom-full left-0 mb-1.5",
    shift: "translate-y-1",
  },
  // The dark footer at the very end of the page, so the list opens upwards.
  footer: {
    button: "-ml-2 px-2 text-white hover:bg-white/10",
    open: "bg-white/10",
    list: "bottom-full left-0 mb-1.5",
    shift: "translate-y-1",
  },
};

/** One button showing the language in use, opening a list of all of them. */
export function LanguageMenu({
  place = "header",
  className = "",
}: {
  place?: keyof typeof looks;
  className?: string;
}) {
  const t = useT();
  const lang = useLang();
  const path = usePath();
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const listId = useId();
  const look = looks[place];
  const compact = place === "header";

  // Closes on a click elsewhere, or on Escape.
  useEffect(() => {
    if (!open) return;
    const away = (event: PointerEvent) => {
      if (!box.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      // Only the list closes, not the phone menu around it.
      event.preventDefault();
      setOpen(false);
      button.current?.focus();
    };
    document.addEventListener("pointerdown", away);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", away);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);

  return (
    <div
      ref={box}
      className={`relative ${className}`}
      // Closes when the keyboard moves on past the list.
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`${t("Language")}: ${langNames[lang]}`}
        onClick={() => setOpen(!open)}
        className={`flex min-h-11 cursor-pointer items-center gap-1.5 rounded-md font-semibold whitespace-nowrap transition-colors ${look.button} ${open ? look.open : ""}`}
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
            {/* The label above still names the language when only the globe shows. */}
            <span className="max-[30rem]:hidden">{langNames[lang]}</span>
            <span className="max-[25rem]:hidden min-[30rem]:hidden">{shortNames[lang]}</span>
          </>
        ) : (
          langNames[lang]
        )}
        <svg
          viewBox="0 0 20 20"
          aria-hidden="true"
          className={`size-4 shrink-0 fill-none stroke-current stroke-2 transition-transform duration-200 motion-reduce:transition-none ${open === (place === "header") ? "rotate-180" : ""}`}
        >
          <path d="m5 7.500 5 5 5-5" />
        </svg>
      </button>

      <ul
        id={listId}
        className={`absolute z-20 min-w-44 rounded-lg border border-line bg-white p-1.5 text-base shadow-lg transition duration-150 motion-reduce:transition-none ${look.list} ${open ? "visible translate-y-0 opacity-100" : `invisible opacity-0 ${look.shift}`}`}
      >
        {langs.map((each) => {
          const current = each === lang;
          return (
            <li key={each}>
              {/* A plain link: each language has its own layout, so the page loads afresh. */}
              <a
                href={localHref(each, path)}
                hrefLang={each}
                lang={each}
                aria-current={current ? "true" : undefined}
                onClick={
                  current
                    ? (event) => {
                        event.preventDefault();
                        setOpen(false);
                      }
                    : keepPlace(each, path)
                }
                className={`flex min-h-11 items-center justify-between gap-4 rounded-md px-3 font-semibold whitespace-nowrap transition-colors hover:bg-film ${current ? "text-leaf" : "text-ink"}`}
              >
                {langNames[each]}
                {current && (
                  <svg
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    className="size-4 shrink-0 fill-none stroke-current stroke-[2.5]"
                  >
                    <path d="m4.500 10.500 3.500 3.500 7.500-8" />
                  </svg>
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
