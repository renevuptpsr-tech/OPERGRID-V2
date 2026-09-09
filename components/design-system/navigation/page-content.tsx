import {
  type ReactNode,
} from "react";
import clsx from "clsx";

export type PageContentProps = {
  children: ReactNode;
  header?: ReactNode;
  className?: string;
};

export function PageContent({
  children,
  header,
  className,
}: PageContentProps) {
  return (
    <div
      className={clsx(
        "og-ds-page-content",
        className,
      )}
    >
      {header ? (
        <div className="og-ds-page-content-header">
          {header}
        </div>
      ) : null}

      <div className="og-ds-page-content-body">
        {children}
      </div>
    </div>
  );
}