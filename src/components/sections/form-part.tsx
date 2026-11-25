"use client";

import { useT } from "@/i18n/context";
/** Numbered heading inside a long form. */
export function FormPart({ number, title }: { number: number; title: string }) {
  const t = useT();
  return (
    <h3 className="flex items-center gap-3 border-t border-line pt-7 text-xl font-semibold first:border-t-0 first:pt-0">
      <span
        aria-hidden="true"
        className="flex size-8 shrink-0 items-center justify-center rounded-full bg-leaf text-base font-bold text-white"
      >
        {number}
      </span>
      {t(title)}
    </h3>
  );
}
