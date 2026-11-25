import { ContactDetails } from "@/components/sections/contact-details";
import { Container } from "@/components/ui/container";
import { SectionLink } from "@/components/ui/section-link";
import { siteConfig } from "@/config/site";
import { quickLinks, serviceNav } from "@/data/navigation";
import { BackToTop } from "./back-to-top";
import { FooterSkyline } from "./footer-skyline";
import { Logo } from "./logo";

const hasDetails = Object.values(siteConfig.contact).some(Boolean);

export function Footer() {
  return (
    <footer className="relative bg-leaf-dark text-white">
      <FooterSkyline />
      <Container className="grid grid-cols-2 gap-x-6 gap-y-10 pt-14 pb-12 sm:gap-x-8 lg:grid-cols-[1.5fr_1fr_1.35fr_1.15fr]">
        <div className="col-span-2 sm:col-span-1">
          <Logo light />
          <p className="mt-4 max-w-xs leading-relaxed text-white/80">
            {siteConfig.description}
          </p>
          <div className="mt-6">
            <SectionLink
              href="/contact#message"
              className="inline-flex min-h-12 items-center rounded-md bg-sun px-6 font-semibold text-ink transition-colors hover:bg-white"
            >
              Write to us
            </SectionLink>
          </div>
        </div>
        <FooterColumn
          title="Services"
          links={serviceNav.map((item) => ({ href: `/${item.slug}`, label: item.label }))}
        />
        {/* On phones the last column moves up beside Services. */}
        <FooterColumn
          title="Quick links"
          links={quickLinks}
          className="order-last col-span-2 sm:order-none sm:col-span-1"
        />
        <div className="min-w-0">
          {hasDetails ? (
            <>
              <h2 className="text-lg font-semibold">Contact</h2>
              <div className="mt-3">
                <ContactDetails />
              </div>
            </>
          ) : (
            <FooterColumn
              title={siteConfig.name}
              links={[
                { href: "/about", label: "About us" },
                { href: "/contact", label: "Contact" },
              ]}
            />
          )}
        </div>
      </Container>
      <div className="border-t border-white/15">
        <Container className="flex flex-wrap items-center justify-between gap-x-6 py-3 text-white/80">
          <p>© {siteConfig.name}</p>
          <ul className="flex flex-wrap items-center gap-x-6">
            {hasDetails && (
              <>
                <li>
                  <FooterLink href="/about">About us</FooterLink>
                </li>
                <li>
                  <FooterLink href="/contact">Contact</FooterLink>
                </li>
              </>
            )}
            <li>
              <BackToTop />
            </li>
          </ul>
        </Container>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
  className,
}: {
  title: string;
  links: { href: string; label: string }[];
  className?: string;
}) {
  return (
    <nav aria-label={title} className={className}>
      <h2 className="text-lg font-semibold">{title}</h2>
      <ul className="mt-2">
        {links.map((link) => (
          <li key={link.href}>
            <FooterLink href={link.href}>{link.label}</FooterLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <SectionLink
      href={href}
      className="inline-flex min-h-10 items-center text-white/85 underline-offset-4 transition-colors hover:text-white hover:underline"
    >
      {children}
    </SectionLink>
  );
}
