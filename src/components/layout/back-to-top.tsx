"use client";

import { useT } from "@/i18n/context";
import { useEffect, useRef, useState } from "react";

const arrow = "M10 17V4M4.5 9.5 10 4l5.5 5.5";

/** Scrolls up and moves keyboard focus to the start of the page. */
function goToTop() {
  window.scrollTo({ top: 0 });
  document.querySelector<HTMLAnchorElement>("header a")?.focus({ preventScroll: true });
}

/** Link in the footer. */
export function BackToTop() {
  const t = useT();
  return (
    <button
      type="button"
      onClick={goToTop}
      className="flex min-h-11 cursor-pointer items-center gap-2 font-semibold text-white underline-offset-4 hover:underline"
    >
      {t("Back to top")}
      <svg
        viewBox="0 0 20 20"
        aria-hidden="true"
        className="size-4 fill-none stroke-current stroke-[2.2]"
      >
        <path d={arrow} />
      </svg>
    </button>
  );
}

/**
 * Round button on the right, three quarters of the way down the screen. It shows
 * after some scrolling, and its ring fills up towards the end of the page. On
 * phones and tablets it sits over the text, so it hides while the visitor scrolls
 * down to read and comes back when they scroll up or reach the end.
 */
export function TopButton() {
  const t = useT();
  const ring = useRef<SVGCircleElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let goingDown = false;
    const update = () => {
      const y = window.scrollY;
      const end = document.documentElement.scrollHeight - window.innerHeight;
      // Small moves, such as the bars sliding in, do not count.
      if (Math.abs(y - last) > 8) {
        goingDown = y > last;
        last = y;
      }
      const narrow = window.innerWidth < 1024;
      const atEnd = y > end - 80;
      setVisible(y > window.innerHeight * 0.6 && (!narrow || !goingDown || atEnd));
      ring.current?.style.setProperty(
        "stroke-dashoffset",
        String(1 - Math.min(1, end > 0 ? y / end : 0)),
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

  return (
    <button
      type="button"
      aria-label={t("Back to top")}
      title={t("Back to top")}
      inert={!visible}
      onClick={goToTop}
      // On very short screens it stays clear of the bars at the bottom.
      className={`group fixed top-[min(75dvh,calc(100dvh-9.5rem))] right-3 z-[7] flex size-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-ink shadow-[0_2px_14px_rgb(19_37_29/0.28)] transition duration-300 hover:bg-leaf hover:text-white motion-reduce:transition-none sm:right-5 sm:size-13 print:hidden ${visible ? "" : "invisible scale-75 opacity-0"}`}
    >
      <svg viewBox="0 0 52 52" aria-hidden="true" className="absolute inset-0 size-full -rotate-90 fill-none">
        <circle cx="26" cy="26" r="24" className="stroke-line stroke-3" />
        <circle
          ref={ring}
          cx="26"
          cy="26"
          r="24"
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset="1"
          className="stroke-sun stroke-3"
        />
      </svg>
      <svg
        viewBox="0 0 20 20"
        aria-hidden="true"
        className="relative size-5 fill-none stroke-current stroke-[2.2] transition-transform group-hover:-translate-y-0.5 motion-reduce:transition-none"
      >
        <path d={arrow} />
      </svg>
    </button>
  );
}
