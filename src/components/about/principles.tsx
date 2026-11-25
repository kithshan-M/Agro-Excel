import { SectionHeading } from "@/components/sections/section-heading";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { principles } from "@/data/about";
import { step } from "@/lib/motion";

export function Principles() {
  return (
    <section className="py-16 md:py-24">
      <Container className="grid gap-8 lg:grid-cols-[1fr_1.7fr] lg:gap-12">
        <SectionHeading
          title="How we work"
          text="What you can expect when you ask us for help."
        />
        <Reveal as="ul" className="grid border-t border-line sm:grid-cols-2 sm:gap-x-10">
          {principles.map((item, index) => (
            <li
              key={item.title}
              style={step(index)}
              className="reveal-up flex gap-4 border-b border-line py-6"
            >
              <svg
                viewBox="0 0 20 20"
                aria-hidden="true"
                className="mt-1 size-5 shrink-0 fill-none stroke-leaf stroke-[2.5]"
              >
                <path
                  d="m3 10.5 4.5 4.5L17 5"
                  pathLength="1"
                  strokeDasharray="1 2"
                  className="reveal-draw"
                  style={step(index + 4)}
                />
              </svg>
              <div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-1 leading-relaxed text-muted">{item.text}</p>
              </div>
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
