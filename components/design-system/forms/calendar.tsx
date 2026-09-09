"use client";
import { useState } from "react";
import { DayPicker, type DateRange as CalendarRange } from "@daypicker/react";
import { id } from "@daypicker/react/locale";
import { Select } from "./select";
import { currentLocalDate, fromCalendarDate, toCalendarDate, isDateAllowed, OPERATIONAL_TIME_ZONE, type DateConstraints, type DateRange } from "./date-time";

type CalendarProps = DateConstraints & { today?: string } & (
  { mode: "single"; value: string; onChange: (value: string) => void } |
  { mode: "range"; value: DateRange; onChange: (value: DateRange) => void }
);
export function Calendar({ today = currentLocalDate(), ...props }: CalendarProps) {
  const selectedDate = props.mode === "single" ? props.value : props.value.from;
  const initial = selectedDate || today;
  const lower = props.min ?? `${Math.min(1900, Number(initial.slice(0, 4)), Number(props.max?.slice(0, 4) ?? 9999)).toString().padStart(4, "0")}-01-01`;
  const upper = props.max ?? `${Math.max(2100, Number(initial.slice(0, 4)), Number(lower.slice(0, 4)))}-12-31`;
  const bounded = initial < lower ? lower : initial > upper ? upper : initial;
  const [month, setMonth] = useState(() => toCalendarDate(bounded));
  const year = month.getFullYear();
  const years = Array.from({ length: Number(upper.slice(0, 4)) - Number(lower.slice(0, 4)) + 1 }, (_, i) => {
    const value = String(Number(lower.slice(0, 4)) + i); return { value, label: value };
  });
  const selection = props.mode === "single" ? {
    mode: "single" as const, selected: props.value ? toCalendarDate(props.value) : undefined,
    onSelect: (date: Date | undefined) => { if (date) props.onChange(fromCalendarDate(date)); },
  } : {
    mode: "range" as const, selected: props.value.from ? { from: toCalendarDate(props.value.from), to: props.value.to ? toCalendarDate(props.value.to) : undefined } : undefined,
    onSelect: (range: CalendarRange | undefined) => props.onChange({ from: range?.from ? fromCalendarDate(range.from) : "", to: range?.to ? fromCalendarDate(range.to) : "" }),
    excludeDisabled: true,
  };
  return <div className="og-ds-calendar">
    <Select aria-label="Tahun kalender" value={String(year)} options={years} onValueChange={(value) => {
      const target = `${value.padStart(4, "0")}-${String(month.getMonth() + 1).padStart(2, "0")}-01`;
      setMonth(toCalendarDate(target < lower ? lower : target > upper ? upper : target));
    }} />
    <DayPicker {...selection} locale={id} timeZone={OPERATIONAL_TIME_ZONE} noonSafe autoFocus
      today={toCalendarDate(today)} month={month} onMonthChange={(date) => setMonth(toCalendarDate(fromCalendarDate(date)))} startMonth={toCalendarDate(lower)} endMonth={toCalendarDate(upper)}
      showOutsideDays fixedWeeks disabled={(date) => !isDateAllowed(fromCalendarDate(date), props)}
      labels={{ labelNext: () => "Bulan berikutnya", labelPrevious: () => "Bulan sebelumnya", labelNav: () => "Navigasi kalender",
        labelDayButton: (date, modifiers) => `${date.toLocaleDateString("id-ID", { timeZone: OPERATIONAL_TIME_ZONE, weekday: "long", day: "numeric", month: "long", year: "numeric" })}${modifiers.today ? ", hari ini" : ""}${modifiers.selected ? ", dipilih" : ""}` }}
      classNames={{ root: "og-ds-calendar-root", months: "og-ds-calendar-months", month: "og-ds-calendar-month", month_caption: "og-ds-calendar-caption",
        caption_label: "og-ds-calendar-caption-label", nav: "og-ds-calendar-nav", button_previous: "og-ds-calendar-nav-button og-ds-focus",
        button_next: "og-ds-calendar-nav-button og-ds-focus", chevron: "og-ds-calendar-chevron", month_grid: "og-ds-calendar-grid",
        weekday: "og-ds-calendar-weekday", day: "og-ds-calendar-day", day_button: "og-ds-calendar-day-button og-ds-focus",
        selected: "og-ds-calendar-selected", today: "og-ds-calendar-today", disabled: "og-ds-calendar-disabled", outside: "og-ds-calendar-outside",
        range_start: "og-ds-calendar-range-start", range_end: "og-ds-calendar-range-end", range_middle: "og-ds-calendar-range-middle", hidden: "og-ds-calendar-hidden" }} />
  </div>;
}
