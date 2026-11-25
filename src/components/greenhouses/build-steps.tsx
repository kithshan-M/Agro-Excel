import { Container } from "@/components/ui/container";
import type { Service } from "@/data/services";
import { SectionHeading } from "./section-heading";

export function BuildSteps({ steps }: { steps: Service["points"] }) {
  return (
    <section id="process" className="scroll-mt-13 py-20 md:py-28">
      <Container>
        <SectionHeading title="How it works" />
        <ol className="mt-12 lg:grid lg:grid-cols-5">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="group relative flex gap-5 pb-9 last:pb-0 lg:block lg:pr-7 lg:pb-0"
            >
              <span
                aria-hidden="true"
                className="absolute top-11 bottom-0 left-[1.3125rem] w-0.5 bg-line group-last:hidden lg:top-[1.3125rem] lg:right-0 lg:bottom-auto lg:left-11 lg:h-0.5 lg:w-auto"
              />
              <span
                aria-hidden="true"
                className="relative flex size-11 shrink-0 items-center justify-center rounded-full bg-leaf font-display text-lg font-bold text-white"
              >
                {index + 1}
              </span>
              <div className="pt-1.5 lg:pt-5">
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
