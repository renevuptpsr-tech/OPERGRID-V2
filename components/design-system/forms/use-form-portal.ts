"use client";

import { useOverlayPortal } from "../overlays/use-overlay-portal";

/**
 * Backward-compatible Phase 3 alias.
 *
 * New overlay code should use useOverlayPortal directly.
 * Existing DatePicker, TimePicker, Combobox and range controls may continue
 * importing useFormPortal without behavior changes.
 */
export function useFormPortal() {
  return useOverlayPortal();
}