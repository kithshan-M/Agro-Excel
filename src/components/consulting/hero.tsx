"use client";

import { useT } from "@/i18n/context";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import type { Service } from "@/data/services";
import { step } from "@/lib/motion";

export function ConsultingHero({ service }: { service: Service }) {
  const t = useT();
  return (
    <section className="overflow-hidden bg-[#dcebf0]">
      <Container className="pt-14 pb-6 md:pt-20 lg:pb-0">
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
          <ButtonLink href="#start" variant="dark">
            {t("Choose your crop")}
          </ButtonLink>
          <ButtonLink href="#problem" variant="outline">
            {t("Describe a problem")}
          </ButtonLink>
        </div>
      </Container>
      {/* hero.svg animates itself: see scripts/draw-consulting.mjs. */}
      <picture className="block lg:-mt-36">
        <source
          media="(prefers-reduced-motion: reduce)"
          srcSet="/images/consulting/hero-still.svg"
        />
        <Image
          src="/images/consulting/hero.svg"
          alt=""
          width={1500}
          height={440}
          unoptimized
          loading="eager"
          className="pointer-events-none block h-64 w-full object-cover object-right sm:h-80 lg:h-auto lg:min-h-96 lg:max-h-[34rem] lg:object-bottom"
        />
      </picture>
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
