import Image from "next/image";
import { SectionHeading } from "@/components/sections/section-heading";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { photoGuide } from "@/data/consulting";

export function PhotoGuide() {
  return (
    <section id="photos" className="scroll-mt-13 py-16 md:py-24">
      <Container>
        <SectionHeading
          title="Photos that help us"
          text="Take these four in daylight and send them with your message."
        />
        <ol className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4 lg:gap-x-6">
          {photoGuide.map((photo, index) => (
            <Reveal as="li" key={photo.key} index={index} className="reveal-up">
              <Image
                src={`/images/consulting/photo-${photo.key}.svg`}
                alt=""
                width={360}
                height={300}
                unoptimized
                className="w-full rounded-lg"
              />
              <h3 className="mt-4 text-lg font-semibold sm:text-xl">{photo.title}</h3>
              <p className="mt-1 leading-relaxed text-muted">{photo.text}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
