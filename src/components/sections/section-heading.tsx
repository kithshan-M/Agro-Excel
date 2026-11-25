"use client";

import { useT } from "@/i18n/context";
import { Reveal } from "@/components/ui/reveal";

export function SectionHeading({ title, text }: { title: string; text?: string }) {
  const t = useT();
  return (
    <Reveal className="reveal-up max-w-2xl">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t(title)}</h2>
      {text && <p className="mt-3 text-lg leading-relaxed text-muted">{t(text)}</p>}
    </Reveal>
  );
}
