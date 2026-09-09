import type {
  ReactNode,
} from "react";


type StickyActionBarProps = {
  description?: string;
  children: ReactNode;
};


export function StickyActionBar({
  description,
  children,
}: StickyActionBarProps) {
  return (
    <div className="og-sticky-action-bar sticky bottom-0 z-20 -mx-5 mt-2 flex flex-col gap-3 px-5 py-3 sm:flex-row sm:items-center sm:justify-between lg:-mx-6 lg:px-6">

      <div className="min-w-0">
        {description && (
          <p className="og-muted text-[9px]">
            {description}
          </p>
        )}
      </div>

      <div className="flex shrink-0 items-center justify-end gap-2">
        {children}
      </div>

    </div>
  );
}