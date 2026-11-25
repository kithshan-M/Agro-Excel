"use client";

import { useT } from "@/i18n/context";
import { useId, useState } from "react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { planner } from "@/data/greenhouses";
import { useQuote, type Size } from "./quote-context";

const FEET = 3.28084;
const PERCH = 272.25;
const limits = {
  feet: { length: [20, 200], width: [10, 100], step: 5 },
  metres: { length: [6, 60], width: [3, 30], step: 1 },
};
const number = (value: number) => value.toLocaleString("en-LK", { maximumFractionDigits: 0 });

/** Drag a length and width to see the area and an example layout from above. */
export function SizePlanner() {
  const t = useT();
  const { setSize } = useQuote();
  const [unit, setUnit] = useState<Size["unit"]>("feet");
  const [length, setLength] = useState(planner.sizes[1][0]);
  const [width, setWidth] = useState(planner.sizes[1][1]);
  const id = useId().replace(/\W/g, "");

  const toFeet = unit === "feet" ? 1 : FEET;
  const feet = { length: length * toFeet, width: width * toFeet };
  const area = feet.length * feet.width;
  const { bed, path, end } = planner.layout;
  const beds = Math.max(1, Math.floor((feet.width - path) / (bed + path)));
  const bedLength = feet.length - end * 2;
  const range = limits[unit];

  function changeUnit(next: Size["unit"]) {
    if (next === unit) return;
    const factor = next === "feet" ? FEET : 1 / FEET;
    const fit = (value: number, [low, high]: number[]) => {
      const { step } = limits[next];
      return Math.min(high, Math.max(low, Math.round((value * factor) / step) * step));
    };
    setLength(fit(length, limits[next].length));
    setWidth(fit(width, limits[next].width));
    setUnit(next);
  }

  // Drawing, in a box of 440 by 250 with room for the sizes.
  const scale = Math.min(370 / feet.length, 190 / feet.width);
  const w = feet.length * scale;
  const h = feet.width * scale;
  const x = 12 + (370 - w) / 2;
  const y = 8 + (190 - h) / 2;
  const used = beds * bed + (beds + 1) * path;
  const spare = Math.max(0, feet.width - used) / 2;
  const plants = Math.max(2, Math.floor((bedLength * scale) / 8));
  const hoops = Math.max(2, Math.round(feet.length / 8));

  return (
    <section id="size" className="scroll-mt-13 bg-leaf-dark py-16 text-white md:py-24">
      <Container>
        <Reveal className="reveal-up max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("Plan a size")}</h2>
          <p className="mt-3 text-lg leading-relaxed text-white/85">
            {t("Drag the sliders to see how much space it gives. This is an example layout, and we measure your land before we suggest one.")}
          </p>
        </Reveal>
        <div className="mt-8 grid overflow-hidden rounded-lg border border-white/20 lg:grid-cols-[1fr_1.6fr] lg:grid-rows-[1fr_auto]">
          <div className="order-2 bg-white p-5 text-ink sm:p-8 lg:order-none lg:row-span-2">
            <div className="flex items-center justify-between gap-4">
              <p className="font-semibold" id={`${id}-unit`}>
                {t("Measure in")}
              </p>
              <div role="group" aria-labelledby={`${id}-unit`} className="flex overflow-hidden rounded-md border border-field">
                {(["feet", "metres"] as const).map((item) => (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={unit === item}
                    onClick={() => changeUnit(item)}
                    className="min-h-11 cursor-pointer px-4 font-medium -outline-offset-2 transition-colors hover:bg-film aria-pressed:bg-leaf aria-pressed:text-white"
                  >
                    {t(item)}
                  </button>
                ))}
              </div>
            </div>
            {(
              [
                ["Length", length, setLength, range.length],
                ["Width", width, setWidth, range.width],
              ] as const
            ).map(([label, value, set, [min, max]]) => (
              <div key={label} className="mt-6">
                <div className="flex items-baseline justify-between">
                  <label htmlFor={`${id}-${label}`} className="font-semibold">
                    {t(label)}
                  </label>
                  <output htmlFor={`${id}-${label}`} className="font-display text-xl font-semibold text-leaf">
                    {t(value)} {t(unit)}
                  </output>
                </div>
                <input
                  id={`${id}-${label}`}
                  type="range"
                  min={min}
                  max={max}
                  step={range.step}
                  value={value}
                  aria-valuetext={`${value} ${t(unit)}`}
                  onChange={(event) => set(Number(event.target.value))}
                  className="mt-1 h-11 w-full cursor-pointer accent-leaf"
                />
              </div>
            ))}
            <div role="group" aria-label={t("Sizes to try")} className="mt-4">
              <p aria-hidden="true" className="text-muted">
                {t("Sizes to try")}
              </p>
              <div className="mt-1.5 flex flex-wrap gap-2.5">
                {planner.sizes.map(([l, b]) => (
                  <button
                    key={`${l}x${b}`}
                    type="button"
                    aria-pressed={unit === "feet" && length === l && width === b}
                    onClick={() => {
                      setUnit("feet");
                      setLength(l);
                      setWidth(b);
                    }}
                    className="min-h-11 cursor-pointer rounded-md border border-field px-3 font-medium transition-colors hover:border-leaf aria-pressed:border-leaf aria-pressed:bg-film"
                  >
                    {l} x {b} {t("ft")}
                  </button>
                ))}
              </div>
            </div>
            <a
              href="#quotation"
              onClick={() => setSize({ length: String(length), width: String(width), unit })}
              className="mt-7 inline-flex min-h-12 items-center rounded-md bg-leaf px-6 font-semibold text-white transition-colors hover:bg-leaf-dark"
            >
              {t("Use this size")}
            </a>
          </div>

          <div className="order-1 flex bg-[linear-gradient(rgb(255_255_255/0.06)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.06)_1px,transparent_1px)] bg-[size:24px_24px] p-4 sm:p-8 lg:order-none">
            <svg
              viewBox="0 0 440 250"
              role="img"
              aria-label={t("Greenhouse from above, {length} by {width} {unit}. Beds: {beds}.", {
                length,
                width,
                unit: t(unit),
                beds,
              })}
              className="my-auto max-h-[26rem] w-full"
            >
              <rect x={x} y={y} width={w} height={h} rx="3" fill="#ffffff" fillOpacity="0.1" stroke="#f3f8f4" strokeWidth="2.5" />
              {Array.from({ length: beds }, (_, index) => {
                const top = y + (spare + path + index * (bed + path)) * scale;
                const left = x + end * scale;
                return (
                  <g key={index}>
                    <rect x={left} y={top} width={Math.max(0, bedLength * scale)} height={bed * scale} rx="3" fill="#7a5836" />
                    {Array.from({ length: plants }, (_, plant) => (
                      <circle
                        key={plant}
                        cx={left + ((plant + 0.5) * bedLength * scale) / plants}
                        cy={top + (bed * scale) / 2}
                        r={Math.min(3, bed * scale * 0.36)}
                        fill={plant % 2 ? "#5fae4a" : "#7cc460"}
                      />
                    ))}
                  </g>
                );
              })}
              {Array.from({ length: hoops - 1 }, (_, index) => {
                const at = x + (w / hoops) * (index + 1);
                return <path key={index} d={`M${at} ${y}V${y + h}`} stroke="#f3f8f4" strokeOpacity="0.35" strokeWidth="1" />;
              })}
              {/* Door on the left end */}
              <path d={`M${x} ${y + h / 2 - Math.min(14, h * 0.2)}V${y + h / 2 + Math.min(14, h * 0.2)}`} stroke="#f6b92b" strokeWidth="5" />
              {/* Sizes */}
              <g stroke="#f6b92b" strokeWidth="1.5">
                <path d={`M${x} ${y + h + 14}H${x + w}M${x} ${y + h + 9}v10M${x + w} ${y + h + 9}v10`} />
                <path d={`M${x + w + 14} ${y}V${y + h}M${x + w + 9} ${y}h10M${x + w + 9} ${y + h}h10`} />
              </g>
              <g fill="#ffffff" fontWeight="600" textAnchor="middle" className="text-[15px] lg:text-[12px]">
                <text x={x + w / 2} y={y + h + 36}>
                  {t(length)} {t(unit)}
                </text>
                <text x={x + w + 30} y={y + h / 2} transform={`rotate(90 ${x + w + 30} ${y + h / 2})`} dy="5">
                  {t(width)} {t(unit)}
                </text>
              </g>
            </svg>
          </div>
          <div className="order-3 border-t border-white/20 p-5 sm:p-8 lg:order-none lg:py-6">
            <dl aria-live="polite" className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
              {[
                ["Square feet", number(area)],
                ["Square metres", number(area / FEET / FEET)],
                ["Perches", (area / PERCH).toLocaleString("en-LK", { maximumFractionDigits: 1 })],
                ["Example beds", `${beds} x ${number(unit === "feet" ? bedLength : bedLength / FEET)} ${t(unit === "feet" ? "ft" : "m")}`],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col-reverse justify-end">
                  <dt className="text-white/80">{t(label)}</dt>
                  <dd className="font-display text-2xl font-bold text-sun">{t(value)}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm text-white/75">
              {t("Example beds are {bed} feet wide with {path} foot paths. The yellow mark is the door.", { bed, path })}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
