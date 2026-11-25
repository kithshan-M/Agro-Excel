"use client";

import { useT } from "@/i18n/context";
import { Link } from "@/components/ui/link";
import { Container } from "@/components/ui/container";
import { tasks } from "@/data/home";
import { step } from "@/lib/motion";

const icons = {
  house: "M5 26V14a11 11 0 0 1 22 0v12M5 26h22M16 26v-7M10 26V9.500M22 26V9.500M5 16h22",
  size: "M4 10h24v12H4V10Zm5 0v5m5-5v4m5-4v5m5-5v4",
  drop: "M16 4c5 6.500 8.500 10.500 8.500 15a8.500 8.500 0 0 1-17 0C7.500 14.500 11 10.500 16 4Zm-4 16a4 4 0 0 0 4 4",
  fault: "M20.500 5a7 7 0 0 0-6.300 9.700L5 24l3 3 9.300-9.200A7 7 0 0 0 26.800 9L22 13.500 18.500 10 23 5.400A7 7 0 0 0 20.500 5Z",
  packet: "M8 4h16v24H8V4Zm0 5h16M16 23c0-4 2-6.500 5-6.500 0 4-2 6.500-5 6.500Zm0 0c0-3-1.600-5-4-5 0 3 1.600 5 4 5Z",
  calendar: "M5 7h22v20H5V7Zm0 6h22M11 4v6m10-6v6m-9 8h3m3 0h3m-9 4h3",
  sign: "M5 24C5 11 12 5 27 5c0 14-6 21-18 21-1.500 0-3-.7-4-2Zm0 4 12-13m2 5h.1m2-6h.1m-7.200 8h.1",
  plant: "M16 28V13m0 6c-6 0-9.500-3.500-9.500-9.500 6 0 9.500 3.500 9.500 9.500Zm0-4c0-5.500 3.200-9 9.500-9 0 5.500-3.500 9-9.500 9ZM9 28h14",
};

const tones = {
  greenhouses: "bg-leaf-dark text-white",
  irrigation: "bg-water text-white",
  seeds: "bg-sun text-ink",
  consulting: "bg-[#cfe4ea] text-ink",
};

/** Straight to the tools on the other pages. */
export function Tasks() {
  const t = useT();
  return (
    <section aria-labelledby="tasks" className="relative z-2">
      <Container>
        <div className="enter -mt-8 rounded-lg bg-white p-4 shadow-[0_6px_30px_rgb(19_37_29/0.14)] sm:p-7" style={step(4)}>
          <h2 id="tasks" className="text-2xl font-bold tracking-tight sm:text-3xl">
            {t("What do you want to do?")}
          </h2>
          <ul className="mt-4 grid grid-cols-2 gap-2.5 sm:mt-5 sm:gap-3 lg:grid-cols-4">
            {tasks.map((task) => (
              <li key={task.href}>
                <Link
                  href={task.href}
                  className="group flex h-full flex-col items-start gap-2.5 rounded-md border border-line p-3 transition-colors hover:border-leaf hover:bg-paper sm:flex-row sm:items-center sm:gap-3.5"
                >
                  <span
                    className={`flex size-12 shrink-0 items-center justify-center rounded-md transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none ${tones[task.service]}`}
                  >
                    <svg
                      viewBox="0 0 32 32"
                      aria-hidden="true"
                      className="size-7 fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
                    >
                      <path d={icons[task.icon]} />
                    </svg>
                  </span>
                  <span className="leading-tight font-semibold group-hover:text-leaf">{t(task.label)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
