import {
  type ReactNode,
} from "react";
import clsx from "clsx";

export type ContentContainerSize =
  | "standard"
  | "wide"
  | "full";

export type ContentContainerProps = {
  children: ReactNode;
  size?: ContentContainerSize;
  className?: string;
};

export function ContentContainer({
  children,
  size = "standard",
  className,
}: ContentContainerProps) {
  return (
    <div
      className={clsx(
        "og-ds-content-container",
        className,
      )}
      data-size={size}
    >
      {children}
    </div>
  );
}