import type { ProjectPhoto } from "@/data/projects";

/** Settings for next/image. Drawings are used as they are. */
export function projectPhoto({ file, alt }: ProjectPhoto) {
  const src = file.startsWith("/") ? file : `/images/projects/${file}`;
  return { src, alt, unoptimized: src.endsWith(".svg") };
}
