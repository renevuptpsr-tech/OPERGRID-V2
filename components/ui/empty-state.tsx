import {
  Inbox,
} from "lucide-react";

import type {
  ReactNode,
} from "react";


type EmptyStateProps = {
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
};


export function EmptyState({
  title = "Belum ada data",
  description = "Data akan ditampilkan di sini setelah tersedia.",
  icon,
  action,
}: EmptyStateProps) {
  return (
    <div className="og-ui-empty-state flex flex-col items-center justify-center rounded-[14px] px-6 py-10 text-center">
      <div className="og-ui-empty-icon">
        {icon ?? (
          <Inbox
            size={19}
            strokeWidth={1.7}
          />
        )}
      </div>

      <div className="og-text mt-3 text-[12px] font-semibold">
        {title}
      </div>

      <p className="og-muted mt-1 max-w-[360px] text-[10px] leading-5">
        {description}
      </p>

      {action && (
        <div className="mt-4">
          {action}
        </div>
      )}
    </div>
  );
}