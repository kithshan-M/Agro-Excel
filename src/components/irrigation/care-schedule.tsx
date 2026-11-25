import { SectionHeading } from "@/components/sections/section-heading";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/config/site";
import { careSchedule } from "@/data/irrigation";
import { step } from "@/lib/motion";
import { SendList } from "./send-list";

const list = [
  "Irrigation checks",
  ...careSchedule.map((group) => [`*${group.when}*`, ...group.tasks.map((task) => `- ${task}`)].join("\n")),
  `From ${siteConfig.name}`,
].join("\n\n");

export function CareSchedule() {
  return (
    <section id="irrigation-care" className="scroll-mt-13 bg-[#d5e9f0] py-16 md:py-24">
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            title="Keep it working"
            text="Simple checks you can do yourself. Send the list to whoever looks after your field, and ask us for the rest."
          />
          <SendList text={list} />
        </div>
        <Reveal as="ul" className="mt-9 grid gap-5 md:grid-cols-3">
          {careSchedule.map((group, index) => (
            <li
              key={group.when}
              style={step(index * 2)}
              className="reveal-up rounded-lg bg-white p-5 sm:p-7"
            >
              <div className="flex items-center gap-3.5 md:block">
                <svg
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                  className="size-11 shrink-0 fill-none md:size-13 stroke-water stroke-[2.5] [stroke-linecap:round] [stroke-linejoin:round]"
                >
                  <path d="M6 10h36v32H6V10Zm0 9h36M15 5v9m18-9v9" className="fill-[#d5e9f0]" />
                  {/* One row, all rows, or a plant. */}
                  {index === 0 && <path d="M13 31h22" className="stroke-sun stroke-[6]" />}
                  {index === 1 && <path d="M13 26h22M13 31h22M13 36h22" className="stroke-sun stroke-[3.5]" />}
                  {index === 2 && (
                    <path d="M24 38V26m0 5c-5 0-8-2.500-8-7 5 0 8 2.500 8 7Zm0-2c0-4 2.500-6 7-6 0 4-2.500 6-7 6Z" className="fill-sun stroke-leaf stroke-2" />
                  )}
                </svg>
                <h3 className="text-xl font-semibold md:mt-4">{group.when}</h3>
              </div>
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
