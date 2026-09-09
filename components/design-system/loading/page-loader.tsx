import {
  ElectricLoader,
} from "./electric-loader";

export type PageLoaderProps = {
  title?: string;
  detail?: string;
};

export function PageLoader({
  title = "Energizing workspace",
  detail = "Preparing OPERGRID operational context",
}: PageLoaderProps) {
  return (
    <div
      className="og-page-loader"
      aria-busy="true"
    >
      <div className="og-page-loader-inner">
        <div className="og-page-loader-brand">
          <strong>
            OPERGRID
          </strong>

          <span>
            Grid Operations Intelligence
          </span>
        </div>

        <ElectricLoader
          label={title}
          detail={detail}
        />
      </div>
    </div>
  );
}