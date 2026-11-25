import type { Metadata } from "next";
import { ContactCta } from "@/components/sections/contact-cta";
import { PageIntro } from "@/components/sections/page-intro";
import { ServicePoints } from "@/components/sections/service-points";
import { Container } from "@/components/ui/container";
import { seedGroups } from "@/data/seeds";
import { getService } from "@/data/services";

const service = getService("seeds");

export const metadata: Metadata = {
  title: service.title,
  description: service.summary,
};

export default function SeedsPage() {
  return (
    <>
      <PageIntro title={service.title} text={service.summary} />
      <section className="pt-16">
        <Container>
          <h2 className="text-3xl font-bold tracking-tight">Seeds by crop</h2>
          <dl className="mt-8 border-t border-line">
            {seedGroups.map((group) => (
              <div
                key={group.name}
                className="grid gap-1 border-b border-line py-5 md:grid-cols-[1fr_2fr]"
              >
                <dt className="font-semibold">{group.name}</dt>
                <dd className="text-muted">{group.crops.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>
      <ServicePoints points={service.points} />
      <ContactCta />
    </>
  );
}
