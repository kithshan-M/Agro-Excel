"use client";

/** Scrolls up and moves keyboard focus to the start of the page. */
export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => {
        window.scrollTo({ top: 0 });
        document
          .querySelector<HTMLAnchorElement>("header a")
          ?.focus({ preventScroll: true });
      }}
      className="flex min-h-11 cursor-pointer items-center gap-2 font-semibold text-white underline-offset-4 hover:underline"
    >
      Back to top
      <svg
        viewBox="0 0 20 20"
        aria-hidden="true"
        className="size-4 fill-none stroke-current stroke-[2.2]"
      >
        <path d="M10 17V4M4.5 9.5 10 4l5.5 5.5" />
      </svg>
    </button>
  );
}
