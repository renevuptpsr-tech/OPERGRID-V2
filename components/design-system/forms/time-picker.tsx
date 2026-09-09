"use client";
import { useId, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { Clock3 } from "lucide-react";
import clsx from "clsx";
import { Button, type ButtonProps } from "../primitives/button";
import { Radio, RadioGroup } from "../primitives/radio";
import { currentLocalTime, formatTimeOnly, minuteOptions, pad2, parseTimeOnly } from "./date-time";
import { useValue } from "./use-value";
import { useFormPortal } from "./use-form-portal";

export type TimePickerProps = Omit<ButtonProps, "value" | "defaultValue" | "children" | "onChange"> & {
  value?: string; defaultValue?: string; onValueChange?: (value: string) => void;
  minuteStep?: number; showNow?: boolean; clearable?: boolean; required?: boolean; error?: boolean;
};
export function TimePicker({ value, defaultValue = "", onValueChange, minuteStep = 1, showNow = true,
  clearable = true, required, error, disabled, name, form, className, ...props }: TimePickerProps) {
  const [selected, setSelected] = useValue(value, defaultValue, onValueChange);
  const draftForm = `${useId()}-time-draft`;
  const [open, setOpen] = useState(false), [draft, setDraft] = useState("00:00");
  const { container, attachHost } = useFormPortal();
  const minutes = minuteOptions(minuteStep);
  const [hour, minute] = draft.split(":");
  // Preserve an existing off-step value; step controls suggestions, never rounds stored values silently.
  if (!minutes.includes(minute)) minutes.push(minute);
  minutes.sort();
  function changeOpen(next: boolean) { if (next) setDraft(formatTimeOnly(selected) || "00:00"); setOpen(next); }
  function apply(next: string) { setSelected(next); setOpen(false); }
  return <span ref={attachHost} className="og-ds-control-host">
    {name && <input type="hidden" name={name} form={form} value={selected} disabled={disabled} />}
    <Popover.Root open={open && !disabled} onOpenChange={changeOpen}>
      <Popover.Trigger asChild><Button {...props} variant="secondary" disabled={disabled} aria-required={required}
        aria-invalid={error || (!!selected && !parseTimeOnly(selected)) || props["aria-invalid"]}
        className={clsx("og-ds-form-trigger", className)}><span>{formatTimeOnly(selected) || "HH:mm"}</span><Clock3 size={16} aria-hidden="true" /></Button></Popover.Trigger>
      <Popover.Portal container={container}><Popover.Content aria-label="Pilih waktu 24 jam" sideOffset={4} collisionPadding={12} className="og-ds-picker-content">
        <output className="og-ds-time-preview" aria-live="polite">{draft}</output>
        <div className="og-ds-time-columns">
          <RadioGroup legend="Jam" value={hour} onValueChange={(next) => setDraft(`${next}:${minute}`)}>
            {Array.from({ length: 24 }, (_, i) => pad2(i)).map((item) => <label key={item} className="og-ds-time-option"><Radio value={item} form={draftForm} />{item}</label>)}
          </RadioGroup>
          <RadioGroup legend="Menit" value={minute} onValueChange={(next) => setDraft(`${hour}:${next}`)}>
            {minutes.map((item) => <label key={item} className="og-ds-time-option"><Radio value={item} form={draftForm} />{item}</label>)}
          </RadioGroup>
        </div>
        <div className="og-ds-picker-actions">
          {showNow && <Button size="sm" variant="ghost" onClick={() => setDraft(currentLocalTime())}>Sekarang</Button>}
          {clearable && !required && <Button size="sm" variant="ghost" onClick={() => apply("")}>Hapus</Button>}
          <Popover.Close asChild><Button size="sm" variant="secondary">Batal</Button></Popover.Close>
          <Button size="sm" onClick={() => apply(draft)}>Terapkan</Button>
        </div>
      </Popover.Content></Popover.Portal>
    </Popover.Root>
  </span>;
}
