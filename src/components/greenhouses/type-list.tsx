import { Container } from "@/components/ui/container";
import { greenhouseTypes } from "@/data/greenhouses";
import { whatsappLink } from "@/lib/whatsapp";
import { TypeDrawing } from "./type-drawing";

export function TypeList() {
  return (
    <section className="bg-film py-16 md:py-24">
      <Container>
        <h2 className="text-3xl font-bold tracking-tight">Greenhouse types</h2>
        <p className="mt-3 max-w-2xl text-lg text-muted">
          The right one depends on your land, your weather and your crop.
        </p>
        <ul className="mt-10 grid gap-x-12 gap-y-14 sm:grid-cols-2">
          {greenhouseTypes.map((type) => {
            const label = `a ${type.name.toLowerCase()}`;
            const link = whatsappLink(label);
            return (
              <li key={type.kind}>
                <TypeDrawing kind={type.kind} />
                <h3 className="mt-5 text-xl font-semibold">{type.name}</h3>
                <p className="mt-2 text-muted">{type.text}</p>
                <p className="mt-2">
                  <span className="font-semibold">Suits:</span> {type.suits}
                </p>
                {link && (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Ask on WhatsApp about ${label}`}
                    className="mt-1 inline-flex min-h-11 items-center font-semibold text-leaf underline underline-offset-4 hover:text-leaf-dark"
                  >
                    Ask on WhatsApp
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
