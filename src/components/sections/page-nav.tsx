"use client";

import { useT } from "@/i18n/context";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/container";

type Link = { id: string; label: string };

/** Stays at the top of the screen and marks the section being read. */
export function PageNav({ links, action }: { links: Link[]; action: Link }) {
  const t = useT();
  const [active, setActive] = useState("");
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
          else setActive((now) => (now === entry.target.id ? "" : now));
        }
      },
      // Watches a thin strip about a third of the way down the screen.
      { rootMargin: "-30% 0px -69% 0px" },
    );
    for (const { id } of links) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [links]);

  // On narrow screens the links scroll sideways, so keep the marked one in view.
  useEffect(() => {
    const row = list.current;
    const link = row?.querySelector<HTMLElement>(`a[href="#${active}"]`);
    if (!row || !link || row.scrollWidth <= row.clientWidth) return;
    const left = link.offsetLeft - row.offsetLeft;
    if (left < row.scrollLeft || left + link.offsetWidth > row.scrollLeft + row.clientWidth) {
      row.scrollTo({ left: left - 16, behavior: "smooth" });
    }
  }, [active]);

  return (
    <nav
      aria-label={t("On this page")}
      className="sticky top-[var(--header-offset,0px)] z-[5] border-b border-line bg-paper transition-[top] duration-300 motion-reduce:transition-none"
    >
      <Container className="flex items-center justify-between">
        <ul
          ref={list}
          className="-mx-4 flex min-w-0 gap-5 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:gap-7 sm:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {links.map(({ id, label }) => {
            const current = active === id;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={current ? "location" : undefined}
                  className={`relative flex min-h-13 items-center font-medium whitespace-nowrap transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:bg-leaf after:transition-transform after:duration-300 motion-reduce:after:transition-none hover:text-leaf ${current ? "text-leaf after:scale-x-100" : "text-muted after:scale-x-0"}`}
                >
                  {t(label)}
                </a>
              </li>
            );
          })}
        </ul>
        <a
          href={`#${action.id}`}
          className="ml-4 hidden min-h-9 shrink-0 items-center rounded-md bg-leaf px-4 font-semibold whitespace-nowrap text-white transition-colors hover:bg-leaf-dark md:flex"
        >
          {t(action.label)}
        </a>
      </Container>
    </nav>
  );
}
