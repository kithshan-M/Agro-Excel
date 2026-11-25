import { Container } from "@/components/ui/container";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

/** topic is added to the WhatsApp message, e.g. "greenhouse construction". */
export function ContactCta({ topic }: { topic?: string }) {
  return (
    <section className="border-t border-line bg-film py-14">
      <Container className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Planning your next crop?
          </h2>
          <p className="mt-2 text-lg text-muted">
            Tell us about your land and what you want to grow.
          </p>
        </div>
        <div className="shrink-0">
          <WhatsAppButton topic={topic} />
        </div>
      </Container>
    </section>
  );
}
