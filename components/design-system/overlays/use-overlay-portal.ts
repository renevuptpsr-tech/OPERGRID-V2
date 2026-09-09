"use client";

import { useCallback, useState } from "react";

export type OverlayPortalHandle = {
  container: HTMLElement | undefined;
  attachHost: (node: HTMLElement | null) => void;
};

/**
 * Resolves the closest OPERGRID Design System boundary for portal content.
 *
 * Why:
 * - Radix portals normally render outside the local component tree.
 * - OPERGRID semantic tokens are intentionally scoped to
 *   [data-og-design-system="1"].
 * - Mounting portal content into the nearest boundary preserves theme,
 *   typography, semantic colors, radius and elevation.
 *
 * This hook does not create a theme provider and does not modify the DOM.
 */
export function useOverlayPortal(): OverlayPortalHandle {
  const [container, setContainer] = useState<HTMLElement | undefined>();

  const attachHost = useCallback((node: HTMLElement | null) => {
    if (!node) {
      return;
    }

    const boundary = node.closest<HTMLElement>(
      '[data-og-design-system="1"]',
    );

    setContainer(boundary ?? undefined);
  }, []);

  return {
    container,
    attachHost,
  };
}