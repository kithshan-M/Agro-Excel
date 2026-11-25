import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/sections/section-heading";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { reasons } from "@/data/about";

export function Reasons() {
  return (
    <section className="bg-film py-16 md:py-24">
      <Container>
        <SectionHeading
          title="Why one team helps"
          text="The greenhouse, the water, the seed and the advice work best when they match."
        />
        <ul className="mt-10 grid gap-9 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {reasons.map((reason, index) => (
            <Reveal as="li" key={reason.title} index={index} className="reveal-up">
              <Link href={reason.href} className="group block">
                <div className="relative h-48 overflow-hidden rounded-lg bg-sun">
                  <Image
                    src={reason.image}
                    alt=""
                    width={720}
                    height={520}
                    unoptimized
                    className="absolute inset-0 size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
                  />
                </div>
                <h3 className="mt-5 text-xl font-semibold">{reason.title}</h3>
                <p className="mt-1.5 leading-relaxed text-muted">{reason.text}</p>
                <p className="mt-2 font-semibold text-leaf underline-offset-4 group-hover:underline">
                  {reason.link}
                </p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
