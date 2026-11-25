/** Delays an animated item: 0 starts first, 1 starts one step later, and so on. */
export function step(index: number) {
  return { "--i": index } as React.CSSProperties;
}
