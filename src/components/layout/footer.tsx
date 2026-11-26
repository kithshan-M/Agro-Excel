"use client";

import { useT } from "@/i18n/context";
import { ContactDetails } from "@/components/sections/contact-details";
import { Container } from "@/components/ui/container";
import { SectionLink } from "@/components/ui/section-link";
import { siteConfig } from "@/config/site";
import { quickLinks, serviceNav } from "@/data/navigation";
import { LanguageMenu } from "./language-switch";
import { BackToTop } from "./back-to-top";
import { FooterSkyline } from "./footer-skyline";
import { Logo } from "./logo";

const hasDetails = Object.values(siteConfig.contact).some(Boolean);

export function Footer({ hasProjects }: { hasProjects: boolean }) {
  const t = useT();
  return (
    <footer className="relative bg-leaf-dark text-white">
      <FooterSkyline />
      <Container className="grid grid-cols-2 gap-x-6 gap-y-10 pt-14 pb-12 sm:gap-x-8 lg:grid-cols-[1.5fr_1fr_1.35fr_1.15fr]">
        <div className="col-span-2 sm:col-span-1">
          <Logo light />
          <p className="mt-4 max-w-xs leading-relaxed text-white/80">
            {t(siteConfig.description)}
          </p>
          <div className="mt-6">
            <SectionLink
              href="/contact#message"
              className="inline-flex min-h-12 items-center rounded-md bg-sun px-6 font-semibold text-ink transition-colors hover:bg-white"
            >
              {t("Write to us")}
            </SectionLink>
          </div>
        </div>
        <FooterColumn
          title={t("Services")}
          links={serviceNav.map((item) => ({ href: `/${item.slug}`, label: item.label }))}
        />
        {/* On phones the last column moves up beside Services. */}
        <FooterColumn
          title={t("Quick links")}
          links={quickLinks}
          className="order-last col-span-2 sm:order-none sm:col-span-1"
        />
        <div className="min-w-0">
          {hasDetails ? (
            <>
              <h2 className="text-lg font-semibold">{t("Contact")}</h2>
              <div className="mt-3">
                <ContactDetails />
              </div>
            </>
          ) : (
            <FooterColumn
              title={t(siteConfig.name)}
              links={[
                ...(hasProjects ? [{ href: "/projects", label: "Projects" }] : []),
                { href: "/about", label: "About us" },
                { href: "/contact", label: "Contact" },
              ]}
            />
          )}
        </div>
      </Container>
      <div className="border-t border-white/15">
        <Container className="flex flex-wrap items-center justify-between gap-x-6 py-3 text-white/80">
          <p>© {t(siteConfig.name)}</p>
          <ul className="flex flex-wrap items-center gap-x-6">
            {hasDetails && (
              <>
                {hasProjects && (
                  <li>
                    <FooterLink href="/projects">{t("Projects")}</FooterLink>
                  </li>
                )}
                <li>
                  <FooterLink href="/about">{t("About us")}</FooterLink>
                </li>
                <li>
                  <FooterLink href="/contact">{t("Contact")}</FooterLink>
                </li>
              </>
            )}
            <li>
              <LanguageMenu place="footer" />
            </li>
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
  const t = useT();
  return (
    <nav aria-label={t(title)} className={className}>
      <h2 className="text-lg font-semibold">{t(title)}</h2>
      <ul className="mt-2">
        {links.map((link) => (
          <li key={link.href}>
            <FooterLink href={link.href}>{t(link.label)}</FooterLink>
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
