import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "@/components/sections/section-heading";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { journey } from "@/data/home";
import { step } from "@/lib/motion";

export function Journey() {
  return (
    <section className="bg-film py-16 md:py-24">
      <Container>
        <SectionHeading
          title="From empty land to harvest"
          text="Start at whichever step you are at now."
        />
        <Reveal
          as="ol"
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5"
        >
          {journey.map((item, index) => (
            <li key={item.title} className="relative">
              {index > 0 && (
                <span
                  aria-hidden="true"
                  style={step(index * 2)}
                  className="reveal-line absolute top-[5.5rem] -left-5 hidden h-0.5 w-5 origin-left bg-leaf [--line-from:0,1] lg:block"
                />
              )}
              <div className="reveal-up h-full" style={step(index * 2)}>
                <Link
                  href={item.href}
                  className="group flex h-full gap-4 overflow-hidden rounded-lg border border-line bg-white transition-colors hover:border-leaf sm:block"
                >
                  <div className="relative w-28 shrink-0 overflow-hidden sm:h-44 sm:w-full">
                    <Image
                      src={item.image}
                      alt=""
                      width={560}
                      height={480}
                      unoptimized
                      className="absolute inset-0 size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute top-3 left-3 flex size-9 items-center justify-center rounded-full bg-sun font-display font-bold text-ink"
                    >
                      {index + 1}
                    </span>
                  </div>
                  <div className="py-4 pr-4 sm:p-5">
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="mt-1 leading-relaxed text-muted">{item.text}</p>
                    <p className="mt-3 font-semibold text-leaf underline-offset-4 group-hover:underline">
                      {item.link}
                    </p>
                  </div>
                </Link>
              </div>
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
