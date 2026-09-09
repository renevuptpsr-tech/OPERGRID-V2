"use client";

import { createContext, useContext, useId, type ComponentPropsWithRef, type ReactNode } from "react";
import clsx from "clsx";

type GroupContext = {
  name: string;
  value?: string;
  defaultValue?: string;
  required?: boolean;
  onValueChange?: (value: string) => void;
};
const RadioContext = createContext<GroupContext | null>(null);

export type RadioGroupProps = Omit<ComponentPropsWithRef<"fieldset">, "onChange"> & {
  legend: ReactNode;
  name?: string;
  value?: string;
  defaultValue?: string;
  required?: boolean;
  onValueChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
};

export function RadioGroup({ legend, name, value, defaultValue, required, onValueChange,
  orientation = "vertical", children, className, ...props }: RadioGroupProps) {
  const id = useId();
  return (
    <RadioContext.Provider value={{ name: name ?? id, value, defaultValue, required, onValueChange }}>
      <fieldset {...props} className={clsx("og-ds-radio-group", className)}>
        <legend className="og-ds-label">{legend}</legend>
        <div className="og-ds-radio-options" data-orientation={orientation}>{children}</div>
      </fieldset>
    </RadioContext.Provider>
  );
}

export type RadioProps = Omit<ComponentPropsWithRef<"input">, "type"> & { value: string };

export function Radio({ className, onChange, ...props }: RadioProps) {
  const group = useContext(RadioContext);
  const checked = group?.value !== undefined ? group.value === props.value : props.checked;
  const defaultChecked = checked === undefined
    ? (group?.defaultValue !== undefined ? group.defaultValue === props.value : props.defaultChecked)
    : undefined;
  return <input {...props} type="radio" name={group?.name ?? props.name}
    required={group?.required ?? props.required} checked={checked} defaultChecked={defaultChecked}
    onChange={(event) => {
      onChange?.(event);
      if (!event.defaultPrevented && event.target.checked) group?.onValueChange?.(event.target.value);
    }} className={clsx("og-ds-radio og-ds-focus og-ds-transition", className)} />;
}
