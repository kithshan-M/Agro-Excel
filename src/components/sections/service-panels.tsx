import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { getService } from "@/data/services";
import { SectionHeading } from "./section-heading";

const greenhouses = getService("greenhouses");
const seeds = getService("seeds");
const consulting = getService("consulting");

const small =
  "group relative flex h-full flex-col overflow-hidden rounded-lg sm:min-h-64";
const more =
  "inline-flex min-h-12 items-center font-semibold underline underline-offset-4";

/** The three services, each in the colour of its own page. */
export function ServicePanels() {
  return (
    <section id="services" className="scroll-mt-4 py-16 md:py-24">
      <Container>
        <SectionHeading title="What we do" />
        <ul className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_1fr] lg:grid-rows-2">
          <Reveal as="li" className="reveal-up lg:row-span-2">
            <div className="group flex h-full flex-col overflow-hidden rounded-lg bg-leaf-dark text-white">
              <div className="p-6 sm:p-9">
                <h3 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {greenhouses.title}
                </h3>
                <p className="mt-3 max-w-md text-lg leading-relaxed text-white/85">
                  {greenhouses.summary}
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
                  <ButtonLink href="/greenhouses#quotation">
                    Get a quotation
                  </ButtonLink>
                  <Link href="/greenhouses" className={more}>
                    See greenhouses
                  </Link>
                </div>
              </div>
              <div className="mt-auto overflow-hidden pl-4 sm:pl-8">
                <Image
                  src="/images/greenhouses/hero-still.svg"
                  alt=""
                  width={1100}
                  height={640}
                  unoptimized
                  className="block w-[132%] max-w-none transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none"
                />
              </div>
            </div>
          </Reveal>

          <Reveal as="li" index={1} className="reveal-up">
            <div className={`${small} bg-sun`}>
              <div className="relative z-1 p-6 sm:w-3/5 sm:p-8">
                <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {seeds.title}
                </h3>
                <p className="mt-2 leading-relaxed">{seeds.summary}</p>
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
                  <ButtonLink href="/seeds#catalogue" variant="dark">
                    Browse seeds
                  </ButtonLink>
                  <Link href="/seeds#seasons" className={more}>
                    When to plant
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
                className="mx-auto -mb-16 block w-56 transition-transform duration-700 ease-out group-hover:-translate-y-2 sm:absolute sm:right-2 sm:-bottom-10 sm:mx-0 sm:mb-0 sm:w-[42%] motion-reduce:transform-none motion-reduce:transition-none"
              />
            </div>
          </Reveal>

          <Reveal as="li" index={2} className="reveal-up">
            <div className={`${small} bg-[#cfe4ea]`}>
              <div className="relative z-1 p-6 sm:w-3/5 sm:p-8">
                <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {consulting.title}
                </h3>
                <p className="mt-2 leading-relaxed">{consulting.summary}</p>
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
                  <ButtonLink href="/consulting#ask" variant="dark">
                    Ask for advice
                  </ButtonLink>
                  <Link href="/consulting#problem" className={more}>
                    Describe a problem
                  </Link>
                </div>
              </div>
              <Image
                src="/images/home/plant.svg"
                alt=""
                width={340}
                height={360}
                unoptimized
                className="mx-auto block w-56 origin-bottom transition-transform duration-700 ease-out group-hover:scale-105 sm:absolute sm:right-0 sm:bottom-0 sm:mx-0 sm:w-[42%] motion-reduce:transform-none motion-reduce:transition-none"
              />
            </div>
          </Reveal>
        </ul>
      </Container>
    </section>
  );
}
