// Run with node --test components/design-system/primitives/primitives.test.mjs.
// Uses installed TypeScript for a test-only TSX loader; no application build changes.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import { createElement as h } from "react";
import { renderToStaticMarkup as render } from "react-dom/server";
import ts from "typescript";
import postcss from "postcss";

const require = createRequire(import.meta.url);
const systemRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
for (const extension of [".ts", ".tsx"]) {
  const previous = require.extensions[extension];
  require.extensions[extension] = (module, filename) => {
    if (!filename.startsWith(systemRoot + sep)) {
      if (previous) return previous(module, filename);
      throw new Error(`Test loader only supports design-system files: ${filename}`);
    }
    const { outputText } = ts.transpileModule(readFileSync(filename, "utf8"), {
      compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, esModuleInterop: true },
    });
    module._compile(outputText, filename);
  };
}

const { Button, IconButton, Input, Textarea, Label, Checkbox, Radio, RadioGroup, Switch, Badge, Separator } = require("./index.ts");
const { Tooltip } = require("../overlays/tooltip.tsx");

test("buttons default to non-submit; loading disables interaction and exposes pending state", () => {
  assert.match(render(h(Button, null, "Save")), /type="button"/);
  assert.match(render(h(Button, { type: "submit" }, "Save")), /type="submit"/);
  const pending = render(h(Button, { loading: true, loadingText: "Saving", disabled: false, fullWidth: true }, "Save record"));
  assert.match(pending, /disabled=""/);
  assert.match(pending, /aria-busy="true"/);
  assert.match(pending, /aria-hidden="true">Save record/);
  assert.match(pending, /Saving/);
  assert.match(pending, /og-ds-full-width/);
});

test("icon button retains its accessible name while loading and forwards description/ref-compatible native props", () => {
  const markup = render(h(IconButton, { "aria-label": "Refresh", "aria-describedby": "help", loading: true, name: "refresh" }, "↻"));
  assert.match(markup, /aria-label="Refresh"/);
  assert.match(markup, /aria-describedby="help"/);
  assert.match(markup, /name="refresh"/);
  assert.match(markup, /disabled=""/);
});

test("input preserves native validation, label association, descriptions, readOnly and slots", () => {
  const markup = render(h(Input, { id: "voltage", name: "voltage", type: "number", min: 0, required: true,
    error: true, "aria-describedby": "voltage-error", readOnly: true, defaultValue: 20,
    prefix: "kV", rightSlot: h("span", null, "Nominal"), className: "custom-input" }));
  for (const attribute of ['id="voltage"', 'name="voltage"', 'type="number"', 'min="0"',
    'required=""', 'aria-invalid="true"', 'aria-describedby="voltage-error"', 'readOnly=""', 'value="20"']) {
    assert.ok(markup.includes(attribute), attribute);
  }
  assert.match(markup, /custom-input/);
  assert.match(markup, /Nominal/);
  assert.match(render(h(Input, { "aria-invalid": "grammar" })), /aria-invalid="grammar"/);
  assert.match(render(h(Input, { disabled: true })), /disabled=""/);
});

test("textarea forwards validation and rows and has configurable resize", () => {
  const markup = render(h(Textarea, { error: true, rows: 5, resize: "none", disabled: true }));
  assert.match(markup, /aria-invalid="true"/);
  assert.match(markup, /rows="5"/);
  assert.match(markup, /resize:none/);
  assert.match(markup, /disabled=""/);
});

test("labels associate with controls without pretending the visual required marker validates them", () => {
  const markup = render(h(Label, { htmlFor: "asset", required: true, optional: true }, "Asset"));
  assert.match(markup, /for="asset"/);
  assert.match(markup, /aria-hidden="true"/);
  assert.doesNotMatch(markup, /optional/);
});

test("checkbox and switch retain native form values, checked state and disabled semantics", () => {
  for (const Component of [Checkbox, Switch]) {
    const markup = render(h(Component, { id: "enabled", name: "enabled", value: "yes", defaultChecked: true, disabled: true }));
    assert.match(markup, /type="checkbox"/);
    assert.match(markup, /checked=""/);
    assert.match(markup, /disabled=""/);
    assert.match(markup, /name="enabled"/);
    assert.match(markup, /value="yes"/);
  }
  assert.match(render(h(Switch, { "aria-label": "Enabled" })), /role="switch"/);
});

