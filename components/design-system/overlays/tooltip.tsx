"use client";

import { useEffect, useId, useState, type ReactElement } from "react";
import clsx from "clsx";

export type TooltipTriggerProps = { "aria-describedby": string };
export type TooltipProps = {
  content: string;
  children: (props: TooltipTriggerProps) => ReactElement;
  side?: "top" | "bottom";
  className?: string;
  /** Existing description IDs to preserve on the trigger. */
  describedBy?: string;
};

/** Inline, non-interactive tooltip. Keep its ancestor overflow visible. */
export function Tooltip({ content, children, side = "top", className, describedBy }: TooltipProps) {
  const id = useId();
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const open = (hovered || focused) && !dismissed;

  useEffect(() => {
    if (!open) return;
    function dismiss(event: KeyboardEvent) {
      if (event.key === "Escape") setDismissed(true);
    }
    document.addEventListener("keydown", dismiss);
    return () => document.removeEventListener("keydown", dismiss);
  }, [open]);

  return (
    <span className={clsx("og-ds-tooltip-anchor", className)}
      onPointerEnter={(event) => {
        if (event.pointerType === "touch") return;
        setHovered(true); setDismissed(false);
      }}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => { setFocused(true); setDismissed(false); }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}>
      {children({ "aria-describedby": [describedBy, id].filter(Boolean).join(" ") })}
      <span id={id} role="tooltip" hidden={!open} data-side={side} className="og-ds-tooltip-position">
        <span className="og-ds-tooltip-content">{content}</span>
      </span>
    </span>
  );
}
