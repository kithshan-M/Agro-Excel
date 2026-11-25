"use client";

import { useSearchParams } from "next/navigation";
import { districts, projectKinds, type District, type ProjectKind } from "@/data/projects";

export type ProjectFilter = { kind: ProjectKind | ""; district: District | "" };

export const noFilter: ProjectFilter = { kind: "", district: "" };

const short = (name: string) => name.toLowerCase().replaceAll(" ", "-");

/** The filter lives in the web address, so it survives a refresh and can be shared. */
export function useProjectFilter(): ProjectFilter {
  const params = useSearchParams();
  return {
    kind: projectKinds.find((name) => short(name) === params.get("kind")) ?? "",
    district: districts.find((name) => short(name) === params.get("district")) ?? "",
  };
}

export function setProjectFilter({ kind, district }: ProjectFilter) {
  const params = new URLSearchParams();
  if (kind) params.set("kind", short(kind));
  if (district) params.set("district", short(district));
  const query = params.toString();
  const path = window.location.pathname;
  window.history.replaceState(null, "", query ? `${path}?${query}` : path);
}
