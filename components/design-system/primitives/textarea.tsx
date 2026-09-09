import type { ComponentPropsWithRef } from "react";
import clsx from "clsx";

export type TextareaProps = ComponentPropsWithRef<"textarea"> & {
  error?: boolean;
  resize?: "none" | "vertical" | "horizontal" | "both";
};

export function Textarea({ error = false, resize = "vertical", rows = 3, className, style, ...props }: TextareaProps) {
  return <textarea {...props} rows={rows} aria-invalid={error ? true : props["aria-invalid"]}
    className={clsx("og-ds-textarea og-ds-focus og-ds-transition", className)} style={{ resize, ...style }} />;
}
