"use client";

import { useLang, usePath, useT, useWhatsapp } from "@/i18n/context";
import Image from "next/image";
import { Link } from "@/components/ui/link";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import { serviceNav } from "@/data/navigation";
import { getService } from "@/data/services";
import { LanguageSwitch } from "./language-switch";
import { Logo } from "./logo";

/** Panel for phones and tablets. The dialog element keeps focus inside and closes on Escape. */
export function MobileMenu({ hasProjects }: { hasProjects: boolean }) {
  const t = useT();
  const pathname = usePath();
  const sinhala = useLang() === "si";
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const { phone } = siteConfig.contact;
  const whatsapp = useWhatsapp()();

  const close = () => dialog.current?.close();

  useEffect(() => {
    // The panel is only for narrow screens, so close it if the window grows.
    const wide = window.matchMedia(sinhala ? "(min-width: 80rem)" : "(min-width: 64rem)");
    const onChange = () => wide.matches && dialog.current?.close();
    wide.addEventListener("change", onChange);
    return () => wide.removeEventListener("change", onChange);
  }, [sinhala]);

  const row = (active: boolean) =>
    `flex min-h-13 items-center rounded-md px-3 text-lg font-semibold transition-colors hover:bg-film ${active ? "bg-film text-leaf" : ""}`;

  return (
    <div className={sinhala ? "xl:hidden" : "lg:hidden"}>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => {
          dialog.current?.showModal();
          setOpen(true);
        }}
        className="flex min-h-11 cursor-pointer items-center gap-2.5 rounded-md px-2 font-semibold"
      >
        {t("Menu")}
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="size-6 fill-none stroke-current stroke-2 [stroke-linecap:round]"
        >
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>

      <dialog
        ref={dialog}
        aria-label={t("Menu")}
        onClose={() => setOpen(false)}
        onClick={(event) => event.target === dialog.current && close()}
        className="fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-none w-full max-w-md translate-x-full bg-paper text-ink transition-[translate,display,overlay] duration-300 transition-discrete backdrop:bg-ink/55 open:translate-x-0 motion-reduce:transition-none starting:open:translate-x-full"
      >
        <div className="flex min-h-full flex-col">
          <div className="flex min-h-16 items-center justify-between border-b border-line px-4 sm:px-6">
            <Logo onClick={close} />
            <button
              type="button"
              onClick={close}
              className="flex min-h-11 cursor-pointer items-center gap-2.5 rounded-md px-2 font-semibold"
            >
              {t("Close")}
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="size-6 fill-none stroke-current stroke-2 [stroke-linecap:round]"
              >
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>
          </div>

          <nav aria-label={t("Menu")} className="px-3 py-4 sm:px-5">
            <ul className="space-y-1">
              {serviceNav.map((item) => {
                const href = `/${item.slug}`;
                const active = pathname === href;
                return (
                  <li key={item.slug}>
                    <Link
                      href={href}
                      onClick={close}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center gap-4 rounded-md p-2 transition-colors hover:bg-film ${active ? "bg-film" : ""}`}
                    >
                      <span className="relative block h-16 w-20 shrink-0 overflow-hidden rounded-md bg-[#fbe9e2]">
                        <Image
                          src={item.image}
                          alt=""
                          width={160}
                          height={128}
                          unoptimized
                          className="absolute inset-0 size-full object-cover"
                        />
                      </span>
                      <span className="min-w-0">
                        <span
                          className={`block text-lg leading-tight font-semibold ${active ? "text-leaf" : ""}`}
                        >
                          {t(item.label)}
                        </span>
                        <span className="mt-1 line-clamp-2 text-sm leading-snug text-muted">
                          {t(getService(item.slug).summary)}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <ul className="mt-3 border-t border-line pt-3">
              <li>
                <Link href="/" onClick={close} aria-current={pathname === "/" ? "page" : undefined} className={row(pathname === "/")}>
                  {t("Home")}
                </Link>
              </li>
              {hasProjects && (
                <li>
                  <Link href="/projects" onClick={close} aria-current={pathname === "/projects" ? "page" : undefined} className={row(pathname.startsWith("/projects"))}>
                    {t("Projects")}
                  </Link>
                </li>
              )}
              <li>
                <Link href="/about" onClick={close} aria-current={pathname === "/about" ? "page" : undefined} className={row(pathname === "/about")}>
                  {t("About")}
                </Link>
              </li>
            </ul>
          </nav>

          <LanguageSwitch className="mx-3 rounded-md px-3 text-lg text-leaf hover:bg-film sm:mx-5" />
          <div className="mt-auto grid gap-3 border-t border-line p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6">
            <Link
              href="/contact"
              onClick={close}
              aria-current={pathname === "/contact" ? "page" : undefined}
              className="flex min-h-12 items-center justify-center rounded-md bg-leaf font-semibold text-white transition-colors hover:bg-leaf-dark"
            >
              {t("Contact us")}
            </Link>
            {(whatsapp || phone) && (
              <div className="grid grid-flow-col gap-3">
                {whatsapp && (
                  <a
                    href={whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-12 items-center justify-center rounded-md border border-leaf font-semibold text-leaf"
                  >
                    {t("WhatsApp")}
                  </a>
                )}
                {phone && (
                  <a
                    href={`tel:${phone.replaceAll(" ", "")}`}
                    className="flex min-h-12 items-center justify-center rounded-md border border-leaf font-semibold text-leaf"
                  >
                    {t("Call")}
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
}
