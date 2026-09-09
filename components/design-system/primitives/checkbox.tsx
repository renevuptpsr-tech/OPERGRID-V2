"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, type ComponentPropsWithoutRef } from "react";
import clsx from "clsx";

export type CheckboxProps = Omit<ComponentPropsWithoutRef<"input">, "type"> & { indeterminate?: boolean };

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { indeterminate = false, className, ...props }, ref,
) {
  const inputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => inputRef.current!, []);
  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate;
  }, [indeterminate, props.checked]);
  return <input {...props} ref={inputRef} type="checkbox"
    className={clsx("og-ds-checkbox og-ds-focus og-ds-transition", className)} />;
});
