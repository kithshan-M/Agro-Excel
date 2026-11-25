import { hasProjects } from "@/lib/projects";
import { TopButton } from "./back-to-top";
import { Footer } from "./footer";
import { Header } from "./header";
import { SkipLink } from "./skip-link";

/** What every page has around it, in both languages. */
export function Site({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SkipLink />
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer hasProjects={hasProjects} />
      <TopButton />
    </>
  );
}
