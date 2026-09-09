"use client";
import * as RadixSelect from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import clsx from "clsx";
import { Button, type ButtonProps } from "../primitives/button";
import { useFormPortal } from "./use-form-portal";
import type { SelectOption } from "./options";

export type SelectProps = Omit<ButtonProps, "value" | "defaultValue" | "onChange" | "children" | "name" | "form" | "size" | "loading"> & {
  options: readonly SelectOption[]; value?: string; defaultValue?: string; onValueChange?: (value: string) => void;
  name?: string; form?: string; required?: boolean; placeholder?: string; error?: boolean;
};
export function Select({ options, value, defaultValue, onValueChange, name, form, required, placeholder = "Pilih…",
  error, disabled, className, ...props }: SelectProps) {
  const { container, attachHost } = useFormPortal();
  return <span ref={attachHost} className="og-ds-control-host">
    <RadixSelect.Root value={value} defaultValue={defaultValue} onValueChange={onValueChange} disabled={disabled} name={name} form={form} required={required}>
      <RadixSelect.Trigger asChild>
        <Button {...props} disabled={disabled} variant="secondary" aria-invalid={error || props["aria-invalid"]}
          className={clsx("og-ds-form-trigger", className)}>
          <RadixSelect.Value placeholder={placeholder} /><RadixSelect.Icon><ChevronDown size={16} aria-hidden="true" /></RadixSelect.Icon>
        </Button>
      </RadixSelect.Trigger>
      <RadixSelect.Portal container={container}>
        <RadixSelect.Content position="popper" sideOffset={4} collisionPadding={12} className="og-ds-select-content">
          <RadixSelect.ScrollUpButton className="og-ds-select-scroll"><ChevronUp size={16} /></RadixSelect.ScrollUpButton>
          <RadixSelect.Viewport className="og-ds-select-viewport">
            {options.map((option) => <RadixSelect.Item key={option.value} value={option.value} disabled={option.disabled}
              textValue={option.label} className="og-ds-option og-ds-focus">
              <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
              <RadixSelect.ItemIndicator><Check size={14} aria-hidden="true" /></RadixSelect.ItemIndicator>
            </RadixSelect.Item>)}
          </RadixSelect.Viewport>
          <RadixSelect.ScrollDownButton className="og-ds-select-scroll"><ChevronDown size={16} /></RadixSelect.ScrollDownButton>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  </span>;
}
