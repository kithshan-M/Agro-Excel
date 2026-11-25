"use client";

import { useSyncExternalStore } from "react";

const never = () => () => {};

/** The visitor's month, 1 to 12. Zero until the page is in the browser. */
export function useMonth() {
  return useSyncExternalStore(
    never,
    () => new Date().getMonth() + 1,
    () => 0,
  );
}
