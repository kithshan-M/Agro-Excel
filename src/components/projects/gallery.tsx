"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/components/sections/section-heading";
import { Container } from "@/components/ui/container";
import type { ProjectPhoto } from "@/data/projects";
import { projectPhoto } from "@/lib/project-photo";

/** Photo grid with a full-screen viewer. Swipe, arrow keys and buttons all work. */
export function Gallery({ photos }: { photos: ProjectPhoto[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const [current, setCurrent] = useState(0);
  // Large photos load only once the viewer has been opened.
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    // Leaving the page keeps it in memory, so close the viewer first.
    const element = dialog.current;
    return () => element?.close();
  }, []);

  function open(index: number) {
    setOpened(true);
    setCurrent(index);
    dialog.current?.showModal();
    requestAnimationFrame(() => go(index, "instant"));
  }

  function go(index: number, behavior: ScrollBehavior = "smooth") {
    const list = track.current;
    if (!list) return;
    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollTo({ left: index * list.clientWidth, behavior: calm ? "instant" : behavior });
  }

  // Counts from where the viewer is, so quick presses are not lost mid-scroll.
  const move = (by: number) => {
    const next = Math.min(Math.max(current + by, 0), photos.length - 1);
    setCurrent(next);
    go(next);
  };

  // Buttons at the ends stay focusable, so the arrow keys keep working.
  const round =
    "flex size-12 cursor-pointer items-center justify-center rounded-full bg-white text-ink transition-colors hover:bg-sun aria-disabled:cursor-default aria-disabled:bg-white/25 aria-disabled:text-white/60";
  const icon = "size-5 fill-none stroke-current stroke-[2.5] [stroke-linecap:round]";

  return (
    <section className="pb-16 md:pb-24">
      <Container>
        <SectionHeading title="Photos" />
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {photos.map((photo, index) => (
            <li key={photo.file}>
              <button
                type="button"
                aria-haspopup="dialog"
                aria-label={`Photo ${index + 1} of ${photos.length}: ${photo.alt}`}
                onClick={() => open(index)}
                className="group relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-lg bg-film"
              >
                <Image
                  {...projectPhoto(photo)}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 280px, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                />
              </button>
              {photo.caption && <p className="mt-2 leading-snug text-muted">{photo.caption}</p>}
            </li>
          ))}
        </ul>
      </Container>

      <dialog
        ref={dialog}
        aria-label="Photos"
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") move(-1);
          else if (event.key === "ArrowRight") move(1);
          else return;
          event.preventDefault();
        }}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-ink text-white"
      >
        <div className="flex h-full flex-col">
          <div className="flex min-h-16 items-center justify-between px-4 sm:px-6">
            <p role="status" className="font-semibold">
              {current + 1} of {photos.length}
            </p>
            <button
              type="button"
              onClick={() => dialog.current?.close()}
              className="flex min-h-11 cursor-pointer items-center gap-2.5 rounded-md px-2 font-semibold"
            >
              Close
              <svg viewBox="0 0 24 24" aria-hidden="true" className={icon}>
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>
          </div>
          <ul
            ref={track}
            onScroll={(event) => {
              const { scrollLeft, clientWidth } = event.currentTarget;
              // Only count a photo once it has settled.
              const place = scrollLeft / clientWidth;
              if (Math.abs(place - Math.round(place)) < 0.02) setCurrent(Math.round(place));
            }}
            className="flex min-h-0 flex-1 snap-x snap-mandatory overflow-x-auto [scrollbar-width:none]"
          >
            {photos.map((photo, index) => (
              <li
                key={photo.file}
                aria-hidden={index !== current}
                className="relative h-full w-full shrink-0 snap-center snap-always"
              >
                {opened && (
                  <Image
                    {...projectPhoto(photo)}
                    alt={photo.alt}
                    fill
                    sizes="100vw"
                    loading={Math.abs(index - current) < 2 ? "eager" : "lazy"}
                    className="object-contain px-2 sm:px-6"
                  />
                )}
              </li>
            ))}
          </ul>
          <div className="flex min-h-24 items-center justify-between gap-4 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-6">
            <button type="button" aria-label="Previous photo" aria-disabled={current === 0} onClick={() => move(-1)} className={round}>
              <svg viewBox="0 0 20 20" aria-hidden="true" className={icon}>
                <path d="m12 4-6 6 6 6" />
              </svg>
            </button>
            <p className="line-clamp-2 max-w-xl text-center">{photos[current].caption ?? photos[current].alt}</p>
            <button type="button" aria-label="Next photo" aria-disabled={current === photos.length - 1} onClick={() => move(1)} className={round}>
              <svg viewBox="0 0 20 20" aria-hidden="true" className={icon}>
                <path d="m8 4 6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </dialog>
    </section>
  );
}
