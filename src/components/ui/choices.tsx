/** Pick one option from a row of buttons. */
export function Choices({
  legend,
  name,
  options,
  value,
  onChange,
}: {
  legend: string;
  name: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset>
      <legend className="font-semibold">{legend}</legend>
      <div className="mt-2 flex flex-wrap gap-2.5">
        {options.map((option) => (
          <label
            key={option}
            className="relative flex min-h-11 cursor-pointer items-center rounded-md border border-field bg-white px-4 transition-colors hover:border-leaf has-checked:border-leaf has-checked:bg-leaf has-checked:text-white has-focus-visible:ring-3 has-focus-visible:ring-ink has-focus-visible:ring-offset-2"
          >
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
              className="sr-only"
            />
            {option}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export const fieldClass =
  "mt-2 block min-h-12 w-full rounded-md border border-field bg-white px-3.5 text-ink placeholder:text-muted";
