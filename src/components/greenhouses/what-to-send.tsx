import { Container } from "@/components/ui/container";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { whatToSend } from "@/data/greenhouses";

/** Closing call to action for the greenhouse page. */
export function WhatToSend({ topic }: { topic: string }) {
  return (
    <section className="bg-leaf py-16 text-white md:py-20">
      <Container className="grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Ask for a quotation
          </h2>
          <p className="mt-3 mb-7 max-w-md text-lg text-white/90">
            These details help us give you a useful answer the first time. Send
            whatever you have.
          </p>
          <WhatsAppButton topic={topic} />
        </div>
        <ul className="border-t border-white/30 text-lg">
          {whatToSend.map((item) => (
            <li key={item} className="border-b border-white/30 py-3">
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
