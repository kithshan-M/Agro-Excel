"use client";

import { useT } from "@/i18n/context";
const words = {
  sign: ["{count} sign in your message", "{count} signs in your message"],
  fault: ["{count} fault in your message", "{count} faults in your message"],
  wish: ["{count} wish in your message", "{count} wishes in your message"],
};

/** What the visitor ticked so far, with a way to remove each and go on to the form. */
export function SignSummary({
  parts,
  signs,
  toggleSign,
  href,
  noun,
  note,
}: {
  parts: { key: string; name: string }[];
  signs: Readonly<Record<string, string[]>>;
  toggleSign: (part: string, sign: string) => void;
  href: string;
  noun: keyof typeof words;
  /** Something else already in the message, such as a symptom. */
  note?: string;
}) {
  const t = useT();
  const total = parts.reduce((sum, item) => sum + (signs[item.name]?.length ?? 0), 0);

  return (
    <div className="mt-7 border-t border-line pt-6 lg:mt-auto">
      <h3 className="text-lg font-semibold">
        {total === 0
          ? note
            ? t("In your message: {note}", { note: t(note).toLowerCase() })
            : t("Nothing ticked yet")
          : t(words[noun][total === 1 ? 0 : 1], { count: total })}
      </h3>
      <ul className="mt-2 flex flex-wrap gap-2">
        {parts.flatMap((item) =>
          (signs[item.name] ?? []).map((sign) => (
            <li key={`${item.key}-${sign}`}>
              <button
                type="button"
                aria-label={t("Remove {name}", { name: `${t(item.name)}, ${t(sign)}` })}
                onClick={() => toggleSign(item.name, sign)}
                className="flex min-h-11 cursor-pointer items-center gap-2 rounded-md bg-film px-3 text-left hover:bg-line"
              >
                {t(item.name)}: {t(sign).toLowerCase()}
                <svg
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                  className="size-3.5 shrink-0 fill-none stroke-current stroke-[2.5]"
                >
                  <path d="m4 4 12 12M16 4 4 16" />
                </svg>
              </button>
            </li>
          )),
        )}
      </ul>
      <a
        href={href}
        className={`mt-5 inline-flex min-h-12 items-center rounded-md px-6 font-semibold transition-colors ${total > 0 || note ? "bg-leaf text-white hover:bg-leaf-dark" : "border border-field text-leaf hover:border-leaf"}`}
      >
        {total > 0 || note ? t("Continue") : t("Skip to the form")}
      </a>
    </div>
  );
}
