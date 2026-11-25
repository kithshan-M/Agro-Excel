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
  const className = `inline-flex min-h-12 items-center rounded-md px-6 font-semibold transition-colors ${variants[variant]}`;

  if (href.startsWith("https://")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
