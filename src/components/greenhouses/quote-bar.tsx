"use client";

import { useEffect, useState } from "react";

/** Phone only: keeps the quotation button in reach between the hero and the form. */
export function QuoteBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const types = document.getElementById("types");
    const quotation = document.getElementById("quotation");
    if (!types || !quotation) return;

    const update = () => {
      const height = window.innerHeight;
      setVisible(
        types.getBoundingClientRect().top < height * 0.6 &&
          quotation.getBoundingClientRect().top > height * 0.8,
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
    <div
      inert={!visible}
      className={`fixed inset-x-0 bottom-0 z-[6] border-t border-line bg-paper px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-300 motion-reduce:transition-none md:hidden ${visible ? "" : "translate-y-full"}`}
    >
      <a
        href="#quotation"
        className="flex min-h-12 items-center justify-center rounded-md bg-sun font-semibold text-ink"
      >
        Get a quotation
      </a>
    </div>
  );
}
