import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

/** topic is added to the WhatsApp message, e.g. "greenhouse construction". */
export function ContactCta({ topic }: { topic?: string }) {
  return (
    <section className="bg-leaf py-20 text-white">
      <Container>
        <Reveal className="reveal-up flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Planning your next crop?
            </h2>
            <p className="mt-3 text-lg text-white/90">
              Tell us about your land and what you want to grow.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <WhatsAppButton topic={topic} />
            <ButtonLink href="/consulting#ask" variant="outline">
              Ask for advice
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
