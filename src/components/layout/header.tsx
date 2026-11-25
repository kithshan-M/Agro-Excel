import Link from "next/link";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { Nav } from "./nav";

export function Header() {
  return (
    <header className="relative z-10 border-b border-line bg-paper">
      <Container className="flex min-h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="font-display text-xl font-bold tracking-tight text-leaf-dark"
        >
          {siteConfig.name}
        </Link>
        <Nav />
      </Container>
    </header>
  );
}
