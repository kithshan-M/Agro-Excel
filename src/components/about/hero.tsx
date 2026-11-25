import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { aboutIntro } from "@/data/about";
import { step } from "@/lib/motion";

export function AboutHero() {
  return (
    <section className="overflow-hidden bg-leaf text-white">
      <Container className="grid items-end gap-4 pt-12 lg:grid-cols-[1fr_1.1fr] lg:pt-14">
        <div className="self-center lg:pb-10">
          <h1 className="enter text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
            {aboutIntro.title}
          </h1>
          <p
            className="enter mt-5 max-w-md text-xl leading-relaxed text-white/90"
            style={step(1)}
          >
            {aboutIntro.text}
          </p>
          <div className="enter mt-8 flex flex-wrap gap-3" style={step(2)}>
            <ButtonLink href="#growers">Find what you need</ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              Contact us
            </ButtonLink>
          </div>
        </div>
        {/* hero.svg animates itself: see scripts/draw-about.mjs. */}
        <picture className="min-w-0">
          <source
            media="(prefers-reduced-motion: reduce)"
            srcSet="/images/about/hero-still.svg"
          />
          <Image
            src="/images/about/hero.svg"
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
