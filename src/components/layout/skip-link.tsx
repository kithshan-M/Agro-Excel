"use client";

import { useT } from "@/i18n/context";

export function SkipLink() {
  const t = useT();
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-30 focus:bg-leaf-dark focus:px-4 focus:py-2 focus:text-white"
    >
      {t("Skip to content")}
    </a>
  );
}
