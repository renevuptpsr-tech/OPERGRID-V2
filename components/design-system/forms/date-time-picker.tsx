"use client";
import { useState, type ComponentPropsWithRef } from "react";
import clsx from "clsx";
import { Button } from "../primitives/button";
import { Field } from "./field";
import { DatePicker } from "./date-picker";
import { TimePicker } from "./time-picker";
import { combineDateTime, currentLocalDate, currentLocalTime, isDateAllowed, isValidTimeOnly, splitDateTime, type DateConstraints } from "./date-time";
import { useValue } from "./use-value";

export type DateTimePickerProps = Omit<ComponentPropsWithRef<"fieldset">, "onChange" | "defaultValue"> & DateConstraints & {
  value?: string; defaultValue?: string; onValueChange?: (iso: string) => void;
  label?: string; minuteStep?: number; showNow?: boolean; clearable?: boolean; required?: boolean; error?: boolean;
};
function DateTimeEditor({ value, onApply, disabled, required, min, max, disabledDates, minuteStep, showNow, clearable }: DateTimePickerProps & {
  value: string; onApply: (iso: string) => void;
}) {
  let initial = { date: "", time: "" };
  try { if (value) initial = splitDateTime(value); } catch { /* Invalid external values are marked on the group. */ }
  const [draft, setDraft] = useState(initial);
  const [feedback, setFeedback] = useState("");
  const constraints = { min, max, disabledDates };
  const valid = isDateAllowed(draft.date, constraints) && isValidTimeOnly(draft.time);
  return <>
    <div className="og-ds-form-grid" data-columns="2">
      <Field label="Tanggal" required={required} disabled={disabled}>{(field) => <DatePicker {...field} {...constraints}
        value={draft.date} onValueChange={(date) => setDraft({ ...draft, date })} />}</Field>
      <Field label="Waktu (WIB, 24 jam)" required={required} disabled={disabled}>{(field) => <TimePicker {...field}
        minuteStep={minuteStep} value={draft.time} onValueChange={(time) => setDraft({ ...draft, time })} />}</Field>
    </div>
    <div className="og-ds-picker-actions">
      {showNow && <Button size="sm" variant="ghost" disabled={disabled} onClick={() => {
        const now = new Date(), date = currentLocalDate(now);
        if (isDateAllowed(date, constraints)) { setDraft({ date, time: currentLocalTime(now) }); setFeedback(""); }
        else setFeedback("Tanggal hari ini berada di luar pilihan yang diizinkan.");
      }}>Sekarang</Button>}
      {clearable && !required && <Button size="sm" variant="ghost" disabled={disabled} onClick={() => { setDraft({ date: "", time: "" }); onApply(""); }}>Hapus</Button>}
      <Button size="sm" disabled={disabled || !valid} onClick={() => {
        try { onApply(combineDateTime(draft.date, draft.time)); setFeedback(""); }
        catch { setFeedback("Waktu lokal ini tidak dapat disimpan dengan offset ISO yang didukung. Pilih tanggal atau waktu lain."); }
      }}>Terapkan</Button>
    </div>
    {feedback && <p className="og-ds-field-error" role="status">{feedback}</p>}
  </>;
}
/** value/onValueChange are explicit-offset ISO strings (or empty), never date-only strings. */
export function DateTimePicker({ value, defaultValue = "", onValueChange, label = "Tanggal dan waktu", minuteStep = 1,
  showNow = true, clearable = true, required, error, min, max, disabledDates, disabled, name, form, className, ...props }: DateTimePickerProps) {
  const [selected, setSelected] = useValue(value, defaultValue, onValueChange);
  let invalid = false;
  try { if (selected) invalid = !isDateAllowed(splitDateTime(selected).date, { min, max, disabledDates }); } catch { invalid = true; }
  return <fieldset {...props} disabled={disabled} aria-invalid={error || invalid || props["aria-invalid"]} className={clsx("og-ds-date-time", className)}>
    <legend className="og-ds-label">{label}{required ? " *" : ""}</legend>
    {name && <input type="hidden" name={name} form={form} value={selected} disabled={disabled} />}
    <DateTimeEditor key={selected} value={selected} onApply={setSelected} disabled={disabled} required={required} minuteStep={minuteStep}
      showNow={showNow} clearable={clearable} min={min} max={max} disabledDates={disabledDates} />
  </fieldset>;
}
