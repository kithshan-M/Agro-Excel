"use client";

import NextLink from "next/link";
import { useHref } from "@/i18n/context";

/** Link that stays in the language on show. */
export function Link({
  href,
  ...props
}: { href: string } & Omit<React.ComponentProps<typeof NextLink>, "href">) {
  const to = useHref();
  return <NextLink href={to(href)} {...props} />;
}
