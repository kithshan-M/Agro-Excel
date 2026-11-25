"use client";

import { useSyncExternalStore } from "react";
import { seeds } from "@/data/seeds";

/** Packs wanted per seed. Kept in this browser, so it survives a refresh. */
type List = Readonly<Record<string, number>>;

const storageKey = "seed-list";
const empty: List = {};
const listeners = new Set<() => void>();
let list: List = empty;

/** Keeps only seeds still in the catalogue, with a sensible number of packs. */
function parse(saved: string | null): List {
  const found: unknown = JSON.parse(saved ?? "{}");
  if (typeof found !== "object" || found === null) return empty;

  const result: Record<string, number> = {};
  for (const { slug } of seeds) {
    const packs = (found as Record<string, unknown>)[slug];
    if (typeof packs === "number" && Number.isInteger(packs) && packs > 0) {
      result[slug] = Math.min(packs, 999);
    }
  }
  return result;
}

/** If saving is blocked or the saved text is damaged, the list in memory is kept. */
function load(): List {
  try {
    return parse(window.localStorage.getItem(storageKey));
  } catch {
    return list;
  }
}

function save() {
  try {
    if (Object.keys(list).length > 0) {
      window.localStorage.setItem(storageKey, JSON.stringify(list));
    } else {
      window.localStorage.removeItem(storageKey);
    }
  } catch {
    // The list still works until the page is closed.
  }
}

function show(next: List) {
  list = next;
  listeners.forEach((listener) => listener());
}

if (typeof window !== "undefined") {
  list = load();
  // Another tab changed the list.
  window.addEventListener("storage", (event) => {
    if (event.key === storageKey || event.key === null) show(load());
  });
  // A page brought back by the Back button may have missed changes.
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) show(load());
  });
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useSeedList(): List {
  return useSyncExternalStore(
    subscribe,
    () => list,
    () => empty,
  );
}

/** Sets the number of packs. Zero takes the seed off the list. */
export function setPacks(slug: string, packs: number) {
  const next = { ...list };
  if (packs > 0) next[slug] = Math.min(packs, 999);
  else delete next[slug];
  show(next);
  save();
}

export function clearList() {
  show(empty);
  save();
}
