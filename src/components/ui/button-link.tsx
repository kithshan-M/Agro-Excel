import Link from "next/link";

const variants = {
  primary: "bg-sun text-ink hover:bg-white",
  outline: "border border-current hover:bg-white/10",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: keyof typeof variants;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center rounded-md px-6 font-semibold transition-colors ${variants[variant]}`}
    >
      {children}
    </Link>
  );
}
