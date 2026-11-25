"use client";

import { useT } from "@/i18n/context";
import Image from "next/image";
import { Suspense } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { projectsIntro } from "@/data/projects-intro";
import { step } from "@/lib/motion";
import { DistrictMap, FilteredDistrictMap } from "./district-map";

export function HeroPanel({ counts }: { counts: Record<string, number> }) {
  const t = useT();
  return (
    <section className="overflow-hidden bg-[#7c3a20] text-white">
      <Container className="grid gap-8 pt-14 md:grid-cols-[1fr_24rem] md:pt-12 lg:grid-cols-[1fr_29rem]">
        <div className="self-center">
          <h1 className="enter text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            {t(projectsIntro.title)}
          </h1>
          <p className="enter mt-5 max-w-md text-xl leading-relaxed text-white/90" style={step(1)}>
            {t(projectsIntro.text)}
          </p>
          <div className="enter mt-8 flex flex-wrap gap-3" style={step(2)}>
            <ButtonLink href="#project-list">{t("See the projects")}</ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              {t("Contact us")}
            </ButtonLink>
          </div>
        </div>
        {/* Phones have the district list above the projects instead. */}
        <div className="enter hidden md:block" style={step(3)}>
          <Suspense fallback={<DistrictMap counts={counts} />}>
            <FilteredDistrictMap counts={counts} />
          </Suspense>
        </div>
      </Container>
      {/* hero.svg animates itself: see scripts/draw-projects.mjs. */}
      <picture className="block md:mt-5">
        <source
          media="(prefers-reduced-motion: reduce)"
          srcSet="/images/projects/hero-still.svg"
        />
        <Image
          src="/images/projects/hero.svg"
          alt=""
          width={1500}
          height={390}
          unoptimized
          loading="eager"
          className="pointer-events-none block h-56 w-full object-cover object-right-bottom lg:h-[19vw]"
        />
      </picture>
    </section>
  );
}
