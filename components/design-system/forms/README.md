# Phase 3 — forms, selection, date and time

All components require an existing `data-og-design-system="1"` ancestor. No page
or shell is opted in. Import from an individual module or this folder's `index.ts`.
`forms.css` is imported by the existing global stylesheet; all selectors are scoped.
No third-party default palette stylesheet is imported.

## APIs

| Component | Contract and main props |
| --- | --- |
| Field | `label`, `htmlFor` (generated when omitted), `required`, `optional`, `description`, `error`, `disabled`, `describedBy`, `className`; render-function child receives control association/validation props |
| FormSection | `title`, `description`, `icon`, `actions`, `columns={1\|2}`, children, id/className; fieldset/legend with subtle boundary, single column below 640px |
| Select | `options`, `value`/`defaultValue`, `onValueChange`, `placeholder`, disabled/error/required, native trigger props/ref, name/form |
| Combobox | Selection props plus `loading`, `clearable`, `onQueryChange`, `filter`, `selectedLabel`, `emptyText`; native Input props/ref and external description IDs |
| DatePicker | `value`/`defaultValue` as YYYY-MM-DD or empty, `onValueChange`, `min`, `max`, `disabledDates`, `today`, clearable/required/error/disabled, trigger props/ref, name/form |
| TimePicker | `value`/`defaultValue` as HH:mm or empty, `onValueChange`, `minuteStep`, `showNow`, clearable/required/error/disabled, trigger props/ref, name/form |
| DateTimePicker | `value`/`defaultValue` as explicit-offset ISO or empty, `onValueChange(iso)`, `label`, date constraints, `minuteStep`, `showNow`, clearable/required/error/disabled; native fieldset props/ref, name/form |
| DateRangePicker | `value`/`defaultValue` as `{ from, to }`, `onValueChange(range)`, date constraints, `today`, clearable/required/error/disabled, trigger props/ref; `fromName`, `toName`, form |

Use a consistently controlled or uncontrolled component for its mounted lifetime.
Empty string means no selection; a cleared range is `{ from: "", to: "" }`.
Set `value` and `onValueChange` for form-library integration, resets, and external
validation. `defaultValue` initializes local state; it is not a reset mechanism.
Do not switch between controlled/uncontrolled modes. `disabledDates` accepts a
readonly list of date-only strings or a pure predicate receiving a date-only string.
Supply valid ordered min/max constraints.

## Field and grouping

```tsx
<div data-og-design-system="1">
  <FormSection title="Operational details" columns={2}>
    <Field label="Role" htmlFor="role" required description="Choose one role.">
      {(control) => <Select {...control} name="role" options={roleOptions} />}
    </Field>
    <Field label="Operational date" error={dateError}>
      {(control) => <DatePicker {...control} value={date} onValueChange={setDate} />}
    </Field>
  </FormSection>
</div>
```

Spread Field's props onto the actual single control, not a wrapper. It composes
label/help/error IDs and passes disabled/required deliberately, without cloning
arbitrary children or disabling slots. For DateTimePicker use its own legend
(`label`) and fieldset description IDs, rather than associating an external HTML
label with a fieldset. Date and time inside it each have their own Field label.
Label size is 12px; help/errors are 11px. No domain validation/query is embedded.

## Select and Combobox

Options are `{ value: string, label: string, disabled?: boolean, keywords?: string[] }`.
Values must be unique and nonempty; Select reserves empty string for its placeholder.
Radix Select provides typeahead, arrow navigation, selection, dismissal and focus
restoration while the OPERGRID Button provides its visible trigger.

Combobox keeps focus on its search input with combobox/listbox/option roles and
aria-activedescendant. Arrows skip disabled choices and wrap; Home/End move to the
first/last enabled choice; Enter selects; Escape discards search and closes; Tab
leaves normally. Search text never becomes the stored value. Filtering matches
labels/keywords, is case/accent insensitive, and does not alter stable values.
Loading announces status and blocks selection of possibly stale results.

The list renders a bounded window of 36px rows plus the active option. It keeps
aria-posinset/setsize for the full filtered list. Long labels are visually truncated
with full accessible text and a title. Use Select for small static sets and
Combobox for large sets. `clearable` defaults true but required controls omit Clear.

For remote search set `filter={false}`, update `options` externally, use
`onQueryChange` to request results, and provide `loading`. The caller owns debounce,
request cancellation, stale-response protection, error UI and pagination. Supply
`selectedLabel` while the selected value is absent from the current result page;
otherwise an unknown value displays its raw value rather than an incorrect label.
No Role/Organization/Jabatan/UPT/ULTG/GI/Bay/Feeder query is embedded.

## Date and time contracts

- **Date-only:** exact `YYYY-MM-DD`; display `dd/MM/yyyy`. Parse/validate/compare,
  day arithmetic and presets work with civil integers/strings. No UTC serialization
  is used for date-only values.
- **Time-only:** exact `HH:mm`, 00:00–23:59. No AM/PM or timezone in the stored value.
- **Datetime:** explicit timezone-aware ISO. Combine date and time in
  `Asia/Jakarta`, e.g. `2026-09-09T14:35:00+07:00`. Reject offset-less input.
  Incoming instants with other explicit offsets display in Jakarta. Edits have
  minute precision; Apply emits seconds `00`. `toTimeZoneISO` preserves existing
  seconds/milliseconds when normalizing an instant without editing it.

