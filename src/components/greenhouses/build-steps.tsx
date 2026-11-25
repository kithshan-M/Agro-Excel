import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import type { Service } from "@/data/services";
import { step as delay } from "@/lib/motion";
import { SectionHeading } from "./section-heading";

export function BuildSteps({ steps }: { steps: Service["points"] }) {
  return (
    <section id="process" className="scroll-mt-13 py-16 md:py-24">
      <Container>
        <SectionHeading title="How it works" />
        <Reveal as="ol" className="mt-12 lg:grid lg:grid-cols-5">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="group relative flex gap-5 pb-9 last:pb-0 lg:block lg:pr-7 lg:pb-0"
            >
              <span
                aria-hidden="true"
                style={delay(index * 3 + 2)}
                className="reveal-line absolute top-11 bottom-0 left-[1.3125rem] w-0.5 origin-top bg-line [--line-from:1,0] group-last:hidden lg:top-[1.3125rem] lg:right-0 lg:bottom-auto lg:left-11 lg:h-0.5 lg:w-auto lg:origin-left lg:[--line-from:0,1]"
              />
              <span
                aria-hidden="true"
                style={delay(index * 3)}
                className="reveal-pop relative flex size-11 shrink-0 items-center justify-center rounded-full bg-leaf font-display text-lg font-bold text-white"
              >
                {index + 1}
              </span>
              <div className="reveal-up pt-1.5 lg:pt-5" style={delay(index * 3 + 1)}>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{step.text}</p>
              </div>
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
