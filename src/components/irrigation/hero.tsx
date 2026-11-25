import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import type { Service } from "@/data/services";
import { step } from "@/lib/motion";

export function IrrigationHero({ service }: { service: Service }) {
  return (
    <section className="overflow-hidden bg-water text-white">
      <Container className="grid items-end gap-4 pt-12 lg:grid-cols-[1fr_1.15fr] lg:pt-8">
        <div className="self-center lg:pb-8">
          <h1 className="enter text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            {service.title}
          </h1>
          <p
            className="enter mt-5 max-w-md text-xl leading-relaxed text-white/90"
            style={step(1)}
          >
            {service.summary}
          </p>
          <div className="enter mt-8 flex flex-wrap gap-3" style={step(2)}>
            <ButtonLink href="#irrigation-types">Plan a new system</ButtonLink>
            <ButtonLink href="#irrigation-parts" variant="outline">
              Find a fault
            </ButtonLink>
          </div>
        </div>
        {/* hero.svg animates itself: see scripts/draw-irrigation.mjs. */}
        <picture className="min-w-0">
          <source
            media="(prefers-reduced-motion: reduce)"
            srcSet="/images/irrigation/hero-still.svg"
          />
          <Image
            src="/images/irrigation/hero.svg"
            alt=""
            width={960}
            height={660}
            unoptimized
            loading="eager"
            className="block w-full"
          />
        </picture>
      </Container>
    </section>
  );
}
