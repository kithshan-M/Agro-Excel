import { Container } from "@/components/ui/container";
import { showingSamples } from "@/lib/projects";

/** Never shown on the live site: see src/lib/projects.ts. */
export function SampleNote() {
  if (!showingSamples) return null;

  return (
    <div className="bg-ink py-3 text-white">
      <Container>
        <p>
          <strong>Sample projects.</strong> Only you see these, while you build the site. Add your own
          in src/data/projects.ts.
        </p>
      </Container>
    </div>
  );
}
