"use client";

import { useLang, usePath, useT } from "@/i18n/context";
import { Link } from "@/components/ui/link";
import type { navLinks } from "@/config/site";

/** Wide screens. Smaller ones use MobileMenu. */
export function Nav({ links: all }: { links: typeof navLinks }) {
  const t = useT();
  const pathname = usePath();
  // Sinhala names are longer, so smaller laptops keep the Menu button. Tamil ones never fit in one row.
  const wide = { en: "hidden lg:block", si: "hidden xl:block", ta: "hidden" }[useLang()];
  const links = all.filter((link) => link.href !== "/contact");

  return (
    <nav aria-label={t("Main")} className={wide}>
      <ul className="flex items-center gap-5 xl:gap-7">
        {links.map((link) => {
          const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={pathname === link.href ? "page" : active || undefined}
                className={`relative flex min-h-16 items-center font-medium whitespace-nowrap transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:origin-left after:bg-leaf after:transition-transform after:duration-300 hover:text-leaf hover:after:scale-x-100 motion-reduce:after:transition-none ${active ? "text-leaf after:scale-x-100" : "after:scale-x-0"}`}
              >
                {t(link.label)}
              </Link>
            </li>
          );
        })}
        <li>
          <Link
            href="/contact"
            aria-current={pathname === "/contact" ? "page" : undefined}
            className={`flex min-h-11 items-center rounded-md px-5 font-semibold whitespace-nowrap transition-colors ${pathname === "/contact" ? "bg-leaf-dark text-white" : "bg-leaf text-white hover:bg-leaf-dark"}`}
          >
            {t("Contact")}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
