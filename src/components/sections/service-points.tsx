import { Container } from "@/components/ui/container";
import type { Service } from "@/data/services";

export function ServicePoints({ points }: { points: Service["points"] }) {
  return (
    <section className="py-16">
      <Container className="grid gap-10 md:grid-cols-3">
        {points.map((point) => (
          <div key={point.title} className="border-t-2 border-leaf pt-4">
            <h2 className="text-xl font-semibold">{point.title}</h2>
            <p className="mt-2 text-muted">{point.text}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}
