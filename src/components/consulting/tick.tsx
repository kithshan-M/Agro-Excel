/** Large row with a tick box. */
export function Tick({
  checked,
  onChange,
  children,
}: {
  checked: boolean;
  onChange: () => void;
  children: React.ReactNode;
}) {
  return (
    <label className="relative flex min-h-12 cursor-pointer items-center gap-3 rounded-md border border-field bg-white px-4 py-2 leading-snug transition-colors hover:border-leaf has-checked:border-leaf has-checked:bg-leaf has-checked:text-white has-focus-visible:ring-3 has-focus-visible:ring-ink has-focus-visible:ring-offset-2">
      <input type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
      <svg
        viewBox="0 0 20 20"
        aria-hidden="true"
        className="size-5 shrink-0 rounded border-2 border-field fill-none stroke-transparent stroke-[3] peer-checked:border-white peer-checked:stroke-current"
      >
        <path d="m4 10.5 4 4L16 6" />
      </svg>
      {children}
    </label>
  );
}
