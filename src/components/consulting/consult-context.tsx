"use client";

import { createContext, useContext, useState } from "react";
import { helpTypes } from "@/data/consulting";

type Signs = Readonly<Record<string, string[]>>;

/** Carries the chosen help and the signs picked on the plant into the form. */
const ConsultContext = createContext<{
  help: string;
  setHelp: (help: string) => void;
  stage: string;
  /** Puts a crop stage in the form. */
  askAbout: (stage: string, planning: boolean) => void;
  signs: Signs;
  toggleSign: (part: string, sign: string) => void;
} | null>(null);

export function ConsultProvider({ children }: { children: React.ReactNode }) {
  const [help, setHelp] = useState("");
  const [stage, setStage] = useState("");
  const [signs, setSigns] = useState<Signs>({});

  function askAbout(name: string, planning: boolean) {
    setStage(name);
    // Keep the kind of help the visitor already chose.
    if (!help) setHelp(helpTypes[planning ? 0 : 1]);
  }

  function toggleSign(part: string, sign: string) {
    const now = signs[part] ?? [];
    const adding = !now.includes(sign);
    setSigns({
      ...signs,
      [part]: adding ? [...now, sign] : now.filter((item) => item !== sign),
    });
    if (adding) setHelp(helpTypes[2]);
  }

  return (
    <ConsultContext value={{ help, setHelp, stage, askAbout, signs, toggleSign }}>
      {children}
    </ConsultContext>
  );
}

export function useConsult() {
  const value = useContext(ConsultContext);
  if (!value) throw new Error("useConsult must be used inside ConsultProvider");
  return value;
}
