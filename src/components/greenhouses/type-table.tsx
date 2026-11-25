import { Reveal } from "@/components/ui/reveal";
import { greenhouseTypes } from "@/data/greenhouses";

const columns = ["Type", "Keeps rain off", "Keeps insects out", "Air movement"];

/** Phones show the same facts inside each card instead. */
export function TypeTable() {
  return (
    <Reveal className="reveal-up mt-14 hidden md:block">
      <h3 className="text-2xl font-semibold">Compare at a glance</h3>
      <div className="mt-5 overflow-hidden rounded-lg border border-line bg-white">
        <table className="w-full text-left">
          <thead className="bg-film">
            <tr>
              {columns.map((heading) => (
                <th key={heading} scope="col" className="px-6 py-4 font-semibold">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {greenhouseTypes.map((type) => (
              <tr key={type.name} className="border-t border-line">
                <th scope="row" className="px-6 py-4 font-semibold">
                  {type.name}
                </th>
                {[type.rain, type.insects, type.air].map((value, index) => (
                  <td key={columns[index + 1]} className="px-6 py-4 text-muted">
                    <Mark value={value} />
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Reveal>
  );
}

/** Tick or cross before answers that start with Yes or No. */
function Mark({ value }: { value: string }) {
  const path = /^Yes/.test(value)
    ? "m3 10.5 4.5 4.5L17 5"
    : /^No/.test(value)
      ? "m5 5 10 10M15 5 5 15"
      : null;
  if (!path) return null;
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className="mr-2 inline size-4 -translate-y-px fill-none stroke-current stroke-[2.5] text-leaf"
    >
      <path d={path} />
    </svg>
  );
}
