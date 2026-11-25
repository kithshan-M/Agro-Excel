import Link from "next/link";
import { ContactDetails } from "@/components/sections/contact-details";
import { Container } from "@/components/ui/container";
import { navLinks, siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="bg-leaf-dark py-12 text-white">
      <Container className="grid gap-10 sm:grid-cols-3">
        <div>
          <p className="font-display text-xl font-bold">{siteConfig.name}</p>
          <p className="mt-2 max-w-xs text-white/80">{siteConfig.tagline}</p>
        </div>
        <nav aria-label="Footer">
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-block py-1.5 underline-offset-4 hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ContactDetails />
      </Container>
    </footer>
  );
}
