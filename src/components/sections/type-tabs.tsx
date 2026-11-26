"use client";

import { useT } from "@/i18n/context";
import Image from "next/image";
import { useRef } from "react";
import { Reveal } from "@/components/ui/reveal";

const tones = { water: "bg-water text-white", leaf: "bg-leaf text-white" };

/** Pictures to choose from, with one panel shown at a time. Arrow keys work too. */
export function TypeTabs({
  id,
  label,
  items,
  active,
  onChange,
  tone,
  children,
}: {
  /** Different on every page. */
  id: string;
  label: string;
  items: {
    key: string;
    name: string;
    /** For the narrow tabs on phones. */
    short?: string;
    image: string;
    badge?: string;
    /** Makes the badge stand out. */
    best?: boolean;
  }[];
  active: number;
  onChange: (index: number) => void;
  tone: keyof typeof tones;
  /** One panel per item, in the same order. */
  children: React.ReactNode[];
}) {
  const t = useT();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: React.KeyboardEvent) {
    const last = items.length - 1;
    const move: Record<string, number> = {
      ArrowRight: active === last ? 0 : active + 1,
      ArrowDown: active === last ? 0 : active + 1,
      ArrowLeft: active === 0 ? last : active - 1,
      ArrowUp: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    };
    const next = move[event.key];
    if (next === undefined) return;
    event.preventDefault();
    onChange(next);
    tabs.current[next]?.focus();
  }

  return (
    <Reveal className="reveal-up overflow-hidden rounded-lg border border-line bg-white lg:grid lg:grid-cols-[17.5rem_1fr]">
      <div
        role="tablist"
        aria-label={t(label)}
        onKeyDown={onKeyDown}
        className="grid grid-cols-4 border-b border-line max-[30rem]:[&:lang(ta)]:grid-cols-2 max-[22.5rem]:[&:lang(si)]:grid-cols-2 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-4 lg:border-r lg:border-b-0"
      >
        {items.map((item, index) => {
          const chosen = active === index;
          return (
            <button
              key={item.key}
              ref={(element) => {
                tabs.current[index] = element;
              }}
              type="button"
              role="tab"
              id={`${id}-tab-${item.key}`}
              aria-selected={chosen}
              aria-controls={`${id}-panel-${item.key}`}
              tabIndex={chosen ? 0 : -1}
              onClick={() => onChange(index)}
              className={`flex cursor-pointer flex-col items-start gap-2 border-line p-2 text-left transition-colors -outline-offset-2 not-first:border-l max-[30rem]:[&:lang(ta)]:nth-3:border-l-0 max-[30rem]:[&:lang(ta)]:nth-[n+3]:border-t max-[22.5rem]:[&:lang(si)]:nth-3:border-l-0 max-[22.5rem]:[&:lang(si)]:nth-[n+3]:border-t sm:flex-row sm:items-center sm:gap-4 sm:border-l-0! sm:p-4 sm:even:border-l! sm:nth-[n+3]:border-t lg:p-5 lg:even:border-l-0! lg:not-first:border-t ${chosen ? tones[tone] : "hover:bg-paper"}`}
            >
              <Image
                src={item.image}
                alt=""
                width={88}
                height={64}
                unoptimized
                className="h-12 w-full shrink-0 rounded object-cover sm:h-16 sm:w-22"
              />
              <span className="min-w-0">
                <span className="block font-display text-sm leading-tight font-semibold sm:text-lg">
                  {item.short ? (
                    <>
                      <span className="sm:hidden">{t(item.short)}</span>
                      <span className="max-sm:hidden">{t(item.name)}</span>
                    </>
                  ) : (
                    t(item.name)
                  )}
                </span>
                {item.badge && (
                  <span
                    className={`mt-1.5 inline-block rounded px-1.5 py-0.5 text-xs leading-tight font-semibold text-ink sm:px-2 sm:text-sm ${item.best ? "bg-sun" : "bg-film"}`}
                  >
                    {t(item.badge)}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
      {items.map((item, index) => (
        <div
          key={item.key}
          role="tabpanel"
          id={`${id}-panel-${item.key}`}
          aria-labelledby={`${id}-tab-${item.key}`}
          tabIndex={0}
          hidden={active !== index}
          className="-outline-offset-2"
        >
          {t(children[index])}
        </div>
      ))}
    </Reveal>
  );
}

/** Row of buttons that scrolls sideways on phones. */
export function ChipRow({
  title,
  items,
  chosen,
  onChoose,
}: {
  title: string;
  items: string[];
  chosen: string[];
  onChoose: (item: string) => void;
}) {
  const t = useT();
  return (
    <div role="group" aria-label={t(title)} className="sm:flex sm:items-baseline">
      <span aria-hidden="true" className="block shrink-0 text-muted sm:w-36">
        {t(title)}
      </span>
      {/* On phones the row scrolls sideways, and its right edge fades to show there is more. */}
      <div className="-mx-4 flex gap-2.5 overflow-x-auto px-4 py-1 [scrollbar-width:none] max-sm:pr-10 max-sm:[mask-image:linear-gradient(to_right,#000_calc(100%-2rem),transparent)] sm:mx-0 sm:flex-wrap sm:px-0">
        {items.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={chosen.includes(item)}
            onClick={() => onChoose(item)}
            className="min-h-11 shrink-0 cursor-pointer rounded-md border border-field bg-white px-4 font-medium whitespace-nowrap transition-colors hover:border-leaf aria-pressed:border-leaf aria-pressed:bg-leaf aria-pressed:text-white"
          >
            {t(item)}
          </button>
        ))}
      </div>
    </div>
  );
}
