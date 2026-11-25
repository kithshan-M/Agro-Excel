import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { benefits } from "@/data/greenhouses";
import type { Service } from "@/data/services";
import { step } from "@/lib/motion";

/** Rain, insect and tap, in the order of benefits. */
const icons = [
  "M12 27a8 8 0 1 1 2-15.700A10 10 0 0 1 33 14a6.500 6.500 0 0 1 0 13H12Zm2 6-2 6m11-6-2 6m11-6-2 6",
  "M22 16a7 7 0 0 1 7 7v6a7 7 0 0 1-14 0v-6a7 7 0 0 1 7-7Zm0 0v20m-4-20-4-6m12 6 4-6M15 22l-7-3m7 8H7m8 4-6 5m20-14 7-3m-7 8h8m-8 4 6 5",
  "M8 14h14m-7 0V8m-5 0h10M22 10v8h8a6 6 0 0 1 6 6v4m-28-14v8h14m14 14v.2M36 34c2 2.500 2.500 3.500 2.500 4.500a2.500 2.500 0 0 1-5 0c0-1 .500-2 2.500-4.500Z",
];

export function GreenhouseHero({ service }: { service: Service }) {
  return (
    <section className="overflow-hidden bg-leaf-dark text-white">
      <Container className="grid items-center gap-6 pt-14 lg:grid-cols-[1fr_1.15fr] lg:pt-10">
        <div>
          <h1 className="enter text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            {service.title}
          </h1>
          <p
            className="enter mt-5 max-w-md text-xl leading-relaxed text-white/85"
            style={step(1)}
          >
            {service.summary}
          </p>
          <div className="enter mt-8 flex flex-wrap gap-3" style={step(2)}>
            <ButtonLink href="#types">Find your type</ButtonLink>
            <ButtonLink href="#size" variant="outline">
              Plan a size
            </ButtonLink>
          </div>
        </div>
        {/* hero.svg animates itself: see motionStyle in scripts/draw-greenhouses.mjs. */}
        <picture className="min-w-0">
          <source
            media="(prefers-reduced-motion: reduce)"
            srcSet="/images/greenhouses/hero-still.svg"
          />
          <Image
            src="/images/greenhouses/hero.svg"
            alt=""
            width={1100}
            height={640}
            unoptimized
            loading="eager"
            className="-mx-4 w-[calc(100%+2rem)] max-w-none sm:mx-0 sm:w-full lg:w-[125%]"
          />
        </picture>
      </Container>
      <div className="border-t border-white/15">
        <Container className="grid divide-y divide-white/15 md:grid-cols-3 md:divide-x md:divide-y-0">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="py-5 md:px-8 md:py-7 md:first:pl-0 md:last:pr-0"
            >
              <div className="enter flex gap-4" style={step(index + 3)}>
                <svg
                  viewBox="0 0 44 44"
                  aria-hidden="true"
                  className="size-10 shrink-0 fill-none stroke-sun stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
                >
                  <path d={icons[index]} />
                </svg>
                <div>
                  <h2 className="text-lg font-semibold">{benefit.title}</h2>
                  <p className="mt-1 leading-relaxed text-white/75">{benefit.text}</p>
                </div>
              </div>
            </div>
          ))}
        </Container>
      </div>
    </section>
  );
}
