"use client";

import { useT } from "@/i18n/context";
import { ActionBar } from "@/components/sections/action-bar";
import { useConsult } from "./consult-context";

const count = (lists: Readonly<Record<string, string[]>>) =>
  Object.values(lists).reduce((sum, list) => sum + list.length, 0);

/** The phone bar for this page. It says how much the visitor has added to the message so far. */
export function ConsultBar() {
  const t = useT();
  const { crop, topics, signs, spread, photos } = useConsult();
  const added = (crop.trim() ? 1 : 0) + count(topics) + count(signs) + (spread ? 1 : 0) + photos.length;

  return (
    <ActionBar
      from="start"
      to="ask"
      label="Ask for advice"
      note={added > 0 ? t("{count} added to your message", { count: added }) : undefined}
    />
  );
}
