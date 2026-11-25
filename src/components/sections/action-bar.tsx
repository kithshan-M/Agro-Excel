"use client";

import { useT } from "@/i18n/context";
import { useEffect, useState } from "react";

/** Phone only: keeps the main button in reach between two sections of a page. */
export function ActionBar({
  from,
  to,
  label,
}: {
  /** Id of the section where the bar appears. */
  from: string;
  /** Id of the section the button leads to, where the bar goes away. */
  to: string;
  label: string;
}) {
  const t = useT();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const start = document.getElementById(from);
    const end = document.getElementById(to);
    if (!start || !end) return;

    const update = () => {
      const height = window.innerHeight;
      setVisible(
        start.getBoundingClientRect().top < height * 0.6 &&
          end.getBoundingClientRect().top > height * 0.8,
      );
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [from, to]);

  return (
    <div
      inert={!visible}
      className={`fixed inset-x-0 bottom-0 z-[6] border-t border-line bg-paper px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-300 motion-reduce:transition-none md:hidden ${visible ? "" : "translate-y-full"}`}
    >
      <a
        href={`#${to}`}
        className="flex min-h-12 items-center justify-center rounded-md bg-sun font-semibold text-ink"
      >
        {t(label)}
      </a>
    </div>
  );
}
