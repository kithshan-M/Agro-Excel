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
  /** "sign", "fault" or "wish". */
  noun: string;
  /** Something else already in the message, such as a symptom. */
  note?: string;
}) {
  const total = parts.reduce((sum, item) => sum + (signs[item.name]?.length ?? 0), 0);

  return (
    <div className="mt-7 border-t border-line pt-6 lg:mt-auto">
      <h3 className="text-lg font-semibold">
        {total === 0
          ? note
            ? `In your message: ${note.toLowerCase()}`
            : "Nothing ticked yet"
          : `${total} ${total === 1 ? noun : noun.endsWith("sh") ? `${noun}es` : `${noun}s`} in your message`}
      </h3>
      <ul className="mt-2 flex flex-wrap gap-2">
        {parts.flatMap((item) =>
          (signs[item.name] ?? []).map((sign) => (
            <li key={`${item.key}-${sign}`}>
              <button
                type="button"
                aria-label={`Remove ${item.name}, ${sign}`}
                onClick={() => toggleSign(item.name, sign)}
                className="flex min-h-11 cursor-pointer items-center gap-2 rounded-md bg-film px-3 text-left hover:bg-line"
              >
                {item.name}: {sign.toLowerCase()}
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
        {total > 0 || note ? "Continue" : "Skip to the form"}
      </a>
    </div>
  );
}
