"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { SectionLink } from "@/components/ui/section-link";
import { useSeedList } from "@/lib/seed-list";

const button =
  "flex min-h-12 items-center rounded-md bg-sun px-6 font-semibold whitespace-nowrap text-ink transition-colors hover:bg-white";

/**
 * Follows the visitor once a seed is added. It hides at the list itself and
 * stops above the footer. Keep it last on the page.
 */
export function ListBar() {
  const count = Object.keys(useSeedList()).length;
  const [atList, setAtList] = useState(false);

  useEffect(() => {
    const update = () => {
      const list = document.getElementById("list");
      // A page visited earlier can stay in the document without being shown.
      const shown = list && list.getClientRects().length > 0;
      setAtList(
        Boolean(shown) &&
          list!.getBoundingClientRect().top < window.innerHeight * 0.8,
      );
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const visible = count > 0 && !atList;

  return (
    <div className="sticky bottom-0 z-[6] h-0">
      <div
        inert={!visible}
        className={`absolute inset-x-0 bottom-0 bg-ink pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] text-white transition duration-300 motion-reduce:transition-none ${visible ? "" : "invisible translate-y-4 opacity-0"}`}
      >
        <Container className="flex items-center justify-between gap-4">
          <p role="status" className="font-semibold">
            {count} {count === 1 ? "seed" : "seeds"} in your list
          </p>
          <SectionLink href="/seeds#list" className={button}>
            View list
          </SectionLink>
        </Container>
      </div>
    </div>
  );
}
