"use client";

import { useT } from "@/i18n/context";
import { SectionLink } from "@/components/ui/section-link";
import { useSeedList } from "@/lib/seed-list";

/** Appears once the visitor has added seeds, so the list is one tap away. */
export function SeedListLink() {
  const t = useT();
  const count = Object.keys(useSeedList()).length;
  if (count === 0) return null;

  return (
    <SectionLink
      href="/seeds#list"
      aria-label={t("Your seed list, seeds: {count}", { count })}
      title={t("Your seed list")}
      className="enter relative flex size-11 items-center justify-center rounded-md text-leaf-dark transition-colors hover:bg-film"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="size-6 fill-none stroke-current stroke-[1.9] [stroke-linecap:round] [stroke-linejoin:round]"
      >
        <path d="M6 3h12v18H6V3Zm0 4h12M12 17c0-3 1.6-5 4-5 0 3-1.6 5-4 5Zm0 0c0-2.2-1.2-3.6-3-3.6 0 2.2 1.2 3.6 3 3.6Z" />
      </svg>
      <span
        key={count}
        aria-hidden="true"
        className="enter absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-sun px-1 text-xs font-bold text-ink"
      >
        {count}
      </span>
    </SectionLink>
  );
}
