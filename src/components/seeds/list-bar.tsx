"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { useSeedList } from "@/lib/seed-list";

/** Follows the visitor once a seed is added, until they reach the list. */
export function ListBar() {
  const count = Object.keys(useSeedList()).length;
  const [atList, setAtList] = useState(false);

  useEffect(() => {
    const section = document.getElementById("list");
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) =>
        setAtList(entry.isIntersecting || entry.boundingClientRect.top < 0),
      { rootMargin: "0px 0px -20% 0px" },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const visible = count > 0 && !atList;

  return (
    <div
      inert={!visible}
      className={`fixed inset-x-0 bottom-0 z-[6] bg-ink pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] text-white transition-transform duration-300 motion-reduce:transition-none ${visible ? "" : "translate-y-full"}`}
    >
      <Container className="flex items-center justify-between gap-4">
        <p role="status" className="font-semibold">
          {count} {count === 1 ? "seed" : "seeds"} in your list
        </p>
        <a
          href="#list"
          className="flex min-h-12 items-center rounded-md bg-sun px-6 font-semibold whitespace-nowrap text-ink transition-colors hover:bg-white"
        >
          View list
        </a>
      </Container>
    </div>
  );
}
