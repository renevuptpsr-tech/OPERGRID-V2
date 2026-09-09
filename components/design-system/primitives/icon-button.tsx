import clsx from "clsx";
import { Button, type ButtonProps } from "./button";

export type IconButtonProps = Omit<ButtonProps, "leftIcon" | "rightIcon" | "fullWidth" | "loadingText" | "aria-label"> & {
  "aria-label": string;
};

export function IconButton({ children, className, variant = "ghost", ...props }: IconButtonProps) {
  return (
    <Button {...props} variant={variant} loadingText="" className={clsx("og-ds-icon-button", className)}>
      <span className="og-ds-icon" aria-hidden="true">{children}</span>
    </Button>
  );
}
