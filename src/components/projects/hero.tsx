import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { projectsIntro } from "@/data/projects-intro";
import { step } from "@/lib/motion";

export function ProjectsHero() {
  return (
    <section className="overflow-hidden bg-[#7c3a20] text-white">
      <Container className="relative z-1 pt-14 md:pt-20">
        <h1 className="enter text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
          {projectsIntro.title}
        </h1>
        <p className="enter mt-5 max-w-md text-xl leading-relaxed text-white/90" style={step(1)}>
          {projectsIntro.text}
        </p>
        <div className="enter mt-8 flex flex-wrap gap-3" style={step(2)}>
          <ButtonLink href="#project-list">See the projects</ButtonLink>
          <ButtonLink href="/contact" variant="outline">
            Contact us
          </ButtonLink>
        </div>
      </Container>
      {/* hero.svg animates itself: see scripts/draw-projects.mjs. */}
      <picture className="block lg:-mt-16">
        <source
          media="(prefers-reduced-motion: reduce)"
          srcSet="/images/projects/hero-still.svg"
        />
        <Image
          src="/images/projects/hero.svg"
          alt=""
          width={1500}
          height={440}
          unoptimized
          loading="eager"
          className="pointer-events-none block h-64 w-full object-cover object-right sm:h-80 lg:h-auto lg:max-h-[34rem] lg:object-bottom"
        />
      </picture>
    </section>
  );
}
