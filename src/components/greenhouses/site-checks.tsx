import { SendList } from "@/components/sections/send-list";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/config/site";
import { siteChecks } from "@/data/greenhouses";

const list = [
  "*Before the site check*",
  siteChecks.map((check) => `- ${check}`).join("\n"),
  `From ${siteConfig.name}`,
].join("\n\n");

/** What the visitor can get ready, as a list to send on. */
export function SiteChecks() {
  return (
    <section aria-labelledby="site-checks" className="pb-16 md:pb-24">
      <Container>
        <Reveal className="reveal-up grid gap-x-12 gap-y-7 rounded-lg bg-[#fdf0c8] p-6 sm:p-9 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <h3 id="site-checks" className="text-2xl font-bold tracking-tight sm:text-3xl">
              Before the site check
            </h3>
            <p className="mt-2 mb-6 text-lg leading-relaxed">
              Knowing these makes the visit quicker and the price closer. Skip any you are not sure of.
            </p>
            <SendList text={list} tone="leaf" />
          </div>
          <ul className="grid content-start gap-x-8 sm:grid-cols-2">
            {siteChecks.map((check) => (
              <li key={check} className="flex gap-3.5 border-t border-ink/15 py-3.5 leading-snug">
                <span
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 rounded border-2 border-leaf bg-white"
                />
                {check}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
