import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { test } from "node:test";
import { createElement as h } from "react";
import { renderToStaticMarkup as render } from "react-dom/server";
import ts from "typescript";
import postcss from "postcss";

const require = createRequire(import.meta.url);
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
for (const extension of [".ts", ".tsx"]) {
  const previous = require.extensions[extension];
  require.extensions[extension] = (module, filename) => {
    if (!filename.startsWith(root + sep)) {
      if (previous) return previous(module, filename);
      throw new Error(`Unexpected TSX module: ${filename}`);
    }
    const { outputText } = ts.transpileModule(readFileSync(filename, "utf8"), {
      compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, esModuleInterop: true },
    });
    module._compile(outputText, filename);
  };
}
const dates = require("./date-time.ts");
const { filterOptions, nextEnabledOption, selectedOption } = require("./options.ts");
const { Field, FormSection, Select, Combobox, DatePicker, TimePicker, DateTimePicker, DateRangePicker } = require("./index.ts");
const { Input } = require("../primitives/input.tsx");

test("strict date-only parsing and display reject rollover and non-canonical values", () => {
  assert.deepEqual(dates.parseDateOnly("2026-09-09"), { year: 2026, month: 9, day: 9 });
  assert.equal(dates.formatDateOnly("2026-09-09"), "09/09/2026");
  for (const value of ["2026-02-29", "2026-04-31", "0000-01-01", "2026-13-01", "09/09/2026", "2026-9-9", "2026-09-09T00:00:00Z"]) {
    assert.equal(dates.isValidDateOnly(value), false, value);
  }
  assert.equal(dates.isValidDateOnly("2000-02-29"), true);
  assert.equal(dates.isValidDateOnly("1900-02-29"), false);
});

test("24-hour time validation and minute steps never introduce AM/PM or rounding", () => {
  for (const value of ["00:00", "14:35", "23:59"]) assert.equal(dates.formatTimeOnly(value), value);
  for (const value of ["24:00", "12:60", "-1:00", "9:05", "14:35:00", "02:30 PM"]) assert.equal(dates.isValidTimeOnly(value), false);
  assert.deepEqual(dates.minuteOptions(15), ["00", "15", "30", "45"]);
  assert.deepEqual(dates.minuteOptions(60), ["00"]);
  assert.throws(() => dates.minuteOptions(0), RangeError);
  assert.throws(() => dates.minuteOptions(2.5), RangeError);
});

test("calendar arithmetic handles leap years, month/year boundaries and comparisons without instants", () => {
  assert.equal(dates.addDays("2024-03-01", -1), "2024-02-29");
  assert.equal(dates.addDays("2026-01-01", -1), "2025-12-31");
  assert.equal(dates.addDays("2026-12-31", 1), "2027-01-01");
  assert.equal(dates.addDays("2026-09-09", -365), "2025-09-09");
  assert.equal(dates.compareDates("2026-09-09", "2026-09-10"), -1);
  assert.equal(dates.compareDates("2026-09-09", "2026-09-09"), 0);
  assert.throws(() => dates.addDays("0001-01-01", -1), RangeError);
  assert.throws(() => dates.compareDates("bad", "2026-09-09"), RangeError);
});

test("date and time combine to Jakarta ISO; offset-less datetimes are rejected", () => {
  assert.equal(dates.combineDateTime("2026-09-09", "14:35"), "2026-09-09T14:35:00+07:00");
  assert.equal(dates.toTimeZoneISO("2026-09-09T23:35:00Z"), "2026-09-10T06:35:00+07:00");
  assert.deepEqual(dates.splitDateTime("2026-09-09T23:35:00Z"), { date: "2026-09-10", time: "06:35" });
  assert.equal(dates.formatDateTime("2026-09-09T14:35:00+07:00"), "09/09/2026 14:35");
  for (const invalid of ["2026-09-09", "2026-09-09T14:35:00", "2026-02-30T14:35:00Z", "2026-09-09T14:35:00+14:30"]) {
    assert.throws(() => dates.toTimeZoneISO(invalid), RangeError);
  }
});

test("Jakarta current date/time cross UTC midnight together", () => {
  const now = new Date("2026-09-09T17:05:00Z");
  assert.equal(dates.currentLocalDate(now), "2026-09-10");
  assert.equal(dates.currentLocalTime(now), "00:05");
});

test("date-only and datetime contracts are identical across host timezones", () => {
  const path = resolve(root, "forms/date-time.ts");
  const source = `
    const ts = require('typescript'), fs = require('node:fs');
    const compiled = ts.transpileModule(fs.readFileSync(${JSON.stringify(path)}, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
    const mod = { exports: {} }; new Function('require','module','exports',compiled)(require,mod,mod.exports);
    const d=mod.exports;
    console.log(JSON.stringify(['2026-09-09','2024-02-29','2011-12-30','0099-01-01'].map(v=>d.fromCalendarDate(d.toCalendarDate(v)))));
    console.log(d.combineDateTime('2026-09-09','14:35'));
    console.log(JSON.stringify(d.getDateRangePreset('last7Days',d.currentLocalDate(new Date('2026-09-09T17:05:00Z')))));
  `;
  const outputs = ["UTC", "Asia/Jakarta", "America/Los_Angeles", "Pacific/Apia"].map((TZ) =>
    execFileSync(process.execPath, ["-e", source], { encoding: "utf8", env: { ...process.env, TZ } }).trim());
  for (const output of outputs) assert.equal(output, outputs[0]);
  assert.match(outputs[0], /\["2026-09-09","2024-02-29","2011-12-30","0099-01-01"\]/);
});

