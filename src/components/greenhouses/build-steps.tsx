import { Container } from "@/components/ui/container";
import type { Service } from "@/data/services";

export function BuildSteps({ steps }: { steps: Service["points"] }) {
  return (
    <section className="bg-leaf-dark py-16 text-white md:py-24">
      <Container>
        <h2 className="text-3xl font-bold tracking-tight">How it works</h2>
        <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, index) => (
            <li key={step.title}>
              <span
                aria-hidden="true"
                className="font-display text-4xl font-bold text-sun"
              >
                {index + 1}
              </span>
              <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-white/85">{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
