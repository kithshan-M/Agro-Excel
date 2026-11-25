"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Tucks away when scrolling down and returns when scrolling up.
 * --header-offset tells PageNav how much of the top is taken.
 */
export function HeaderShell({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const [hidden, setHidden] = useState(false);
  const [raised, setRaised] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let jumpingUntil = 0;

    // Jumping up to a section should not bring the header back over its heading.
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest('a[href^="#"]');
      if (link) jumpingUntil = performance.now() + 1400;
    };

    const update = () => {
      const header = ref.current;
      if (!header) return;
      const y = Math.max(0, window.scrollY);
      setRaised(y > 4);
      // Ignore tiny movements, so the header does not flicker.
      if (Math.abs(y - last) < 6 && y > header.offsetHeight) return;
      const jumping = performance.now() < jumpingUntil;
      setHidden(
        (y > last || jumping) &&
          y > header.offsetHeight * 2 &&
          !header.contains(document.activeElement),
      );
      last = y;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("scroll", update);
      document.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    const height = ref.current?.offsetHeight ?? 0;
    document.documentElement.style.setProperty(
      "--header-offset",
      hidden ? "0px" : `${height}px`,
    );
  }, [hidden]);

  return (
    <header
      ref={ref}
      onFocus={() => setHidden(false)}
      className={`sticky top-0 z-10 border-b border-line bg-paper transition-[translate,box-shadow] duration-300 motion-reduce:transition-none print:static ${hidden ? "-translate-y-full" : ""} ${raised && !hidden ? "shadow-[0_2px_14px_rgb(19_37_29/0.07)]" : ""}`}
    >
      {children}
    </header>
  );
}
