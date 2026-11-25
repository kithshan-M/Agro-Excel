"use client";

import { createContext, useContext, useState } from "react";

/** Lets a greenhouse card pre-select its type in the quotation form. */
const QuoteContext = createContext<{
  type: string;
  setType: (type: string) => void;
} | null>(null);

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [type, setType] = useState("");
  return <QuoteContext value={{ type, setType }}>{children}</QuoteContext>;
}

export function useQuote() {
  const value = useContext(QuoteContext);
  if (!value) throw new Error("useQuote must be used inside QuoteProvider");
  return value;
}
