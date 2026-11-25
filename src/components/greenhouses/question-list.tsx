import { Container } from "@/components/ui/container";
import { greenhouseQuestions } from "@/data/greenhouses";
import { SectionHeading } from "./section-heading";

export function QuestionList() {
  return (
    <section
      id="questions"
      className="scroll-mt-13 border-t border-line py-20 md:py-28"
    >
      <Container className="grid gap-8 lg:grid-cols-[1fr_1.7fr]">
        <SectionHeading title="Common questions" />
        <div className="rounded-lg border border-line bg-white">
          {greenhouseQuestions.map((item, index) => (
            <details
              key={item.question}
              open={index === 0}
              className="group border-b border-line last:border-b-0"
            >
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                {item.question}
                <svg
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                  className="size-5 shrink-0 fill-none stroke-leaf stroke-2 group-open:rotate-180"
                >
                  <path d="m4 7 6 6 6-6" />
                </svg>
              </summary>
              <p className="px-6 pb-6 leading-relaxed text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
