"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks } from "@/config/site";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="site-nav"
        onClick={() => setOpen(!open)}
        className="min-h-11 px-2 font-semibold md:hidden"
      >
        {open ? "Close" : "Menu"}
      </button>
      <nav
        id="site-nav"
        aria-label="Main"
        className={`${open ? "block" : "hidden"} absolute inset-x-0 top-full border-b border-line bg-paper px-4 py-3 md:static md:block md:border-0 md:p-0`}
      >
        <ul className="flex flex-col md:flex-row md:gap-7">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={`block py-3 font-medium underline-offset-8 hover:underline ${active ? "text-leaf underline decoration-2" : ""}`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
