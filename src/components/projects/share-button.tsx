"use client";

import { useT } from "@/i18n/context";
import { useEffect, useState } from "react";
import { copyText } from "@/lib/copy";

/** Opens the phone's share sheet, or copies the link where there is none. */
export function ShareButton({ title }: { title: string }) {
  const t = useT();
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!status) return;
    const timer = setTimeout(() => setStatus(""), 4000);
    return () => clearTimeout(timer);
  }, [status]);

  async function share() {
    const url = window.location.origin + window.location.pathname;
    if (typeof navigator.share === "function") {
      // Closing the share sheet counts as an error, so there is nothing to report.
      await navigator.share({ title, url }).catch(() => {});
      return;
    }
    setStatus((await copyText(url)) ? t("Link copied") : t("Copy the link from the address bar"));
  }

  return (
    <div className="flex items-center gap-3">
      <p role="status" className="text-muted">
        {t(status)}
      </p>
      <button
        type="button"
        onClick={share}
        className="inline-flex min-h-11 cursor-pointer items-center gap-2 font-semibold text-leaf underline-offset-4 hover:underline"
      >
        <svg
          viewBox="0 0 20 20"
          aria-hidden="true"
          className="size-5 fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round]"
        >
          <path d="M10 12V2.500m0 0L6.500 6M10 2.500 13.500 6M4 10v7.500h12V10" />
        </svg>
        {t("Share")}
      </button>
    </div>
  );
}
