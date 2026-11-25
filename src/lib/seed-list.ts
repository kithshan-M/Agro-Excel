"use client";

import { useSyncExternalStore } from "react";

/** Packs wanted per seed. Lives in memory, so it lasts while browsing the site. */
type List = Readonly<Record<string, number>>;

const empty: List = {};
let list: List = empty;
const listeners = new Set<() => void>();

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
  list = next;
  listeners.forEach((listener) => listener());
}
