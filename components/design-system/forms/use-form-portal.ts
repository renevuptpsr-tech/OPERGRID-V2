"use client";
import { useCallback, useState } from "react";

/** Portal to the existing opt-in boundary: escape control clipping, preserve theme inheritance. */
export function useFormPortal() {
  const [container, setContainer] = useState<HTMLElement | undefined>();
  const attachHost = useCallback((node: HTMLElement | null) => {
    if (node) setContainer(node.closest<HTMLElement>('[data-og-design-system="1"]') ?? undefined);
  }, []);
  return { container, attachHost };
}
