"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";

const links = [
  { id: "types", label: "Types" },
  { id: "parts", label: "Parts" },
  { id: "process", label: "Process" },
  { id: "questions", label: "Questions" },
];

/** Stays at the top of the screen and marks the section being read. */
export function PageNav() {
  const [active, setActive] = useState("");

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
  }, []);

  return (
    <nav
      aria-label="On this page"
      className="sticky top-0 z-[5] border-b border-line bg-paper"
    >
      <Container className="flex items-center justify-between">
        <ul className="flex gap-5 sm:gap-7">
          {links.map(({ id, label }) => {
            const current = active === id;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={current ? "location" : undefined}
                  className={`relative flex min-h-13 items-center font-medium whitespace-nowrap transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:bg-leaf after:transition-transform after:duration-300 motion-reduce:after:transition-none hover:text-leaf ${current ? "text-leaf after:scale-x-100" : "text-muted after:scale-x-0"}`}
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
        <a
          href="#quotation"
          className="hidden min-h-9 items-center rounded-md bg-leaf px-4 font-semibold text-white transition-colors hover:bg-leaf-dark md:flex"
        >
          Get a quotation
        </a>
      </Container>
    </nav>
  );
}