test("range validation rejects reversal, incomplete values and disabled days inside ranges", () => {
  assert.equal(dates.isValidDateRange({ from: "2026-09-09", to: "2026-09-09" }), true);
  assert.equal(dates.isValidDateRange({ from: "2026-09-10", to: "2026-09-09" }), false);
  assert.equal(dates.isValidDateRange({ from: "2026-09-09", to: "" }), false);
  assert.equal(dates.isRangeAllowed({ from: "2026-09-09", to: "2026-09-11" }, { disabledDates: ["2026-09-10"] }), false);
  assert.equal(dates.isDateAllowed("2026-09-09", { min: "2026-09-10" }), false);
  assert.equal(dates.isDateAllowed("2026-09-09", { max: "2026-09-09" }), true);
});

test("presets use inclusive local calendar periods with month-end/leap handling", () => {
  assert.deepEqual(dates.getDateRangePreset("today", "2026-09-09"), { from: "2026-09-09", to: "2026-09-09" });
  assert.deepEqual(dates.getDateRangePreset("yesterday", "2026-01-01"), { from: "2025-12-31", to: "2025-12-31" });
  assert.deepEqual(dates.getDateRangePreset("last7Days", "2026-09-09"), { from: "2026-09-03", to: "2026-09-09" });
  assert.deepEqual(dates.getDateRangePreset("thisMonth", "2024-02-12"), { from: "2024-02-01", to: "2024-02-29" });
  assert.deepEqual(dates.getDateRangePreset("lastMonth", "2026-01-01"), { from: "2025-12-01", to: "2025-12-31" });
});

const options = [{ value: "a", label: "Operator", keywords: ["desk"] }, { value: "b", label: "Unavailable", disabled: true }, { value: "c", label: "Réview" }];
test("selection preserves stable values while search matches labels/keywords and disabled navigation skips", () => {
  assert.deepEqual(filterOptions(options, "review").map((x) => x.value), ["c"]);
  assert.deepEqual(filterOptions(options, " DESK ").map((x) => x.value), ["a"]);
  assert.deepEqual(filterOptions(options, "unknown"), []);
  assert.equal(selectedOption(options, "c").label, "Réview");
  assert.equal(nextEnabledOption(options, 0, 1), 2);
  assert.equal(nextEnabledOption(options, 2, 1), 0);
  assert.equal(nextEnabledOption(options, 0, -1), 2);
  assert.equal(nextEnabledOption([{ value: "x", label: "X", disabled: true }], 0, 1), -1);
  assert.equal(nextEnabledOption([], -1, 1), -1);
});

test("Field links label/help/error and propagates native control attributes deliberately", () => {
  const html = render(h(Field, { label: "Asset", htmlFor: "asset", description: "Help", error: "Required", required: true, disabled: true },
    (props) => h(Input, props)));
  for (const part of ['for="asset"', 'id="asset"', 'aria-describedby="asset-help asset-error"', 'aria-invalid="true"', 'disabled=""', 'required=""']) assert.ok(html.includes(part), part);
});

test("Select uses a custom accessible trigger with disabled/error state", () => {
  const html = render(h(Select, { options, value: "a", "aria-label": "Role", disabled: true, error: true, placeholder: "Choose" }));
  assert.match(html, /role="combobox"/);
  assert.match(html, /aria-label="Role"/);
  assert.match(html, /disabled=""/);
  assert.match(html, /aria-invalid="true"/);
  assert.match(html, /og-ds-form-trigger/);
});

test("Combobox serializes selected value separately from readable label; supports external async label", () => {
  const html = render(h(Combobox, { options, value: "a", name: "role", "aria-label": "Role", loading: true }));
  assert.match(html, /name="role"[^>]*value="a"/);
  assert.match(html, /value="Operator"/);
  assert.match(html, /role="combobox"/);
  assert.match(html, /aria-busy="true"/);
  assert.match(render(h(Combobox, { options: [], value: "stable-id", selectedLabel: "Remote selection" })), /value="Remote selection"/);
});

test("date/time triggers display local contracts and submit only explicit serialized values", () => {
  const date = render(h(DatePicker, { value: "2026-09-09", name: "date", today: "2026-09-09" }));
  assert.match(date, /09\/09\/2026/); assert.match(date, /value="2026-09-09"/); assert.doesNotMatch(date, /type="date"/);
  const time = render(h(TimePicker, { value: "14:35", name: "time" }));
  assert.match(time, /14:35/); assert.doesNotMatch(time, /type="time"/);
  const combined = render(h(DateTimePicker, { value: "2026-09-09T14:35:00+07:00", name: "instant" }));
  assert.match(combined, /value="2026-09-09T14:35:00\+07:00"/);
  const range = render(h(DateRangePicker, { value: { from: "2026-09-10", to: "2026-09-09" }, today: "2026-09-09" }));
  assert.match(range, /aria-invalid="true"/);
});

test("FormSection groups content without a heavy card; form CSS is scoped and token-only", () => {
  assert.match(render(h(FormSection, { title: "Details", columns: 2 }, "Content")), /<legend[^>]*>.*Details/);
  const css = readFileSync(resolve(root, "forms/forms.css"), "utf8");
  assert.doesNotMatch(css, /#[\da-f]{3,8}\b|rgba?\(|hsla?\(/i);
  const tokens = new Set([...readFileSync(resolve(root, "foundation/tokens.css"), "utf8").matchAll(/(--og-[\w-]+):/g)].map((m) => m[1]));
  for (const [, token] of css.matchAll(/var\((--og-[\w-]+)\)/g)) assert.ok(tokens.has(token), token);
  postcss.parse(css).walkRules((rule) => {
    let current = rule;
    while (current && !current.selector?.includes('[data-og-design-system="1"]')) current = current.parent;
    assert.ok(current, rule.selector);
  });
});
