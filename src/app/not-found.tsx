import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <section className="py-24">
      <Container>
        <h1 className="text-4xl font-bold tracking-tight">Page not found</h1>
        <p className="mt-4 mb-8 text-lg text-muted">
          This page may have moved, or the address may be mistyped.
        </p>
        <ButtonLink href="/">Go to the home page</ButtonLink>
      </Container>
    </section>
  );
}
