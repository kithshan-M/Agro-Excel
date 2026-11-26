"use client";

import { LangProvider } from "./context";
import { ta } from "./ta";

/** Kept apart, so other pages do not download the Tamil text. */
export function TamilProvider({ children }: { children: React.ReactNode }) {
  return (
    <LangProvider lang="ta" dict={ta}>
      {children}
    </LangProvider>
  );
}
