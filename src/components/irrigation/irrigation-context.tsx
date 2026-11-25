"use client";

import { createContext, useContext, useState } from "react";
import { irrigationNeeds } from "@/data/irrigation";

type Signs = Readonly<Record<string, string[]>>;

/** Carries choices made on the page into the form. */
const IrrigationContext = createContext<{
  need: string;
  setNeed: (need: string) => void;
  type: string;
  setType: (type: string) => void;
  signs: Signs;
  toggleSign: (part: string, sign: string) => void;
} | null>(null);

export function IrrigationProvider({ children }: { children: React.ReactNode }) {
  const [need, setNeed] = useState("");
  const [type, setType] = useState("");
  const [signs, setSigns] = useState<Signs>({});

  function toggleSign(part: string, sign: string) {
    const now = signs[part] ?? [];
    const adding = !now.includes(sign);
    setSigns({
      ...signs,
      [part]: adding ? [...now, sign] : now.filter((item) => item !== sign),
    });
    if (adding) setNeed(irrigationNeeds.maintain);
  }

  return (
    <IrrigationContext value={{ need, setNeed, type, setType, signs, toggleSign }}>
      {children}
    </IrrigationContext>
  );
}

export function useIrrigation() {
  const value = useContext(IrrigationContext);
  if (!value) throw new Error("useIrrigation must be used inside IrrigationProvider");
  return value;
}
