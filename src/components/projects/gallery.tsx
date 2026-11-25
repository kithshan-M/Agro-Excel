"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ProjectPhoto } from "@/data/projects";
import { projectPhoto } from "@/lib/project-photo";

/** Layout of the photos on larger screens, by how many there are. */
const layouts = [
  "",
  "sm:grid-cols-1",
  "sm:grid-cols-2",
  "sm:grid-cols-3 sm:grid-rows-2",
  "sm:grid-cols-3 sm:grid-rows-2",
  "sm:grid-cols-4 sm:grid-rows-2",
];

/**
 * Photos with a full-screen viewer. Phones swipe sideways through all of them;
 * larger screens show up to five. Swipe, arrow keys and buttons work in the viewer.
 */
export function Gallery({ photos }: { photos: ProjectPhoto[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const [current, setCurrent] = useState(0);
  // Large photos load only once the viewer has been opened.
  const [opened, setOpened] = useState(false);
  const several = photos.length > 1;
  // Four photos leave a gap in the grid, so it shows three of them.
  const tiles = photos.length === 4 ? 3 : Math.min(photos.length, 5);

  useEffect(() => {
    // Leaving the page keeps it in memory, so close the viewer first.
    const element = dialog.current;
    return () => element?.close();
  }, []);

  function go(index: number, behavior: ScrollBehavior = "smooth") {
    const list = track.current;
    if (!list) return;
    const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollTo({ left: index * list.clientWidth, behavior: calm ? "instant" : behavior });
  }

  function open(index: number) {
    setOpened(true);
    setCurrent(index);
    dialog.current?.showModal();
    requestAnimationFrame(() => go(index, "instant"));
  }

  function pick(index: number, behavior?: ScrollBehavior) {
    setCurrent(index);
    go(index, behavior);
  }

  // Counts from where the viewer is, so quick presses are not lost mid-scroll.
  const move = (by: number) => pick(Math.min(Math.max(current + by, 0), photos.length - 1));

  // Buttons at the ends stay focusable, so the arrow keys keep working.
  const round =
    "flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white text-ink transition-colors hover:bg-sun aria-disabled:cursor-default aria-disabled:bg-white/25 aria-disabled:text-white/60";
  const icon = "size-5 fill-none stroke-current stroke-[2.5] [stroke-linecap:round]";

  return (
    <div className="relative">
      <ul
        className={`-mx-4 flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:gap-3 sm:overflow-visible sm:px-0 ${layouts[tiles]} ${tiles > 2 ? "sm:aspect-[2/1]" : ""}`}
      >
        {photos.map((photo, index) => (
          <li
            key={photo.file}
            className={`relative shrink-0 snap-center ${several ? "w-[86%]" : "w-full"} sm:w-auto ${index === 0 && tiles > 2 ? "sm:col-span-2 sm:row-span-2" : ""} ${index >= tiles ? "sm:hidden" : ""}`}
          >
            <button
              type="button"
              aria-haspopup="dialog"
              aria-label={`Photo ${index + 1} of ${photos.length}: ${photo.alt}`}
              onClick={() => open(index)}
              className={`group relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-lg bg-film ${tiles > 2 ? "sm:aspect-auto sm:h-full" : tiles === 1 ? "sm:aspect-[2/1]" : ""}`}
            >
              <Image
                {...projectPhoto(photo)}
                alt=""
                fill
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : undefined}
                sizes={index === 0 ? "(min-width: 640px) 66vw, 90vw" : "(min-width: 640px) 33vw, 90vw"}
                className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
              />
            </button>
          </li>
        ))}
      </ul>
      {several && (
        <button
          type="button"
          aria-haspopup="dialog"
          onClick={() => open(0)}
          className={`absolute right-3 bottom-3 flex min-h-11 cursor-pointer items-center gap-2 rounded-md bg-white px-4 font-semibold text-ink shadow-[0_2px_12px_rgb(19_37_29/0.25)] transition-colors hover:bg-sun ${photos.length === 2 ? "sm:hidden" : ""}`}
        >
          <svg viewBox="0 0 20 20" aria-hidden="true" className="size-5 fill-none stroke-current stroke-[1.8] [stroke-linejoin:round]">
            <path d="M3 3h6v6H3V3Zm8 0h6v6h-6V3ZM3 11h6v6H3v-6Zm8 0h6v6h-6v-6Z" />
          </svg>
          See all {photos.length} photos
        </button>
      )}

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
          <div className="flex min-h-20 items-center justify-between gap-4 px-4 sm:px-6">
            {several && (
              <button type="button" aria-label="Previous photo" aria-disabled={current === 0} onClick={() => move(-1)} className={round}>
                <svg viewBox="0 0 20 20" aria-hidden="true" className={icon}>
                  <path d="m12 4-6 6 6 6" />
                </svg>
              </button>
            )}
            <p className="mx-auto line-clamp-2 max-w-xl text-center">
              {photos[current].caption ?? photos[current].alt}
            </p>
            {several && (
              <button type="button" aria-label="Next photo" aria-disabled={current === photos.length - 1} onClick={() => move(1)} className={round}>
                <svg viewBox="0 0 20 20" aria-hidden="true" className={icon}>
                  <path d="m8 4 6 6-6 6" />
                </svg>
              </button>
            )}
          </div>
          {several && (
            <ul className="flex gap-2 overflow-x-auto px-4 pt-1 pb-[max(1rem,env(safe-area-inset-bottom))] [scrollbar-width:none] sm:justify-center sm:px-6">
              {opened &&
                photos.map((photo, index) => (
                  <li key={photo.file} className="shrink-0">
                    <button
                      type="button"
                      aria-label={`Show photo ${index + 1}`}
                      aria-current={index === current || undefined}
                      onClick={() => pick(index)}
                      className="relative block h-12 w-16 cursor-pointer overflow-hidden rounded border-2 border-transparent opacity-60 transition-opacity hover:opacity-100 aria-[current]:border-sun aria-[current]:opacity-100"
                    >
                      <Image {...projectPhoto(photo)} alt="" fill sizes="64px" className="object-cover" />
                    </button>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </dialog>
    </div>
  );
}
