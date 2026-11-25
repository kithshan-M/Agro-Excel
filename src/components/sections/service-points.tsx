import { Container } from "@/components/ui/container";
import type { Service } from "@/data/services";

export function ServicePoints({
  title,
  points,
}: {
  title?: string;
  points: Service["points"];
}) {
  const Heading = title ? "h3" : "h2";
  return (
    <section className="py-16">
      <Container>
        {title && (
          <h2 className="mb-8 text-3xl font-bold tracking-tight">{title}</h2>
        )}
        <div className="grid gap-10 md:grid-cols-3">
          {points.map((point) => (
            <div key={point.title} className="border-t-2 border-leaf pt-4">
              <Heading className="text-xl font-semibold">{point.title}</Heading>
              <p className="mt-2 text-muted">{point.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
