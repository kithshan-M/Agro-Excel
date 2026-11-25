import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { greenhouseTypes } from "@/data/greenhouses";
import { whatsappLink } from "@/lib/whatsapp";
import { SectionHeading } from "./section-heading";

export function TypeList() {
  return (
    <section id="types" className="scroll-mt-13 py-20 md:py-28">
      <Container>
        <SectionHeading
          title="Greenhouse types"
          text="The right one depends on your land, your weather and your crop."
        />
        <ul className="mt-12 grid gap-7 md:grid-cols-2">
          {greenhouseTypes.map((type, index) => {
            const label = `a ${type.name.toLowerCase()}`;
            const link = whatsappLink(label);
            return (
              <Reveal
                as="li"
                key={type.name}
                index={index % 2}
                className="reveal-up group flex flex-col overflow-hidden rounded-lg border border-line bg-white"
              >
                <div className="overflow-hidden">
                  <Image
                    src={type.image}
                    alt=""
                    width={800}
                    height={460}
                    unoptimized
                    className="aspect-[800/460] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h3 className="text-2xl font-semibold">{type.name}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{type.text}</p>
                  <p className="mt-4 border-t border-line pt-4">
                    <span className="font-semibold">Suits:</span> {type.suits}
                  </p>
                  {link && (
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Ask on WhatsApp about ${label}`}
                      className="mt-2 inline-flex min-h-11 items-center self-start font-semibold text-leaf underline underline-offset-4 hover:text-leaf-dark"
                    >
                      Ask on WhatsApp
                    </a>
                  )}
                </div>
              </Reveal>
            );
          })}
        </ul>
        <TypeTable />
      </Container>
    </section>
  );
}

const columns = ["Type", "Keeps rain off", "Keeps insects out", "Air movement"];

function TypeTable() {
  return (
    <Reveal className="reveal-up mt-16">
      <h3 className="text-2xl font-semibold">Compare at a glance</h3>
      <div
        className="mt-5 overflow-x-auto rounded-lg border border-line bg-white"
        role="region"
        aria-label="Comparison of greenhouse types"
        tabIndex={0}
      >
        <table className="w-full min-w-[34rem] text-left">
          <thead className="bg-film">
            <tr>
              {columns.map((heading) => (
                <th key={heading} scope="col" className="px-4 py-4 sm:px-6 font-semibold">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {greenhouseTypes.map((type) => (
              <tr key={type.name} className="border-t border-line">
                <th scope="row" className="px-4 py-4 sm:px-6 font-semibold">
                  {type.name}
                </th>
                <td className="px-4 py-4 sm:px-6 text-muted">{type.rain}</td>
                <td className="px-4 py-4 sm:px-6 text-muted">{type.insects}</td>
                <td className="px-4 py-4 sm:px-6 text-muted">{type.air}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>
  );
}
