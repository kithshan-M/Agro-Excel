"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Link to a page or to a section of one, such as "/seeds#list". A normal Link to
 * a section already in the address bar does nothing, so on the same page this
 * becomes a plain section link.
 */
export function SectionLink({
  href,
  children,
  ...props
}: { href: string; children: React.ReactNode } & Omit<
  React.ComponentProps<"a">,
  "href" | "children"
>) {
  const pathname = usePathname();
  const [path, section] = href.split("#");

  return section && path === pathname ? (
    <a href={`#${section}`} {...props}>
      {children}
    </a>
  ) : (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}
