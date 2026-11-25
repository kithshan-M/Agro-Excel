import { Container } from "@/components/ui/container";
import { greenhouseParts } from "@/data/greenhouses";

export function PartList() {
  return (
    <section className="py-16 md:py-24">
      <Container className="grid gap-8 md:grid-cols-[1fr_2fr]">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">What goes into it</h2>
          <p className="mt-3 text-lg text-muted">
            We agree on each part with you before building.
          </p>
        </div>
        <dl className="border-t border-line">
          {greenhouseParts.map((part) => (
            <div
              key={part.name}
              className="grid gap-1 border-b border-line py-4 sm:grid-cols-[1fr_2fr] sm:gap-6"
            >
              <dt className="font-semibold">{part.name}</dt>
              <dd className="text-muted">{part.text}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
