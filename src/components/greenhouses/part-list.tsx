import Image from "next/image";
import { Container } from "@/components/ui/container";
import { greenhouseParts } from "@/data/greenhouses";
import { SectionHeading } from "./section-heading";

/** The order of greenhouseParts matches the numbers in cutaway.svg. */
export function PartList() {
  return (
    <section id="parts" className="scroll-mt-13 bg-film py-20 md:py-28">
      <Container>
        <SectionHeading
          title="What goes into it"
          text="We agree on each part with you before building."
        />
        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
          <Image
            src="/images/greenhouses/cutaway.svg"
            alt="Greenhouse with the front opened up and six numbered parts, described in the list that follows."
            width={900}
            height={720}
            unoptimized
            className="w-full rounded-lg border border-line lg:sticky lg:top-20"
          />
          <ol className="border-t border-line">
            {greenhouseParts.map((part, index) => (
              <li key={part.name} className="flex gap-4 border-b border-line py-5">
                <span
                  aria-hidden="true"
                  className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-bold text-white"
                >
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{part.name}</h3>
                  <p className="mt-0.5 leading-relaxed text-muted">{part.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
