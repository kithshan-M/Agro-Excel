"use client";

import { useT } from "@/i18n/context";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { SectionLink } from "@/components/ui/section-link";
import { seedImage, seeds } from "@/data/seeds";
import { useSeedList } from "@/lib/seed-list";

const button =
  "flex min-h-12 shrink-0 items-center rounded-md bg-sun px-6 font-semibold whitespace-nowrap text-ink transition-colors hover:bg-white";
const most = 5;

/**
 * Follows the visitor once a seed is added. It hides at the list itself and
 * stops above the footer. Keep it last on the page.
 */
export function ListBar() {
  const t = useT();
  const list = useSeedList();
  const chosen = seeds.filter((seed) => list[seed.slug]);
  const count = chosen.length;
  const [atList, setAtList] = useState(false);

  useEffect(() => {
    const update = () => {
      const section = document.getElementById("list");
      // A page visited earlier can stay in the document without being shown.
      const shown = section && section.getClientRects().length > 0;
      setAtList(
        Boolean(shown) &&
          section!.getBoundingClientRect().top < window.innerHeight * 0.8 &&
          section!.getBoundingClientRect().bottom > 0,
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
          <div className="flex min-w-0 items-center gap-4">
            <ul aria-hidden="true" className="flex -space-x-2.5 max-[430px]:hidden">
              {chosen.slice(0, most).map((seed) => (
                <li key={seed.slug} className="enter size-11 overflow-hidden rounded-full border-2 border-ink bg-white">
                  <Image
                    src={seedImage(seed)}
                    alt=""
                    width={44}
                    height={44}
                    unoptimized={!seed.photo}
                    className="size-full object-cover"
                  />
                </li>
              ))}
              {count > most && (
                <li className="flex size-11 items-center justify-center rounded-full border-2 border-ink bg-film text-sm font-bold text-ink">
                  +{count - most}
                </li>
              )}
            </ul>
            <p role="status" className="font-semibold">
              {t(count === 1 ? "{count} seed in your list" : "{count} seeds in your list", { count })}
            </p>
          </div>
          <SectionLink href="/seeds#list" className={button}>
            {t("View list")}
          </SectionLink>
        </Container>
      </div>
    </div>
  );
}
