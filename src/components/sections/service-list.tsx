import Link from "next/link";
import { Container } from "@/components/ui/container";
import { services } from "@/data/services";

export function ServiceList() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <h2 className="text-3xl font-bold tracking-tight">What we do</h2>
        <ul className="mt-8 border-t border-line">
          {services.map((service) => (
            <li key={service.slug} className="border-b border-line">
              <Link
                href={`/${service.slug}`}
                className="group grid gap-2 py-7 md:grid-cols-[1fr_1.4fr_auto] md:items-baseline md:gap-8"
              >
                <h3 className="text-2xl font-semibold group-hover:text-leaf">
                  {service.title}
                </h3>
                <p className="text-lg text-muted">{service.summary}</p>
                <span className="font-semibold text-leaf underline-offset-4 group-hover:underline">
                  Learn more
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
