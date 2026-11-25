"use client";

import { createContext, useContext, useState } from "react";

type Wishes = Readonly<Record<string, string[]>>;
export type Size = { length: string; width: string; unit: "feet" | "metres" };

/** Carries choices made on the page into the quotation form. */
const QuoteContext = createContext<{
  type: string;
  setType: (type: string) => void;
  crop: string;
  setCrop: (crop: string) => void;
  size: Size;
  setSize: (size: Size) => void;
  /** Wishes per part, such as { Cover: ["Net"] }. */
  wishes: Wishes;
  toggleWish: (part: string, wish: string) => void;
} | null>(null);

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [type, setType] = useState("");
  const [crop, setCrop] = useState("");
  const [size, setSize] = useState<Size>({ length: "", width: "", unit: "feet" });
  const [wishes, setWishes] = useState<Wishes>({});

  function toggleWish(part: string, wish: string) {
    const now = wishes[part] ?? [];
    setWishes({
      ...wishes,
      [part]: now.includes(wish) ? now.filter((item) => item !== wish) : [...now, wish],
    });
  }

  return (
    <QuoteContext value={{ type, setType, crop, setCrop, size, setSize, wishes, toggleWish }}>
      {children}
    </QuoteContext>
  );
}

export function useQuote() {
  const value = useContext(QuoteContext);
  if (!value) throw new Error("useQuote must be used inside QuoteProvider");
  return value;
}
