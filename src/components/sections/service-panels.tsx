"use client";

import { useT } from "@/i18n/context";
import Image from "next/image";
import { Link } from "@/components/ui/link";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { getService } from "@/data/services";
import { SectionHeading } from "./section-heading";

const greenhouses = getService("greenhouses");
const irrigation = getService("irrigation");
const seeds = getService("seeds");
const consulting = getService("consulting");

const small =
  "group relative flex h-full flex-col overflow-hidden rounded-lg sm:min-h-64";
const more =
  "inline-flex min-h-12 items-center font-semibold underline underline-offset-4";

/** The services, each in the colour of its own page. */
export function ServicePanels({ id }: { id?: string }) {
  const t = useT();
  return (
    <section id={id} className="scroll-mt-4 py-16 md:py-24">
      <Container>
        <SectionHeading title={t("What we do")} />
        <ul className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_1fr]">
          <Reveal as="li" className="reveal-up lg:row-span-2">
            <div className="group flex h-full flex-col overflow-hidden rounded-lg bg-leaf-dark text-white">
              <div className="p-6 sm:p-9">
                <h3 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {t(greenhouses.title)}
                </h3>
                <p className="mt-3 max-w-md text-lg leading-relaxed text-white/85">
                  {t(greenhouses.summary)}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
                  <ButtonLink href="/greenhouses#quotation">
                    {t("Get a quotation")}
                  </ButtonLink>
                  <Link href="/greenhouses#types" className={more}>
                    {t("Find your type")}
                  </Link>
                </div>
              </div>
              <div className="mt-auto overflow-hidden pl-4 max-sm:-mt-6 sm:pl-8">
                <Image
                  src="/images/greenhouses/hero-still.svg"
                  alt=""
                  width={1100}
                  height={640}
                  unoptimized
                  className="block w-[132%] max-w-none max-sm:w-[112%] transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none"
                />
              </div>
            </div>
          </Reveal>

          <Reveal as="li" className="reveal-up lg:col-span-2 lg:row-start-3">
            <div className="group grid h-full overflow-hidden rounded-lg bg-water text-white md:grid-cols-2">
              <div className="p-6 sm:p-9 md:self-center">
                <h3 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {t(irrigation.title)}
                </h3>
                <p className="mt-3 max-w-md text-lg leading-relaxed text-white/85">
                  {t(irrigation.summary)}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
                  <ButtonLink href="/irrigation#irrigation-ask">
                    {t("Get a quotation")}
                  </ButtonLink>
                  <Link href="/irrigation#irrigation-parts" className={more}>
                    {t("Find a fault")}
                  </Link>
                </div>
              </div>
              <div className="relative min-h-44 overflow-hidden md:min-h-80">
                <Image
                  src="/images/irrigation/panel.svg"
                  alt=""
                  width={720}
                  height={460}
                  unoptimized
                  className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none"
                />
              </div>
            </div>
          </Reveal>

          <Reveal as="li" index={1} className="reveal-up">
            <div className={`${small} bg-sun`}>
              <div className="relative z-1 p-6 sm:w-3/5 sm:p-8">
                <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {t(seeds.title)}
                </h3>
                <p className="mt-2 leading-relaxed">{t(seeds.summary)}</p>
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
                  <ButtonLink href="/seeds#catalogue" variant="dark">
                    {t("Browse seeds")}
                  </ButtonLink>
                  <Link href="/seeds#seasons" className={more}>
                    {t("When to plant")}
                  </Link>
                </div>
              </div>
              <Image
                src="/images/home/packets.svg"
                alt=""
                width={340}
                height={360}
                unoptimized
                loading="eager"
                className="-mt-7 mr-3 -mb-7 ml-auto block w-32 transition-transform duration-700 ease-out group-hover:-translate-y-2 sm:absolute sm:right-2 sm:-bottom-10 sm:m-0 sm:w-[42%] motion-reduce:transform-none motion-reduce:transition-none"
              />
            </div>
          </Reveal>

          <Reveal as="li" index={2} className="reveal-up">
            <div className={`${small} bg-[#cfe4ea]`}>
              <div className="relative z-1 p-6 sm:w-3/5 sm:p-8">
                <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {t(consulting.title)}
                </h3>
                <p className="mt-2 leading-relaxed">{t(consulting.summary)}</p>
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
                  <ButtonLink href="/consulting#ask" variant="dark">
                    {t("Ask for advice")}
                  </ButtonLink>
                  <Link href="/consulting#problem" className={more}>
                    {t("Describe a problem")}
                  </Link>
                </div>
              </div>
              <Image
                src="/images/home/plant.svg"
                alt=""
                width={340}
                height={360}
                unoptimized
                className="absolute right-0 bottom-0 block w-32 origin-bottom max-[359px]:w-24 transition-transform duration-700 ease-out group-hover:scale-105 sm:w-[42%] motion-reduce:transform-none motion-reduce:transition-none"
              />
            </div>
          </Reveal>
        </ul>
      </Container>
    </section>
  );
}
