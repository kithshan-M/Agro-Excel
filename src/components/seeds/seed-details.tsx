"use client";

import { useHref, useLang, useT, useWhatsapp } from "@/i18n/context";
import Image from "next/image";
import { Link } from "@/components/ui/link";
import { useEffect, useRef, useState } from "react";
import { greenhouseTypes } from "@/data/greenhouses";
import { irrigationTypes } from "@/data/irrigation";
import { seedImage, seedKinds, type Seed } from "@/data/seeds";
import { useSeedList } from "@/lib/seed-list";
import { AddOrCount } from "./pack-stepper";

/** Names used for this seed on the irrigation and greenhouse pages. */
const aliases = (seed: Seed) => [
  seed.name,
  ...(seed.kind === "Leafy" ? ["Leafy vegetables"] : []),
  ...(seed.slug === "green-chilli" ? ["Chilli"] : []),
];

/** Panel about one seed, with the seeds before and after it a tap away. */
export function SeedDetails({
  seeds,
  seed: current,
  onChange,
  onClose,
}: {
  /** The seeds on show, for Previous and Next. */
  seeds: Seed[];
  seed: Seed | undefined;
  onChange: (slug: string) => void;
  onClose: () => void;
}) {
  const t = useT();
  const lang = useLang();
  const to = useHref();
  const whatsappLink = useWhatsapp();
  const dialog = useRef<HTMLDialogElement>(null);
  const list = useSeedList();
  const open = Boolean(current);
  // Keeps showing the last seed while the panel slides away.
  const [last, setLast] = useState(current);
  if (current && current !== last) setLast(current);
  const seed = current ?? last;

  useEffect(() => {
    const element = dialog.current;
    if (open && element && !element.open) element.showModal();
    // Leaving the page keeps it in memory, so close the panel first.
    return () => element?.close();
  }, [open]);

  const place = seeds.findIndex((item) => item.slug === seed?.slug);
  const kind = seedKinds.find((item) => item.name === seed?.kind) ?? seedKinds[0];
  const names = seed ? aliases(seed) : [];
  const water = irrigationTypes.filter((type) => type.crops.some((crop) => names.includes(crop)));
  const cover = greenhouseTypes.filter((type) => type.crops.some((crop) => names.includes(crop)));
  const facts = seed
    ? ([
        ["Grows in", seed.area === "Most areas" ? "Most areas" : `${seed.area} areas`],
        ["How to start", seed.start],
        ["Support", seed.support ? "Needs stakes, strings or a trellis" : "Not needed"],
        ["Under cover", seed.greenhouse ? "Often grown in a greenhouse" : "Usually in the open"],
        ["Spacing", seed.spacing],
        ["First harvest", seed.harvest],
      ].filter(([, value]) => value) as [string, string][])
    : [];
  const ask =
    seed &&
    (whatsappLink("{name} seeds", { name: t(seed.name).toLowerCase() }) ?? to("/contact#message"));

  return (
    <dialog
      ref={dialog}
      aria-label={t(seed?.name)}
      onClose={onClose}
      onClick={(event) => event.target === dialog.current && dialog.current?.close()}
      className="fixed inset-x-0 top-auto bottom-0 m-0 max-h-[92dvh] w-full max-w-none translate-y-full overflow-y-auto rounded-t-xl bg-white text-ink transition-[translate,display,overlay] duration-300 transition-discrete backdrop:bg-ink/55 open:translate-y-0 motion-reduce:transition-none sm:inset-0 sm:m-auto sm:max-h-[88dvh] sm:w-[min(52rem,calc(100%-3rem))] sm:translate-y-6 sm:rounded-lg starting:open:translate-y-full sm:starting:open:translate-y-6"
    >
      {seed && (
        <div className="sm:grid sm:grid-cols-[1fr_1.25fr]">
          <div className={`relative flex items-center ${kind.tile}`}>
            <Image
              key={seed.slug}
              src={seedImage(seed)}
              alt=""
              width={640}
              height={520}
              unoptimized={!seed.photo}
              className="enter mx-auto max-h-52 w-auto object-contain sm:max-h-none sm:w-full"
            />
            <span className={`absolute top-3 left-3 rounded px-2.5 py-1 text-sm font-semibold text-white ${kind.band}`}>
              {t(seed.kind)}
            </span>
          </div>
          <div className="flex flex-col p-5 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">{t(seed.name)}</h2>
                {seed.localName && lang === "en" && (
                  <p className="text-lg text-muted">{seed.localName}</p>
                )}
              </div>
              <button
                type="button"
                aria-label={t("Close")}
                onClick={() => dialog.current?.close()}
                className="-mt-1 -mr-2 flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white transition-colors hover:bg-film max-sm:fixed max-sm:top-2 max-sm:right-3 max-sm:m-0 max-sm:shadow-[0_1px_8px_rgb(19_37_29/0.25)]"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 fill-none stroke-current stroke-[2.5] [stroke-linecap:round]">
                  <path d="m6 6 12 12M18 6 6 18" />
                </svg>
              </button>
            </div>
            <dl className="mt-4">
              {facts.map(([name, value]) => (
                <div key={name} className="grid grid-cols-[7.5rem_1fr] gap-3 border-t border-line py-2.5">
                  <dt className="text-muted">{t(name)}</dt>
                  <dd className="font-medium">{t(value)}</dd>
                </div>
              ))}
              {(water.length > 0 || cover.length > 0) && (
                <div className="grid grid-cols-[7.5rem_1fr] gap-3 border-t border-line py-2.5">
                  <dt className="text-muted">{t("Often suits")}</dt>
                  <dd className="flex flex-wrap gap-x-4 gap-y-1">
                    {water.map((type) => (
                      <Link key={type.key} href="/irrigation#irrigation-types" className={link}>
                        {t("{type} irrigation", { type: t(type.name) })}
                      </Link>
                    ))}
                    {cover.map((type) => (
                      <Link key={type.name} href="/greenhouses#types" className={link}>
                        {t(type.name)}
                      </Link>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
            {/* Stays in view on phones. */}
            <div className="max-sm:sticky max-sm:bottom-0 max-sm:-mx-5 max-sm:-mb-5 max-sm:border-t max-sm:border-line max-sm:bg-white max-sm:px-5 max-sm:pb-[max(0.75rem,env(safe-area-inset-bottom))]">
              <div className="mt-4 grid grid-cols-2 gap-3 max-sm:mt-3">
                <div>
                  <AddOrCount slug={seed.slug} name={seed.name} count={list[seed.slug] ?? 0} />
                </div>
                <a
                  href={ask}
                  {...(ask?.startsWith("https") && { target: "_blank", rel: "noopener noreferrer" })}
                  className="flex min-h-11 items-center justify-center rounded-md bg-film px-2 text-center leading-tight font-semibold transition-colors hover:bg-line"
                >
                  {t("Ask about varieties")}
                </a>
              </div>
              {seeds.length > 1 && place >= 0 && (
                <div className="mt-5 flex items-center justify-between border-t border-line pt-3 max-sm:mt-1 max-sm:border-t-0 max-sm:pt-1">
                  <Turn label={t("Previous")} onClick={() => onChange(seeds[(place + seeds.length - 1) % seeds.length].slug)} />
                  <span className="text-muted">
                    {t("{count} of {total}", { count: place + 1, total: seeds.length })}
                  </span>
                  <Turn label={t("Next")} onClick={() => onChange(seeds[(place + 1) % seeds.length].slug)} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}

const link = "font-semibold text-leaf underline underline-offset-4 hover:text-leaf-dark";

function Turn({ label, onClick }: { label: string; onClick: () => void }) {
  const t = useT();
  return (
    <button
      type="button"
      onClick={onClick}
      className="min-h-11 cursor-pointer rounded-md px-3 font-semibold text-leaf transition-colors hover:bg-film"
    >
      {t(label)}
    </button>
  );
}
