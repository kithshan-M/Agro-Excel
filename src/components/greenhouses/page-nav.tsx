import { Container } from "@/components/ui/container";

const links = [
  { href: "#types", label: "Types" },
  { href: "#parts", label: "Parts" },
  { href: "#process", label: "Process" },
  { href: "#questions", label: "Questions" },
  { href: "#quotation", label: "Quotation" },
];

/** Stays at the top of the screen while reading the long greenhouse page. */
export function PageNav() {
  return (
    <nav
      aria-label="On this page"
      className="sticky top-0 z-[5] border-b border-line bg-paper"
    >
      <Container className="overflow-x-auto">
        <ul className="flex gap-7">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="flex min-h-13 items-center font-medium whitespace-nowrap text-muted hover:text-leaf"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
}
