"use client";

import { useT } from "@/i18n/context";
import Image from "next/image";
import { Link } from "@/components/ui/link";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { scenePins } from "@/data/home";
import { step } from "@/lib/motion";

export function HomeHero() {
  const t = useT();
  return (
    <section className="overflow-hidden bg-[linear-gradient(#cfe6ea,#f4f3dd_62%,#fdf0c8)]">
      <Container className="relative z-1 pt-12 md:pt-16">
        <h1 className="enter text-[1.9rem] font-bold leading-[1.12] tracking-tight min-[400px]:text-[2.1rem] sm:text-5xl lg:text-6xl">
          <span className="block">{t("Build the greenhouse.")} </span>
          <span className="block">{t("Plant the right seed.")} </span>
          <span className="block">{t("Grow with advice.")}</span>
        </h1>
        <p
          className="enter mt-5 max-w-lg text-xl leading-relaxed"
          style={step(1)}
        >
          {t("We build greenhouses and irrigation systems, sell vegetable seeds and advise growers on their crops.")}
        </p>
        <div className="enter mt-7 flex flex-wrap gap-3" style={step(2)}>
          <ButtonLink href="#services" variant="dark">
            {t("See what we do")}
          </ButtonLink>
          <ButtonLink href="/consulting#ask" variant="outline">
            {t("Ask for advice")}
          </ButtonLink>
        </div>
      </Container>
      <div className="relative -mt-4 lg:-mt-20 xl:-mt-40">
        {/* farm.svg animates itself: see scripts/draw-home.mjs. */}
        <picture>
          <source
            media="(prefers-reduced-motion: reduce)"
            srcSet="/images/home/farm-still.svg"
          />
          <Image
            src="/images/home/farm.svg"
            alt={t("Farm with a greenhouse, two people talking beside a tomato plant, and a water tank, and a stall of seed packets and vegetables.")}
            width={1600}
            height={660}
            unoptimized
            loading="eager"
            className="block h-72 w-full object-cover object-[50%_100%] sm:h-96 md:h-auto"
          />
        </picture>
        <nav aria-label={t("Services on the farm")} className="hidden md:block">
          <ul>
            {scenePins.map((pin, index) => (
              <li
                key={pin.slug}
                className="absolute z-2 -translate-x-1/2 -translate-y-full"
                style={{ left: `${pin.at[0]}%`, top: `${pin.at[1]}%` }}
              >
                <div className="enter" style={step(index * 2 + 8)}>
                  <Link
                    href={`/${pin.slug}`}
                    className="group flex flex-col items-center"
                  >
                    <span className="flex min-h-11 items-center gap-2 rounded-md bg-white px-4 font-semibold whitespace-nowrap text-ink shadow-[0_2px_10px_rgb(19_37_29/0.18)] transition-colors group-hover:bg-leaf group-hover:text-white">
                      {t(pin.label)}
                      <svg
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                        className="size-4 fill-none stroke-current stroke-[2.5] transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                      >
                        <path d="M3 10h13m-5-5 5 5-5 5" />
                      </svg>
                    </span>
                    <span aria-hidden="true" className="h-5 w-0.5 bg-ink" />
                    <span
                      aria-hidden="true"
                      className="size-3.5 rounded-full border-2 border-ink bg-sun transition-transform group-hover:scale-125 motion-reduce:transition-none"
                    />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
