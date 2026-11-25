import { Container } from "@/components/ui/container";
import { greenhouseQuestions } from "@/data/greenhouses";

export function QuestionList() {
  return (
    <section className="py-16 md:py-24">
      <Container className="grid gap-8 md:grid-cols-[1fr_2fr]">
        <h2 className="text-3xl font-bold tracking-tight">Common questions</h2>
        <div className="border-t border-line">
          {greenhouseQuestions.map((item) => (
            <details key={item.question} className="group border-b border-line">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                {item.question}
                <span
                  aria-hidden="true"
                  className="text-2xl leading-none text-leaf group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="max-w-2xl pb-5 text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
