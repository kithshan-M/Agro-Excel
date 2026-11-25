"use client";

import { useSearchParams } from "next/navigation";
import { seedKinds, seedPlaces, type SeedKind, type SeedPlace } from "@/data/seeds";

export type SeedFilter = { kind: SeedKind | ""; place: SeedPlace | "" };

export const noFilter: SeedFilter = { kind: "", place: "" };

const short = (name: string) => name.toLowerCase().replaceAll(" ", "-");

/** The filter lives in the web address, so it survives a refresh and can be shared. */
export function useSeedFilter(): SeedFilter {
  const params = useSearchParams();
  return {
    kind: seedKinds.find(({ name }) => short(name) === params.get("kind"))?.name ?? "",
    place: seedPlaces.find((name) => short(name) === params.get("place")) ?? "",
  };
}

export function setSeedFilter({ kind, place }: SeedFilter) {
  const params = new URLSearchParams();
  if (kind) params.set("kind", short(kind));
  if (place) params.set("place", short(place));
  const query = params.toString();
  window.history.replaceState(null, "", query ? `/seeds?${query}` : "/seeds");
}
