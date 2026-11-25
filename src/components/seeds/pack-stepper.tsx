"use client";

import { useT } from "@/i18n/context";
import { setPacks } from "@/lib/seed-list";

export const packs = (count: number) => (count === 1 ? "{count} pack" : "{count} packs");

/** Fewer and more packs. Going below one takes the seed off the list. */
export function PackStepper({
  slug,
  name,
  count,
  className = "",
  onRemove,
}: {
  slug: string;
  name: string;
  count: number;
  className?: string;
  /** Called instead of removing, so the caller can offer an undo. */
  onRemove?: () => void;
}) {
  const t = useT();
  const names = { name: t(name) };
  return (
    <div
      role="group"
      aria-label={t("Packs of {name}", names)}
      className={`flex items-center justify-between rounded-md ${className}`}
    >
      <Step
        label={t(count === 1 ? "Remove {name} from your list" : "One pack less of {name}", names)}
        d={count === 1 ? "M5 6h10M8 6V4h4v2m-6 0 .7 10h6.600L14 6" : "M4 10h12"}
        onClick={() => (count === 1 && onRemove ? onRemove() : setPacks(slug, count - 1))}
      />
      <span aria-live="polite" className="text-center text-[0.9375rem] font-semibold whitespace-nowrap">
        {t(packs(count), { count })}
      </span>
      <Step
        label={t("One pack more of {name}", names)}
        d="M10 4v12M4 10h12"
        onClick={() => setPacks(slug, count + 1)}
      />
    </div>
  );
}

function Step({ label, d, onClick }: { label: string; d: string; onClick: () => void }) {
  const t = useT();
  return (
    <button
      type="button"
      aria-label={t(label)}
      onClick={onClick}
      className="flex h-11 w-10 shrink-0 cursor-pointer items-center justify-center rounded-md transition-colors hover:bg-black/10"
    >
      <svg
        viewBox="0 0 20 20"
        aria-hidden="true"
        className="size-4.5 fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
      >
        <path d={d} />
      </svg>
    </button>
  );
}

/** Add button that becomes a pack counter. Focus stays on the same spot. */
export function AddOrCount({ slug, name, count }: { slug: string; name: string; count: number }) {
  const t = useT();
  if (count > 0) {
    return (
      <PackStepper slug={slug} name={name} count={count} className="enter bg-leaf text-white [animation-duration:.25s]" />
    );
  }

  return (
    <button
      type="button"
      aria-label={t("Add {name} to your list", { name: t(name) })}
      onClick={(event) => {
        const place = event.currentTarget.parentElement;
        setPacks(slug, 1);
        // The button is replaced, so keyboard focus moves to "one more".
        if (event.detail === 0) {
          requestAnimationFrame(() =>
            place?.querySelector<HTMLButtonElement>("button:last-of-type")?.focus(),
          );
        }
      }}
      className="flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-leaf px-2 font-semibold text-leaf transition-colors hover:bg-leaf hover:text-white active:scale-[0.98]"
    >
      <svg
        viewBox="0 0 20 20"
        aria-hidden="true"
        className="size-4 shrink-0 fill-none stroke-current stroke-[2.5]"
      >
        <path d="M10 3v14M3 10h14" />
      </svg>
      {t("Add")}
    </button>
  );
}
