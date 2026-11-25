"use client";

import { useEffect, useRef } from "react";
import { step } from "@/lib/motion";

/**
 * Plays the .reveal-* animations in globals.css when it scrolls into view.
 * Content stays visible without JavaScript, when already on screen, and for
 * visitors who prefer reduced motion.
 */
export function Reveal({
  as: Tag = "div",
  index = 0,
  className,
  children,
}: {
  as?: "div" | "li" | "ol" | "ul";
  index?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (element.getBoundingClientRect().top < window.innerHeight) return;

    element.dataset.reveal = "wait";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        element.dataset.reveal = "in";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      delete element.dataset.reveal;
    };
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={className}
      style={step(index)}
    >
      {children}
    </Tag>
  );
}
