import {
  Zap,
} from "lucide-react";

export type ElectricLoaderProps = {
  label?: string;
  detail?: string;
  compact?: boolean;
};

export function ElectricLoader({
  label = "Energizing workspace",
  detail = "Loading operational context",
  compact = false,
}: ElectricLoaderProps) {
  return (
    <div
      className="og-electric-loader"
      data-compact={
        compact || undefined
      }
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div
        className="og-electric-loader-mark"
        aria-hidden="true"
      >
        <Zap
          size={
            compact
              ? 16
              : 20
          }
          strokeWidth={2}
        />
      </div>

      <div
        className="og-electric-line"
        aria-hidden="true"
      >
        <span className="og-electric-line-track" />

        <span className="og-electric-line-node og-electric-line-node-a" />

        <span className="og-electric-line-node og-electric-line-node-b" />

        <span className="og-electric-line-current" />
      </div>

      <div className="og-electric-loader-copy">
        <strong>
          {label}
        </strong>

        {!compact ? (
          <span>
            {detail}
          </span>
        ) : null}
      </div>
    </div>
  );
}