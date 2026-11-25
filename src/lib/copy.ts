/** Browsers only offer the clipboard on https and localhost, so fall back to the old way. */
export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.cssText = "position:fixed;top:0;opacity:0";
    document.body.append(area);
    const focused = document.activeElement as HTMLElement | null;
    area.select();
    const copied = document.execCommand("copy");
    area.remove();
    focused?.focus({ preventScroll: true });
    return copied;
  }
}
