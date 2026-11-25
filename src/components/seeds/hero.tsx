"use client";

import { useT } from "@/i18n/context";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import type { Service } from "@/data/services";
import { step } from "@/lib/motion";

export function SeedsHero({ service }: { service: Service }) {
  const t = useT();
  return (
    <section className="overflow-hidden bg-sun">
      <Container className="grid items-end gap-4 pt-12 lg:grid-cols-[1fr_1.15fr] lg:pt-6">
        <div className="self-center">
          <h1 className="enter text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            {t(service.title)}
          </h1>
          <p
            className="enter mt-5 max-w-md text-xl leading-relaxed"
            style={step(1)}
          >
            {t(service.summary)}
          </p>
          <div className="enter mt-8 flex flex-wrap gap-3" style={step(2)}>
            <ButtonLink href="#catalogue" variant="dark">
              {t("Browse seeds")}
            </ButtonLink>
            <ButtonLink href="#seasons" variant="outline">
              {t("When to plant")}
            </ButtonLink>
          </div>
        </div>
        {/* hero.svg animates itself: see scripts/draw-seeds.mjs. */}
        <picture className="min-w-0">
          <source
            media="(prefers-reduced-motion: reduce)"
            srcSet="/images/seeds/hero-still.svg"
          />
          <Image
            src="/images/seeds/hero.svg"
            alt=""
            width={900}
            height={620}
            unoptimized
            loading="eager"
            className="block w-full"
          />
        </picture>
      </Container>
      <div className="bg-ink text-white">
        <Container>
          <ol className="grid divide-y divide-white/15 md:grid-cols-3 md:divide-x md:divide-y-0">
            {service.points.map((item, index) => (
              <li
                key={item.title}
                className="flex gap-4 py-6 md:px-7 md:py-7 md:first:pl-0 md:last:pr-0"
              >
                <span
                  aria-hidden="true"
                  className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sun font-display font-bold text-ink"
                >
                  {index + 1}
                </span>
                <div>
                  <h2 className="text-lg font-semibold">{t(item.title)}</h2>
                  <p className="mt-0.5 leading-relaxed text-white/75">{t(item.text)}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </div>
    </section>
  );
}
