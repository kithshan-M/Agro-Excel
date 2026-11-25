import { Container } from "@/components/ui/container";
import { hasProjects, shownLinks } from "@/lib/projects";
import { HeaderShell } from "./header-shell";
import { LanguageSwitch } from "./language-switch";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { Nav } from "./nav";
import { SeedListLink } from "./seed-list-link";

export function Header() {
  return (
    <HeaderShell>
      <Container className="flex min-h-16 items-center justify-between gap-2 sm:gap-4">
        <Logo />
        <div className="flex items-center gap-1 lg:gap-5">
          <Nav links={shownLinks} />
          <LanguageSwitch compact className="rounded-md px-2 text-leaf-dark hover:bg-film max-[430px]:px-1 max-[340px]:hidden max-[430px]:[&>svg]:hidden" />
          <SeedListLink />
          <MobileMenu hasProjects={hasProjects} />
        </div>
      </Container>
    </HeaderShell>
  );
}
