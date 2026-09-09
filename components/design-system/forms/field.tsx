"use client";
import { useId, type ReactNode } from "react";
import clsx from "clsx";
import { Label } from "../primitives/label";

export type FieldControlProps = {
  id: string; required?: boolean; disabled?: boolean;
  "aria-invalid"?: true; "aria-describedby"?: string;
};
export type FieldProps = {
  label: ReactNode; htmlFor?: string; required?: boolean; optional?: boolean;
  description?: ReactNode; error?: ReactNode; disabled?: boolean; describedBy?: string;
  className?: string; children: (props: FieldControlProps) => ReactNode;
};
export function Field({ label, htmlFor, required, optional, description, error, disabled, describedBy, className, children }: FieldProps) {
  const generatedId = useId();
  const id = htmlFor ?? generatedId;
  const ids = [describedBy, description ? `${id}-help` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;
  return <div className={clsx("og-ds-field", className)}>
    <Label htmlFor={id} required={required} optional={optional} disabled={disabled}>{label}</Label>
    {children({ id, required, disabled, "aria-invalid": error ? true : undefined, "aria-describedby": ids })}
    {description && <p id={`${id}-help`} className="og-ds-field-help">{description}</p>}
    {error && <p id={`${id}-error`} className="og-ds-field-error" aria-live="polite">{error}</p>}
  </div>;
}
