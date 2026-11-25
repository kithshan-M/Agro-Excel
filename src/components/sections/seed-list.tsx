import { Container } from "@/components/ui/container";
import { seedGroups } from "@/data/seeds";
import { whatsappLink } from "@/lib/whatsapp";

export function SeedList() {
  return (
    <section className="pt-16">
      <Container>
        <h2 className="text-3xl font-bold tracking-tight">Seeds by crop</h2>
        <p className="mt-3 max-w-2xl text-lg text-muted">
          Pick a crop and message us on WhatsApp for varieties, prices and stock.
        </p>
        <div className="mt-8 border-t border-line">
          {seedGroups.map((group) => (
            <div
              key={group.name}
              className="grid gap-3 border-b border-line py-7 md:grid-cols-[1fr_2fr] md:gap-8"
            >
              <h3 className="text-xl font-semibold">{group.name}</h3>
              <ul className="grid gap-x-8 sm:grid-cols-2">
                {group.crops.map((crop) => (
                  <SeedRow key={crop} crop={crop} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function SeedRow({ crop }: { crop: string }) {
  const link = whatsappLink(`${crop} seeds`);
  return (
    <li className="flex min-h-12 items-center justify-between gap-4">
      <span>{crop}</span>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Ask on WhatsApp about ${crop} seeds`}
          className="inline-flex min-h-11 shrink-0 items-center font-semibold text-leaf underline underline-offset-4 hover:text-leaf-dark"
        >
          Ask on WhatsApp
        </a>
      )}
    </li>
  );
}
