import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { getService } from "@/data/services";
import { SectionHeading } from "./section-heading";

const next = [getService("seeds"), getService("consulting")];

export function NextSteps() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading title="Once it is built" />
        <ul className="mt-8 grid gap-5 md:grid-cols-2">
          {next.map((service, index) => (
            <Reveal as="li" key={service.slug} index={index} className="reveal-up">
              <Link
                href={`/${service.slug}`}
                className="group flex h-full items-start justify-between gap-5 rounded-lg border border-line bg-white p-6 transition-colors hover:border-leaf sm:p-7"
              >
                <span>
                  <span className="block font-display text-xl font-semibold group-hover:text-leaf">
                    {service.title}
                  </span>
                  <span className="mt-1 block text-muted">{service.summary}</span>
                </span>
                <svg
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                  className="mt-0.5 size-6 shrink-0 fill-none stroke-leaf stroke-2 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                >
                  <path d="M3 10h13m-5-5 5 5-5 5" />
                </svg>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
