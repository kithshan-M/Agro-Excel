"use client";

import { useEffect, useState } from "react";
import { copyText } from "@/lib/copy";

const tones = {
  water: { main: "bg-water text-white hover:bg-ink", other: "border-water text-water hover:bg-white" },
  leaf: { main: "bg-leaf text-white hover:bg-leaf-dark", other: "border-leaf text-leaf hover:bg-white" },
};

/** Sends a list to any of the visitor's own WhatsApp contacts, or copies it. */
export function SendList({ text, tone }: { text: string; tone: keyof typeof tones }) {
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!status) return;
    const timer = setTimeout(() => setStatus(""), 4000);
    return () => clearTimeout(timer);
  }, [status]);

  return (
    <div className="shrink-0">
      <div className="flex flex-wrap gap-3">
        <a
          href={`https://wa.me/?text=${encodeURIComponent(text)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex min-h-12 items-center rounded-md px-6 font-semibold transition-colors ${tones[tone].main}`}
        >
          Send by WhatsApp
        </a>
        <button
          type="button"
          onClick={async () =>
            setStatus(
              (await copyText(text)) ? "List copied" : "Copying did not work. Select the text below.",
            )
          }
          className={`min-h-12 cursor-pointer rounded-md border px-6 font-semibold transition-colors ${tones[tone].other}`}
        >
          Copy the list
        </button>
      </div>
      <p role="status" className="min-h-6 pt-1 text-muted lg:text-right">
        {status}
      </p>
    </div>
  );
}
