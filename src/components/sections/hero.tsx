import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { GreenhouseArt } from "./greenhouse-art";

export function Hero() {
  return (
    <section className="bg-leaf text-white">
      <Container className="grid items-end gap-10 pt-14 md:grid-cols-2 md:pt-20">
        <div className="md:pb-20">
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            Build the greenhouse. Plant the right seed. Grow with advice.
          </h1>
          <p className="mt-5 max-w-md text-lg text-white/90">
            We construct greenhouses, sell vegetable seeds and advise growers on
            their crops.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/contact">Contact us</ButtonLink>
            <ButtonLink href="/seeds" variant="outline">
              See our seeds
            </ButtonLink>
          </div>
        </div>
        <GreenhouseArt className="block w-full" />
      </Container>
    </section>
  );
}
