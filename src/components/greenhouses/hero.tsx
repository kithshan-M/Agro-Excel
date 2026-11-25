import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { benefits } from "@/data/greenhouses";
import type { Service } from "@/data/services";

export function GreenhouseHero({ service }: { service: Service }) {
  return (
    <section className="overflow-hidden bg-leaf-dark text-white">
      <Container className="grid items-center gap-6 pt-14 lg:grid-cols-[1fr_1.15fr] lg:pt-10">
        <div>
          <h1 className="text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            {service.title}
          </h1>
          <p className="mt-5 max-w-md text-xl leading-relaxed text-white/85">
            {service.summary}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <WhatsAppButton topic={service.title.toLowerCase()} />
            <ButtonLink href="#types" variant="outline">
              Compare types
            </ButtonLink>
          </div>
        </div>
        <Image
          src="/images/greenhouses/hero.svg"
          alt=""
          width={1100}
          height={640}
          unoptimized
          preload
          className="-mx-4 w-[calc(100%+2rem)] max-w-none sm:mx-0 sm:w-full lg:w-[125%]"
        />
      </Container>
      <div className="border-t border-white/15">
        <Container className="grid divide-y divide-white/15 md:grid-cols-3 md:divide-x md:divide-y-0">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="py-7 md:px-8 md:first:pl-0 md:last:pr-0"
            >
              <h2 className="text-lg font-semibold">{benefit.title}</h2>
              <p className="mt-1.5 leading-relaxed text-white/75">{benefit.text}</p>
            </div>
          ))}
        </Container>
      </div>
    </section>
  );
}