The internal calendar adapter constructs a Jakarta noon representation for the
calendar library; it never serializes a date-only business value. An explicit noon
anchor avoids host numeric Date constructor normalization, including the skipped
2011-12-30 day in Pacific/Apia. Extract calendar fields back to the same date-only
string. Date-only paths do not call `toISOString()` or `new Date("YYYY-MM-DD")`.
The noon anchor is not a storage datetime and must not be submitted as one.

Datetime conversion resolves the Jakarta offset for the requested date. Rare
historical local datetimes requiring second-precision offsets are rejected rather
than silently shifted; DateTimePicker reports a readable message. Operational
dates with minute-representable offsets, including today's +07:00, are supported.

Shared exports in `date-time.ts`:

- `parseDateOnly`, `isValidDateOnly`, `formatDateOnly`, `dateFromParts`, `daysInMonth`.
- `parseTimeOnly`, `isValidTimeOnly`, `formatTimeOnly`, `minuteOptions`.
- `combineDateTime`, `toTimeZoneISO`, `splitDateTime`, `formatDateTime`.
- `currentLocalDate(now?)`, `currentLocalTime(now?)` (always Jakarta).
- `addDays`, `compareDates`, `isDateAllowed`, `isValidDateRange`, `isRangeAllowed`, `getDateRangePreset`.
- Calendar boundary adapters: `toCalendarDate`, `fromCalendarDate`.

Parsing returns parts or null; display helpers return empty for invalid standalone
date/time strings. Arithmetic/conversion rejects invalid input with RangeError.
Clock helpers accept an explicit instant for deterministic tests. Pass a date-only
`today` prop to date/range pickers to supply a deterministic calendar today.

## Picker behavior

DatePicker uses an Indonesian calendar with arrow-key day navigation, previous/next
month buttons, custom year selection, Today, optional Clear and Close. Navigation
defaults to 1900–2100 and expands to include a selected date, current date or explicit
bounds outside that window. Selection respects min/max and disabled dates.

TimePicker uses native accessible radio behavior for separate hour/minute columns,
styled with Phase 2 primitives. Step is an integer 1–60 (default 1). It controls
minute suggestions, not validation or implicit rounding: an existing off-step
minute and the precise Now minute remain selectable. Now changes the draft;
Apply commits; Cancel/Escape/outside dismissal discards the draft. Internal radio
choices are detached from the surrounding form's submission; only the committed
named hidden time value is submitted.

DateTimePicker has separate date/time drafts. Only its final Apply emits the
combined ISO when both are valid. Now fills the drafts; Clear emits empty when
allowed. External value changes replace the editor draft. Draft updates never
emit a misleading partial datetime or assume midnight for an incomplete value.

DateRangePicker highlights start, middle and end dates, shows a textual range, and
commits on Apply. End must be on/after start; disabled dates anywhere inside the
range disallow Apply. Invalid externally supplied ranges are marked aria-invalid.
Presets populate the draft; Custom starts a new range. Inclusive definitions:

| Preset | Jakarta calendar dates |
| --- | --- |
| Today | Today through today |
| Yesterday | Previous date through previous date |
| Last 7 Days | Today minus six calendar days through today |
| This Month | First through last date of the current month (includes future dates) |
| Last Month | First through last date of the previous month |
| Custom | User-selected dates |

Presets that violate date constraints are disabled. No UTC timestamp arithmetic
is used to compute preset boundaries.

## Accessibility and integration limits

Radix handles popover collision positioning, Escape/outside dismissal and focus
return for button-triggered pickers. Combobox overrides autofocus so focus remains
on its input. Calendar uses DayPicker's grid keyboard behavior and Indonesian day,
navigation and selected/today labels. Native RadioGroup semantics handle the time
columns. Error state uses aria-invalid plus Field's described error message.
Status text, check marks, ranges and thumb/radio marks supplement semantic colors.

Portal content is placed in the closest existing opt-in boundary to inherit light/
dark tokens. That boundary itself must not clip or transform fixed-position
descendants. Avoid nesting an independent dark class below the boundary; put the
theme on the boundary or document. No theme provider or persistence is introduced.
All animation is omitted except existing primitive transitions/spinners, which
honor Phase 1 reduced-motion settings. Popovers use only floating elevation.

Names on date/time/range/combobox controls submit hidden committed string values;
they are excluded when disabled. `required` on these custom controls is an ARIA
requirement and suppresses Clear, not native hidden-input validation. Validate
required values in the caller/form schema before submission. Radix Select supplies
its own native form bridge. This layer does not change any application's validation,
authorization or database contracts.

## Dependencies and validation

Approved direct dependencies: `@radix-ui/react-select` 2.3.7,
`@radix-ui/react-popover` 1.1.23, `@daypicker/react` 10.0.1. DayPicker brings
`react-day-picker`, `date-fns` and timezone helpers transitively. No separate
date-fns dependency or unrelated package upgrade was added.

```powershell
node --test components/design-system/forms/forms.test.mjs components/design-system/primitives/primitives.test.mjs
npm.cmd run lint
npm.cmd run build
git diff --check
```

Tests cover invalid dates/times, leap boundaries, explicit-offset combination,
Jakarta midnight, host-timezone invariance (UTC/Jakarta/Los Angeles/Apia), presets,
range constraints, selection/filter/navigation helpers, rendered associations and
submission values, token-only scope, and Phase 2 regression checks. Live browser
keyboard, screen-reader and visual checks were unavailable because no browser was
connected. No preview or production route was created.
