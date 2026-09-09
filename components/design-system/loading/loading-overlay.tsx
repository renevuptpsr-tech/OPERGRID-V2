import {
  ElectricLoader,
} from "./electric-loader";

export type LoadingOverlayProps = {
  open: boolean;
  label?: string;
  detail?: string;
};

export function LoadingOverlay({
  open,
  label = "Processing request",
  detail = "Please wait while OPERGRID completes this operation",
}: LoadingOverlayProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="og-loading-overlay"
      role="status"
      aria-live="assertive"
      aria-busy="true"
    >
      <div className="og-loading-overlay-panel">
        <ElectricLoader
          label={label}
          detail={detail}
        />

        <p className="og-loading-overlay-hint">
          Do not close this page or submit the action again.
        </p>
      </div>
    </div>
  );
}