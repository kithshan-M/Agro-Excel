"use client";

import { LangProvider } from "./context";
import { si } from "./si";

/** Kept apart, so other pages do not download the Sinhala text. */
export function SinhalaProvider({ children }: { children: React.ReactNode }) {
  return (
    <LangProvider lang="si" dict={si}>
      {children}
    </LangProvider>
  );
}
