import { SectionHeading } from "@/components/sections/section-heading";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { careSchedule } from "@/data/irrigation";
import { step } from "@/lib/motion";

export function CareSchedule() {
  return (
    <section id="irrigation-care" className="scroll-mt-13 bg-[#d5e9f0] py-16 md:py-24">
      <Container>
        <SectionHeading
          title="Keep it working"
          text="Simple checks you can do yourself. Ask us for the rest."
        />
        <Reveal as="ul" className="mt-10 grid gap-8 md:grid-cols-3 md:gap-6">
          {careSchedule.map((group, index) => (
            <li
              key={group.when}
              style={step(index * 2)}
              className="reveal-up border-t-4 border-water pt-5"
            >
              <h3 className="text-xl font-semibold">{group.when}</h3>
              <ul className="mt-3 space-y-2.5">
                {group.tasks.map((task) => (
                  <li key={task} className="flex gap-3 leading-relaxed">
                    <span
                      aria-hidden="true"
                      className="mt-2 size-2.5 shrink-0 rounded-full rounded-tl-none bg-water"
                    />
                    {task}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
