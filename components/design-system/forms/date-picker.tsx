"use client";
import { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { CalendarDays } from "lucide-react";
import clsx from "clsx";
import { Button, type ButtonProps } from "../primitives/button";
import { Calendar } from "./calendar";
import { currentLocalDate, formatDateOnly, isDateAllowed, type DateConstraints } from "./date-time";
import { useValue } from "./use-value";
import { useFormPortal } from "./use-form-portal";

export type DatePickerProps = Omit<ButtonProps, "value" | "defaultValue" | "children" | "onChange"> & DateConstraints & {
  value?: string; defaultValue?: string; onValueChange?: (value: string) => void;
  required?: boolean; error?: boolean; clearable?: boolean; placeholder?: string; today?: string;
};
export function DatePicker({ value, defaultValue = "", onValueChange, min, max, disabledDates, required,
  error, clearable = true, placeholder = "dd/MM/yyyy", today, disabled, name, form, className, ...props }: DatePickerProps) {
  const [selected, setSelected] = useValue(value, defaultValue, onValueChange);
  const [open, setOpen] = useState(false);
  const { container, attachHost } = useFormPortal();
  const constraints = { min, max, disabledDates };
  const localToday = today ?? (open ? currentLocalDate() : "");
  function choose(date: string) { setSelected(date); setOpen(false); }
  return <span ref={attachHost} className="og-ds-control-host">
    {name && <input type="hidden" name={name} form={form} value={selected} disabled={disabled} />}
    <Popover.Root open={open && !disabled} onOpenChange={setOpen}>
      <Popover.Trigger asChild><Button {...props} variant="secondary" disabled={disabled} aria-required={required}
        aria-invalid={error || (!!selected && !isDateAllowed(selected, constraints)) || props["aria-invalid"]}
        className={clsx("og-ds-form-trigger", className)}><span>{formatDateOnly(selected) || placeholder}</span><CalendarDays size={16} aria-hidden="true" /></Button></Popover.Trigger>
      <Popover.Portal container={container}><Popover.Content aria-label="Pilih tanggal" sideOffset={4} collisionPadding={12} className="og-ds-picker-content">
        <Calendar mode="single" value={formatDateOnly(selected) ? selected : ""} onChange={choose} {...constraints} today={localToday} />
        <div className="og-ds-picker-actions">
          <Button size="sm" variant="ghost" disabled={!isDateAllowed(localToday, constraints)} onClick={() => choose(localToday)}>Hari ini</Button>
          {clearable && !required && <Button size="sm" variant="ghost" onClick={() => choose("")}>Hapus</Button>}
          <Popover.Close asChild><Button size="sm" variant="secondary">Tutup</Button></Popover.Close>
        </div>
      </Popover.Content></Popover.Portal>
    </Popover.Root>
  </span>;
}
