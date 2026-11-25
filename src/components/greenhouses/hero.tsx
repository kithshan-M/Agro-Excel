import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { benefits } from "@/data/greenhouses";
import type { Service } from "@/data/services";
import { step } from "@/lib/motion";

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
            <ButtonLink href="#quotation">Get a quotation</ButtonLink>
            <ButtonLink href="#types" variant="outline">
              Compare types
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
              className="py-7 md:px-8 md:first:pl-0 md:last:pr-0"
            >
              <div className="enter" style={step(index + 3)}>
                <h2 className="text-lg font-semibold">{benefit.title}</h2>
                <p className="mt-1.5 leading-relaxed text-white/75">
                  {benefit.text}
                </p>
              </div>
            </div>
          ))}
        </Container>
      </div>
    </section>
  );
}
