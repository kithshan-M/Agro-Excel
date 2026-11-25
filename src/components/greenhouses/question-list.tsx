import { SectionHeading } from "@/components/sections/section-heading";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { greenhouseQuestions } from "@/data/greenhouses";
import { whatsappLink } from "@/lib/whatsapp";

export function QuestionList() {
  const link = whatsappLink("greenhouse construction");
  return (
    <section
      id="questions"
      className="scroll-mt-13 border-t border-line py-16 md:py-24"
    >
      <Container className="grid gap-8 lg:grid-cols-[1fr_1.7fr]">
        <div>
          <SectionHeading title="Common questions" />
          <p className="mt-3 text-lg text-muted">
            Something else on your mind?{" "}
            <a
              href={link ?? "/contact"}
              className="font-semibold text-leaf underline underline-offset-4 hover:text-leaf-dark"
            >
              {link ? "Ask us on WhatsApp" : "Contact us"}
            </a>
          </p>
        </div>
        <Reveal className="reveal-up rounded-lg border border-line bg-white">
          {greenhouseQuestions.map((item, index) => (
            <details
              key={item.question}
              open={index === 0}
              className="smooth-details group border-b border-line last:border-b-0"
            >
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 sm:px-6 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                {item.question}
                <svg
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                  className="size-5 shrink-0 fill-none stroke-leaf stroke-2 transition-transform duration-300 group-open:rotate-180 motion-reduce:transition-none"
                >
                  <path d="m4 7 6 6 6-6" />
                </svg>
              </summary>
              <p className="px-5 pb-6 sm:px-6 leading-relaxed text-muted">{item.answer}</p>
            </details>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