test("radio group uses a named fieldset, shared native name and a single controlled selection", () => {
  const markup = render(h(RadioGroup, { legend: "Mode", name: "mode", value: "manual", disabled: true, required: true },
    h(Radio, { value: "auto", "aria-label": "Auto" }), h(Radio, { value: "manual", "aria-label": "Manual" })));
  assert.match(markup, /<fieldset disabled=""/);
  assert.match(markup, /<legend[^>]*>Mode<\/legend>/);
  assert.equal((markup.match(/name="mode"/g) ?? []).length, 2);
  assert.equal((markup.match(/checked=""/g) ?? []).length, 1);
  assert.equal((markup.match(/required=""/g) ?? []).length, 2);
  assert.match(markup, /checked="" value="manual"/);
});

test("badges retain status text; separators distinguish decorative and semantic orientation", () => {
  assert.match(render(h(Badge, { variant: "warning", dot: true }, "Pending review")), /Pending review/);
  const vertical = render(h(Separator, { orientation: "vertical", decorative: false }));
  assert.match(vertical, /role="separator"/);
  assert.match(vertical, /aria-orientation="vertical"/);
  assert.match(render(h(Separator)), /aria-hidden="true"/);
});

test("tooltip composes existing descriptions and starts hidden without replacing the trigger name", () => {
  const markup = render(h(Tooltip, { content: "Refresh operational status", describedBy: "existing-help" },
    (props) => h(IconButton, { ...props, "aria-label": "Refresh" }, "↻")));
  const id = markup.match(/id="([^"]+)" role="tooltip"/)?.[1];
  assert.ok(id);
  assert.ok(markup.includes(`aria-describedby="existing-help ${id}"`));
  assert.match(markup, /aria-label="Refresh"/);
  assert.match(markup, /role="tooltip" hidden=""/);
});

test("new styles reference foundation tokens, use no palette literals and do not opt in existing pages", () => {
  const foundation = readFileSync(resolve(systemRoot, "foundation/tokens.css"), "utf8");
  const tokens = new Set([...foundation.matchAll(/(--og-[\w-]+):/g)].map((m) => m[1]));
  for (const file of ["primitives/primitives.css", "overlays/tooltip.css"]) {
    const css = readFileSync(resolve(systemRoot, file), "utf8");
    assert.doesNotMatch(css, /#[\da-f]{3,8}\b|rgba?\(|hsla?\(/i);
    for (const [, token] of css.matchAll(/var\((--og-[\w-]+)\)/g)) assert.ok(tokens.has(token), token);
    const ast = postcss.parse(css);
    ast.walkRules((rule) => {
      if (rule.parent.type === "atrule" && rule.parent.name === "keyframes") return;
      let current = rule;
      while (current && !current.selector?.includes('[data-og-design-system="1"]')) current = current.parent;
      assert.ok(current, `Unscoped selector: ${rule.selector}`);
    });
  }
  for (const Component of [Button, Input, Textarea, Checkbox, Switch, Badge, Separator]) {
    assert.doesNotMatch(render(h(Component)), /data-og-design-system/);
  }
});

test("enabled text and control boundaries meet contrast targets in both themes", () => {
  const css = readFileSync(resolve(systemRoot, "foundation/tokens.css"), "utf8");
  const palettes = [...css.split("/* Utilities")[0].matchAll(/\{([^}]+)\}/g)].map((m) =>
    Object.fromEntries([...m[1].matchAll(/--og-([\w-]+): (#[\da-f]{6});/g)].map((x) => [x[1], x[2]])));
  function luminance(hex) {
    const c = hex.slice(1).match(/../g).map((x) => parseInt(x, 16) / 255)
      .map((x) => x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4);
    return c[0] * 0.2126 + c[1] * 0.7152 + c[2] * 0.0722;
  }
  function contrast(a, b) { const x = luminance(a), y = luminance(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }
  for (const palette of palettes) {
    const pairs = [["text-secondary", "surface-subtle"], ["text-muted", "surface"], ["text", "surface-overlay"],
      ["text", "brand-subtle"], ["danger", "surface"]];
    for (const state of ["brand", "brand-hover", "brand-active"]) pairs.push(["brand-contrast", state]);
    for (const status of ["success", "warning", "danger", "info"]) pairs.push([status, `${status}-subtle`]);
    for (const [fg, bg] of pairs) assert.ok(contrast(palette[fg], palette[bg]) >= 4.5, `${fg}/${bg}`);
    for (const bg of ["surface", "surface-subtle", "canvas"]) {
      for (const fg of ["focus-ring", "border-strong"]) assert.ok(contrast(palette[fg], palette[bg]) >= 3, `${fg}/${bg}`);
    }
  }
});
