"use client";

import {
  useId,
  type ReactElement,
} from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { useOverlayPortal } from "./use-overlay-portal";

export type TooltipTriggerProps = {
  "aria-describedby": string;
};

export type TooltipSide =
  | "top"
  | "right"
  | "bottom"
  | "left";

export type TooltipProps = {
  content: string;
  children: (props: TooltipTriggerProps) => ReactElement;
  side?: TooltipSide;
  align?: "start" | "center" | "end";
  sideOffset?: number;
  delayDuration?: number;
  skipDelayDuration?: number;
  className?: string;

  /**
   * Existing aria-describedby IDs owned by the caller.
   *
   * Phase 2 compatibility:
   * Tooltip continues composing the caller's existing description IDs
   * with its own stable description ID.
   */
  describedBy?: string;
};

export function Tooltip({
  content,
  children,
  side = "top",
  align = "center",
  sideOffset = 6,
  delayDuration = 350,
  skipDelayDuration = 250,
  className,
  describedBy,
}: TooltipProps) {
  const descriptionId = useId();

  const {
    container: overlayContainer,
    attachHost,
  } = useOverlayPortal();

  const composedDescription = [
    describedBy,
    descriptionId,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      ref={attachHost}
      className="og-ds-tooltip-host"
    >
      {/*
       * Keep a stable accessible description in the trigger's DOM subtree.
       *
       * This preserves the Phase 2 Tooltip public contract and ensures:
       * - aria-describedby is available before the visual tooltip opens;
       * - SSR/static markup has a stable description target;
       * - existing caller description IDs are preserved;
       * - the visual Radix tooltip may remain portal/collision based.
       *
       * This node is not the visible floating surface.
       */}
      <span
        id={descriptionId}
        role="tooltip"
        hidden
      >
        {content}
      </span>

      <TooltipPrimitive.Provider
        delayDuration={delayDuration}
        skipDelayDuration={skipDelayDuration}
      >
        <TooltipPrimitive.Root>
          <TooltipPrimitive.Trigger asChild>
            {children({
              "aria-describedby": composedDescription,
            })}
          </TooltipPrimitive.Trigger>

          <TooltipPrimitive.Portal container={overlayContainer}>
            <TooltipPrimitive.Content
              side={side}
              align={align}
              sideOffset={sideOffset}
              collisionPadding={12}
              className={
                className
                  ? `og-ds-tooltip-content ${className}`
                  : "og-ds-tooltip-content"
              }
            >
              {content}

              <TooltipPrimitive.Arrow className="og-ds-tooltip-arrow" />
            </TooltipPrimitive.Content>
          </TooltipPrimitive.Portal>
        </TooltipPrimitive.Root>
      </TooltipPrimitive.Provider>
    </span>
  );
}