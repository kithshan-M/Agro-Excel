"use client";

import { createContext, useContext, useState } from "react";
import { cropStages, helpTypes } from "@/data/consulting";

type Lists = Readonly<Record<string, string[]>>;

const toggle = (lists: Lists, key: string, item: string): Lists => {
  const now = lists[key] ?? [];
  return {
    ...lists,
    [key]: now.includes(item) ? now.filter((other) => other !== item) : [...now, item],
  };
};

/** Carries choices made on the page into the form. */
const ConsultContext = createContext<{
  help: string;
  setHelp: (help: string) => void;
  crop: string;
  setCrop: (crop: string) => void;
  /** Stage in the form. */
  stage: string;
  setStage: (stage: string) => void;
  /** Stage open on the page, as a place in cropStages. */
  open: number;
  setOpen: (index: number) => void;
  /** Questions ticked per stage. */
  topics: Lists;
  toggleTopic: (stage: string, topic: string) => void;
  /** Signs ticked per plant part. */
  signs: Lists;
  toggleSign: (part: string, sign: string) => void;
  spread: string;
  setSpread: (spread: string) => void;
  /** Titles of the photos already taken. */
  photos: string[];
  togglePhoto: (title: string) => void;
} | null>(null);

export function ConsultProvider({ children }: { children: React.ReactNode }) {
  const [help, setHelp] = useState("");
  const [crop, setCrop] = useState("");
  const [stage, setStage] = useState("");
  const [open, setOpen] = useState(0);
  const [topics, setTopics] = useState<Lists>({});
  const [signs, setSigns] = useState<Lists>({});
  const [spread, chooseSpread] = useState("");
  const [photos, setPhotos] = useState<Lists>({});

  function toggleTopic(name: string, topic: string) {
    const adding = !topics[name]?.includes(topic);
    setTopics(toggle(topics, name, topic));
    if (!adding) return;
    setStage(name);
    // Keep the kind of help the visitor already chose.
    if (!help) setHelp(helpTypes[name === cropStages[0].name ? 0 : 1]);
  }

  function toggleSign(part: string, sign: string) {
    if (!signs[part]?.includes(sign)) setHelp(helpTypes[2]);
    setSigns(toggle(signs, part, sign));
  }

  function setSpread(name: string) {
    chooseSpread(name);
    if (name) setHelp(helpTypes[2]);
  }

  return (
    <ConsultContext
      value={{
        help,
        setHelp,
        crop,
        setCrop,
        stage,
        setStage,
        open,
        setOpen,
        topics,
        toggleTopic,
        signs,
        toggleSign,
        spread,
        setSpread,
        photos: photos.taken ?? [],
        togglePhoto: (title) => setPhotos(toggle(photos, "taken", title)),
      }}
    >
      {children}
    </ConsultContext>
  );
}

export function useConsult() {
  const value = useContext(ConsultContext);
  if (!value) throw new Error("useConsult must be used inside ConsultProvider");
  return value;
}
