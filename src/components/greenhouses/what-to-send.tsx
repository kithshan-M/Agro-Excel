import { Container } from "@/components/ui/container";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { whatToSend } from "@/data/greenhouses";

/** Closing call to action for the greenhouse page. */
export function WhatToSend({ topic }: { topic: string }) {
  return (
    <section id="quotation" className="scroll-mt-20 pb-20 md:pb-28">
      <Container>
        <div className="grid overflow-hidden rounded-lg bg-leaf text-white lg:grid-cols-[1.1fr_1fr]">
          <div className="p-8 sm:p-12 lg:p-14">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ask for a quotation
            </h2>
            <p className="mt-4 mb-8 max-w-md text-lg leading-relaxed text-white/90">
              These details help us give you a useful answer the first time. Send
              whatever you have.
            </p>
            <WhatsAppButton topic={topic} />
          </div>
          <div className="bg-leaf-dark p-8 sm:p-12 lg:p-14">
            <h3 className="text-xl font-semibold">What to send us</h3>
            <ul className="mt-5 space-y-4 text-lg">
              {whatToSend.map((item) => (
                <li key={item} className="flex gap-4">
                  <svg
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    className="mt-1 size-5 shrink-0 fill-none stroke-sun stroke-[2.5]"
                  >
                    <path d="m3 10.5 4.5 4.5L17 5" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
