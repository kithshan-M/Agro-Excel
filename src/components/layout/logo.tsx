"use client";

import { useT } from "@/i18n/context";
import { Link } from "@/components/ui/link";
import { siteConfig } from "@/config/site";

/** The mark matches the browser tab icon in src/app/icon.svg. */
export function Logo({ light = false, onClick }: { light?: boolean; onClick?: () => void }) {
  const t = useT();
  return (
    <Link
      href="/"
      onClick={onClick}
      className={`group flex min-h-11 items-center gap-2.5 font-display text-xl font-bold tracking-tight whitespace-nowrap max-[350px]:gap-1.5 max-[350px]:text-lg ${light ? "text-white" : "text-leaf-dark"}`}
    >
      <svg viewBox="0 0 32 32" aria-hidden="true" className="size-9 shrink-0">
        <rect
          width="32"
          height="32"
          rx="7"
          className={light ? "fill-white/15" : "fill-leaf"}
        />
        <path
          d="M6 25V17a10 10 0 0 1 20 0v8M16 25v-9"
          className="fill-none stroke-white stroke-[2.5] [stroke-linecap:round]"
        />
        <path
          d="M16 18c0-4 2.5-6 6-6 0 4-2.5 6-6 6Z"
          className="origin-[16px_18px] fill-sun transition-transform duration-300 group-hover:scale-125 motion-reduce:transition-none"
        />
      </svg>
      {t(siteConfig.name)}
    </Link>
  );
}
