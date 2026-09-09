import { TZDate } from "@daypicker/react";

export const OPERATIONAL_TIME_ZONE = "Asia/Jakarta";
export const OPERATIONAL_LOCALE = "id-ID";
export type DateParts = { year: number; month: number; day: number };
export type TimeParts = { hour: number; minute: number };
export type DateRange = { from: string; to: string };
export type RangePreset = "today" | "yesterday" | "last7Days" | "thisMonth" | "lastMonth" | "custom";
export type DateConstraints = { min?: string; max?: string; disabledDates?: readonly string[] | ((date: string) => boolean) };
export const pad2 = (value: number) => String(value).padStart(2, "0");
export function daysInMonth(year: number, month: number): number {
  return [31, year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1] ?? 0;
}
export function parseDateOnly(value: string): DateParts | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [year, month, day] = value.split("-").map(Number);
  return year >= 1 && month >= 1 && month <= 12 && day >= 1 && day <= daysInMonth(year, month) ? { year, month, day } : null;
}
export const isValidDateOnly = (value: string) => parseDateOnly(value) !== null;
export function dateFromParts({ year, month, day }: DateParts): string {
  const value = `${String(year).padStart(4, "0")}-${pad2(month)}-${pad2(day)}`;
  if (!isValidDateOnly(value)) throw new RangeError("Invalid calendar date");
  return value;
}
export function formatDateOnly(value: string): string {
  const p = parseDateOnly(value);
  return p ? `${pad2(p.day)}/${pad2(p.month)}/${String(p.year).padStart(4, "0")}` : "";
}
export function parseTimeOnly(value: string): TimeParts | null {
  if (!/^\d{2}:\d{2}$/.test(value)) return null;
  const [hour, minute] = value.split(":").map(Number);
  return hour < 24 && minute < 60 ? { hour, minute } : null;
}
export const isValidTimeOnly = (value: string) => parseTimeOnly(value) !== null;
export const formatTimeOnly = (value: string) => isValidTimeOnly(value) ? value : "";
export function compareDates(a: string, b: string): number {
  if (!isValidDateOnly(a) || !isValidDateOnly(b)) throw new RangeError("Expected YYYY-MM-DD");
  return a === b ? 0 : a < b ? -1 : 1;
}
// Calendar arithmetic uses civil year/month/day integers, never UTC timestamps.
export function addDays(value: string, amount: number): string {
  const p = parseDateOnly(value);
  if (!p || !Number.isSafeInteger(amount) || Math.abs(amount) > 3660000) throw new RangeError("Invalid date/day offset");
  let { year, month, day } = p;
  day += amount;
  while (day > daysInMonth(year, month)) {
    day -= daysInMonth(year, month);
    if (++month > 12) { month = 1; year++; }
    if (year > 9999) throw new RangeError("Date outside supported range");
  }
  while (day < 1) {
    if (--month < 1) { month = 12; year--; }
    if (year < 1) throw new RangeError("Date outside supported range");
    day += daysInMonth(year, month);
  }
  return dateFromParts({ year, month, day });
}
export function isDateAllowed(value: string, { min, max, disabledDates }: DateConstraints = {}): boolean {
  if (!isValidDateOnly(value)) return false;
  if (min && compareDates(value, min) < 0) return false;
  if (max && compareDates(value, max) > 0) return false;
  return typeof disabledDates === "function" ? !disabledDates(value) : !disabledDates?.includes(value);
}
export function isValidDateRange(range: DateRange): boolean {
  return isValidDateOnly(range.from) && isValidDateOnly(range.to) && compareDates(range.from, range.to) <= 0;
}
export function isRangeAllowed(range: DateRange, constraints: DateConstraints = {}): boolean {
  if (!isValidDateRange(range)) return false;
  if (!isDateAllowed(range.from, constraints) || !isDateAllowed(range.to, constraints)) return false;
  if (!constraints.disabledDates) return true;
  let date = range.from;
  while (true) {
    if (!isDateAllowed(date, constraints)) return false;
    if (date === range.to) return true;
    date = addDays(date, 1);
  }
}
/** Date objects exist only at the calendar-library boundary, at Jakarta noon. */
export function toCalendarDate(value: string): TZDate {
  if (!parseDateOnly(value)) throw new RangeError("Expected YYYY-MM-DD");
  // Explicit noon anchor avoids host-zone numeric-constructor normalization (e.g. Apia's skipped day).
  // This adapter never serializes the business value, nor passes a date-only string to Date.
  return new TZDate(`${value}T12:00:00+07:00`, OPERATIONAL_TIME_ZONE);
}
export function fromCalendarDate(date: Date): string {
  const local = new TZDate(date, OPERATIONAL_TIME_ZONE);
  return dateFromParts({ year: local.getFullYear(), month: local.getMonth() + 1, day: local.getDate() });
}
export function currentLocalDate(now: Date = new Date()): string { return fromCalendarDate(now); }
export function currentLocalTime(now: Date = new Date()): string {
  if (!Number.isFinite(now.getTime())) throw new RangeError("Invalid instant");
  const local = new TZDate(now, OPERATIONAL_TIME_ZONE);
  return `${pad2(local.getHours())}:${pad2(local.getMinutes())}`;
}
/** Only a combined date AND time becomes an instant; date-only never uses ISO serialization. */
export function combineDateTime(date: string, time: string): string {
  const d = parseDateOnly(date), t = parseTimeOnly(time);
  if (!d || !t) throw new RangeError("Expected YYYY-MM-DD and HH:mm");
  let local = new TZDate(`${date}T${time}:00+07:00`, OPERATIONAL_TIME_ZONE);
  // Resolve Jakarta's offset for the requested date rather than silently assuming it historically.
  for (let attempt = 0; attempt < 3; attempt++) {
    const offset = -local.getTimezoneOffset();
    const sign = offset >= 0 ? "+" : "-", absolute = Math.abs(offset);
    local = new TZDate(`${date}T${time}:00${sign}${pad2(Math.floor(absolute / 60))}:${pad2(absolute % 60)}`, OPERATIONAL_TIME_ZONE);
  }
  if (fromCalendarDate(local) !== date || currentLocalTime(local) !== time || local.getSeconds() !== 0) throw new RangeError("Local datetime cannot be represented with minute-precision ISO offset");
  return local.toISOString().replace(".000", "");
}
function parseInstant(value: string): Date {
  const match = /^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}):(\d{2})(?:\.\d{1,3})?(Z|[+-]\d{2}:\d{2})$/.exec(value);
  if (!match || !isValidDateOnly(match[1]) || !isValidTimeOnly(match[2]) || Number(match[3]) > 59) throw new RangeError("Expected timezone-aware ISO datetime");
  if (match[4] !== "Z") {
    const [hours, minutes] = match[4].slice(1).split(":").map(Number);
    if (hours > 14 || minutes > 59 || (hours === 14 && minutes !== 0)) throw new RangeError("Invalid ISO offset");
  }
  const instant = new Date(value); // Explicit-offset datetime only, never a date-only value.
  if (!Number.isFinite(instant.getTime())) throw new RangeError("Invalid instant");
  return instant;
}
export function toTimeZoneISO(value: string): string {
  return new TZDate(parseInstant(value), OPERATIONAL_TIME_ZONE).toISOString().replace(".000", "");
}
export function splitDateTime(value: string): { date: string; time: string } {
  const instant = parseInstant(value);
  return { date: currentLocalDate(instant), time: currentLocalTime(instant) };
}
export function formatDateTime(value: string): string {
  const { date, time } = splitDateTime(value);
  return `${formatDateOnly(date)} ${time}`;
}
export function getDateRangePreset(preset: Exclude<RangePreset, "custom">, today = currentLocalDate()): DateRange {
  const p = parseDateOnly(today);
  if (!p) throw new RangeError("Invalid local today");
  const first = dateFromParts({ ...p, day: 1 });
  switch (preset) {
    case "today": return { from: today, to: today };
    case "yesterday": { const day = addDays(today, -1); return { from: day, to: day }; }
    case "last7Days": return { from: addDays(today, -6), to: today };
    case "thisMonth": return { from: first, to: dateFromParts({ ...p, day: daysInMonth(p.year, p.month) }) };
    case "lastMonth": { const to = addDays(first, -1); return { from: `${to.slice(0, 7)}-01`, to }; }
  }
}
export function minuteOptions(step = 1): string[] {
  if (!Number.isInteger(step) || step < 1 || step > 60) throw new RangeError("minuteStep must be an integer from 1 to 60");
  return Array.from({ length: Math.ceil(60 / step) }, (_, i) => pad2(i * step));
}
