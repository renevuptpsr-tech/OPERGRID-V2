import type {
  ReactNode,
} from "react";

import clsx from "clsx";


type DataTableShellProps = {
  children: ReactNode;
  className?: string;
  minWidth?: string;
};


export function DataTableShell({
  children,
  className,
  minWidth = "900px",
}: DataTableShellProps) {
  return (
    <div
      className={clsx(
        "og-ui-table-shell overflow-x-auto rounded-[12px]",
        className
      )}
    >
      <div
        style={{
          minWidth,
        }}
      >
        {children}
      </div>
    </div>
  );
}