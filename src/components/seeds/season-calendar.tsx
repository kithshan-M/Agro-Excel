import { SectionHeading } from "@/components/sections/section-heading";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { seasons } from "@/data/seeds";
import { step } from "@/lib/motion";

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// The year starts with Maha so each season is one unbroken run.
const year = seasons.flatMap((season, s) =>
  season.months.map((month) => ({ month, season: s })),
);

export function SeasonCalendar() {
  return (
    <section id="seasons" className="scroll-mt-4 py-16 md:py-24">
      <Container>
        <SectionHeading
          title="When to plant"
          text="Sri Lanka has two main growing seasons. The best weeks depend on your area and crop, so ask us before you sow."
        />
        <Reveal className="mt-10">
          <ol
            aria-hidden="true"
            className="grid grid-cols-6 gap-1.5 md:grid-cols-12"
          >
            {year.map(({ month, season }, index) => (
              <li
                key={month}
                style={step(index)}
                className={`reveal-pop flex min-h-14 items-center justify-center rounded-md font-semibold ${season === 0 ? "bg-leaf text-white" : "bg-sun"}`}
              >
                {monthNames[month - 1]}
              </li>
            ))}
          </ol>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {seasons.map((season, index) => (
              <div
                key={season.name}
                style={step(index * 6 + 3)}
                className={`reveal-up border-t-4 pt-4 ${index === 0 ? "border-leaf" : "border-sun"}`}
              >
                <h3 className="text-2xl font-semibold">{season.name}</h3>
                <p className="mt-1 font-semibold">{season.span}</p>
                <p className="mt-1 leading-relaxed text-muted">{season.text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
