import {
  ElectricLoader,
} from "./electric-loader";

export type DataLoaderProps = {
  label?: string;
  rows?: number;
};

export function DataLoader({
  label = "Loading data",
  rows = 4,
}: DataLoaderProps) {
  const safeRows =
    Math.max(
      1,
      Math.min(
        rows,
        8,
      ),
    );

  return (
    <div
      className="og-data-loader"
      aria-busy="true"
      aria-live="polite"
    >
      <ElectricLoader
        compact
        label={label}
      />

      <div
        className="og-data-loader-skeleton"
        aria-hidden="true"
      >
        {Array.from({
          length:
            safeRows,
        }).map(
          (
            _,
            index,
          ) => (
            <div
              key={index}
              className="og-data-loader-row"
            >
              <span className="og-data-skeleton og-data-skeleton-avatar" />

              <span className="og-data-skeleton og-data-skeleton-main" />

              <span className="og-data-skeleton og-data-skeleton-secondary" />

              <span className="og-data-skeleton og-data-skeleton-action" />
            </div>
          ),
        )}
      </div>
    </div>
  );
}