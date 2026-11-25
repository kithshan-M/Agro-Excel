import { Container } from "@/components/ui/container";

export function PageIntro({ title, text }: { title: string; text: string }) {
  return (
    <section className="bg-leaf py-14 text-white md:py-20">
      <Container>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-white/90">{text}</p>
      </Container>
    </section>
  );
}
