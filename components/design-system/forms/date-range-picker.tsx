"use client";
import { useId, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { CalendarDays } from "lucide-react";
import clsx from "clsx";
import { Button, type ButtonProps } from "../primitives/button";
import { Calendar } from "./calendar";
import { currentLocalDate, formatDateOnly, getDateRangePreset, isValidDateRange, isRangeAllowed, type DateConstraints, type DateRange, type RangePreset } from "./date-time";
import { useValue } from "./use-value";
import { useFormPortal } from "./use-form-portal";

export type DateRangePickerProps = Omit<ButtonProps, "value" | "defaultValue" | "children" | "onChange" | "name"> & DateConstraints & {
  value?: DateRange; defaultValue?: DateRange; onValueChange?: (range: DateRange) => void;
  fromName?: string; toName?: string; required?: boolean; error?: boolean; clearable?: boolean; today?: string;
};
const EMPTY: DateRange = { from: "", to: "" };
const PRESETS: { value: RangePreset; label: string }[] = [
  { value: "today", label: "Today" }, { value: "yesterday", label: "Yesterday" }, { value: "last7Days", label: "Last 7 Days" },
  { value: "thisMonth", label: "This Month" }, { value: "lastMonth", label: "Last Month" }, { value: "custom", label: "Custom" },
];
export function DateRangePicker({ value, defaultValue = EMPTY, onValueChange, min, max, disabledDates, fromName, toName, form,
  required, error, clearable = true, today, disabled, className, ...props }: DateRangePickerProps) {
  const [selected, setSelected] = useValue(value, defaultValue, onValueChange);
  const [open, setOpen] = useState(false), [draft, setDraft] = useState<DateRange>(EMPTY), [preset, setPreset] = useState<RangePreset>("custom");
  const { container, attachHost } = useFormPortal(), statusId = useId();
  const constraints = { min, max, disabledDates };
  const localToday = today ?? (open ? currentLocalDate() : "");
  const valid = isRangeAllowed(draft, constraints);
  function changeOpen(next: boolean) { if (next) { setDraft(isValidDateRange(selected) ? selected : EMPTY); setPreset("custom"); } setOpen(next); }
  function apply(range: DateRange) { setSelected(range); setOpen(false); }
  const text = selected.from || selected.to ? `${formatDateOnly(selected.from) || "…"} – ${formatDateOnly(selected.to) || "…"}` : "dd/MM/yyyy – dd/MM/yyyy";
  return <span ref={attachHost} className="og-ds-control-host">
    {fromName && <input type="hidden" name={fromName} form={form} value={selected.from} disabled={disabled} />}
    {toName && <input type="hidden" name={toName} form={form} value={selected.to} disabled={disabled} />}
    <Popover.Root open={open && !disabled} onOpenChange={changeOpen}>
      <Popover.Trigger asChild><Button {...props} variant="secondary" disabled={disabled} aria-required={required}
        aria-invalid={error || (!!(selected.from || selected.to) && !isRangeAllowed(selected, constraints)) || props["aria-invalid"]}
        className={clsx("og-ds-form-trigger", className)}><span>{text}</span><CalendarDays size={16} aria-hidden="true" /></Button></Popover.Trigger>
      <Popover.Portal container={container}><Popover.Content aria-label="Pilih rentang tanggal" aria-describedby={statusId}
        sideOffset={4} collisionPadding={12} className="og-ds-picker-content og-ds-range-content">
        <div className="og-ds-range-presets" role="group" aria-label="Preset rentang tanggal">
          {PRESETS.map((item) => <Button key={item.value} size="sm" variant={preset === item.value ? "primary" : "ghost"}
            aria-pressed={preset === item.value} disabled={item.value !== "custom" && !isRangeAllowed(getDateRangePreset(item.value, localToday), constraints)}
            onClick={() => { setPreset(item.value); setDraft(item.value === "custom" ? EMPTY : getDateRangePreset(item.value, localToday)); }}>{item.label}</Button>)}
        </div>
        <Calendar key={preset} mode="range" value={draft} {...constraints} today={localToday} onChange={(range) => { setPreset("custom"); setDraft(range); }} />
        <p id={statusId} className={draft.to && !valid ? "og-ds-field-error" : "og-ds-field-help"} aria-live="polite">
          {draft.to && !valid ? "Tanggal akhir harus sama atau setelah awal, tanpa tanggal yang dinonaktifkan." : draft.from ? `Dari ${formatDateOnly(draft.from)}${draft.to ? ` sampai ${formatDateOnly(draft.to)}` : "; pilih tanggal akhir"}` : "Pilih tanggal awal dan akhir."}
        </p>
        <div className="og-ds-picker-actions">
          {clearable && !required && <Button size="sm" variant="ghost" onClick={() => apply(EMPTY)}>Hapus</Button>}
          <Popover.Close asChild><Button size="sm" variant="secondary">Batal</Button></Popover.Close>
          <Button size="sm" disabled={!valid} onClick={() => apply(draft)}>Terapkan</Button>
        </div>
      </Popover.Content></Popover.Portal>
    </Popover.Root>
  </span>;
}
