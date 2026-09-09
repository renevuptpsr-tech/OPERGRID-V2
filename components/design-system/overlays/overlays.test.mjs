import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import postcss from "postcss";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");

function read(name) {
  return readFileSync(resolve(here, name), "utf8");
}

test("Dialog uses Radix accessible title and description primitives", () => {
  const source = read("dialog.tsx");

  assert.match(source, /DialogPrimitive\.Title/);
  assert.match(source, /DialogPrimitive\.Description/);
  assert.match(source, /DialogPrimitive\.Portal/);
  assert.match(source, /DialogPrimitive\.Overlay/);
  assert.match(source, /DialogPrimitive\.Close/);
});

test("AlertDialog uses destructive alert-dialog semantics and safe cancel action", () => {
  const source = read("alert-dialog.tsx");

  assert.match(source, /@radix-ui\/react-alert-dialog/);
  assert.match(source, /AlertDialogPrimitive\.Title/);
  assert.match(source, /AlertDialogPrimitive\.Description/);
  assert.match(source, /AlertDialogPrimitive\.Cancel/);
  assert.match(source, /autoFocus/);
  assert.match(source, /variant="danger"/);
});

test("ConfirmDialog exposes neutral warning and danger semantics", () => {
  const source = read("confirm-dialog.tsx");

  assert.match(
    source,
    /"neutral"\s*\|\s*"warning"\s*\|\s*"danger"/,
  );

  assert.match(source, /confirmButtonVariant/);
  assert.match(source, /closeOnOutsideInteraction/);
});

test("overlay CSS is scoped and contains no hardcoded palette hex values", () => {
  const css = read("overlays.css");

  assert.doesNotMatch(
    css,
    /#[\da-f]{3,8}\b|rgba?\(|hsla?\(/i,
  );

  const tokens = new Set([
    ...readFileSync(
      resolve(root, "foundation/tokens.css"),
      "utf8",
    ).matchAll(/(--og-[\w-]+):/g),
  ].map((match) => match[1]));

  for (const [, token] of css.matchAll(/var\((--og-[\w-]+)\)/g)) {
    assert.ok(tokens.has(token), token);
  }

  postcss.parse(css).walkRules((rule) => {
    if (rule.parent?.type === "atrule" &&
        rule.parent.name === "keyframes") {
      return;
    }

    if (rule.selector?.startsWith("from") ||
        rule.selector?.startsWith("to")) {
      return;
    }

    let current = rule;

    while (
      current &&
      !current.selector?.includes(
        '[data-og-design-system="1"]',
      )
    ) {
      current = current.parent;
    }

    assert.ok(
      current,
      `Unscoped overlay rule: ${rule.selector}`,
    );
  });
});

test("overlay exports retain Phase 2 Tooltip and expose shared portal", () => {
  const source = read("index.ts");

  assert.match(source, /from "\.\/tooltip"/);
  assert.match(source, /from "\.\/use-overlay-portal"/);
  assert.match(source, /ConfirmDialog/);
  assert.match(source, /AlertDialog/);
});
test("Tooltip uses Radix portal and collision-aware positioning", () => {
  const source = read("tooltip.tsx");

  assert.match(source, /@radix-ui\/react-tooltip/);
  assert.match(source, /TooltipPrimitive\.Portal/);
  assert.match(source, /collisionPadding/);
  assert.match(source, /sideOffset/);
  assert.match(source, /useOverlayPortal/);
});

test("DropdownMenu uses Radix keyboard and portal primitives", () => {
  const source = read("dropdown-menu.tsx");

  assert.match(source, /@radix-ui\/react-dropdown-menu/);
  assert.match(source, /DropdownPrimitive\.Portal/);
  assert.match(source, /DropdownPrimitive\.Item/);
  assert.match(source, /DropdownPrimitive\.CheckboxItem/);
  assert.match(source, /DropdownPrimitive\.Separator/);
  assert.match(source, /data-destructive/);
});

test("dropdown styles remain scoped and token-driven", () => {
  const css = read("overlays.css");

  assert.match(css, /\.og-ds-dropdown-content/);

  assert.doesNotMatch(
    css,
    /#[\da-f]{3,8}\b|rgba?\(|hsla?\(/i,
  );
});
test("Inline Alert provides semantic variants and non-modal feedback", () => {
  const source = read("alert.tsx");

  assert.match(source, /"info"/);
  assert.match(source, /"success"/);
  assert.match(source, /"warning"/);
  assert.match(source, /"danger"/);
  assert.match(source, /role=/);
  assert.match(source, /onDismiss/);
});

test("Toast exposes provider, typed imperative API and Radix live feedback primitives", () => {
  const source = read("toast.tsx");

  assert.match(source, /@radix-ui\/react-toast/);
  assert.match(source, /ToastProvider/);
  assert.match(source, /useToast/);
  assert.match(source, /ToastPrimitive\.Viewport/);
  assert.match(source, /ToastPrimitive\.Title/);
  assert.match(source, /ToastPrimitive\.Description/);
  assert.match(source, /ToastPrimitive\.Close/);
  assert.match(source, /maxVisible/);
  assert.match(source, /dismissAll/);
});

test("feedback styles remain scoped, semantic and token-driven", () => {
  const css = read("overlays.css");

  assert.match(css, /\.og-ds-alert/);
  assert.match(css, /\.og-ds-toast/);
  assert.match(css, /\.og-ds-toast-viewport/);

  assert.doesNotMatch(
    css,
    /#[\da-f]{3,8}\b|rgba?\(|hsla?\(/i,
  );
});

test("overlay barrel exports Toast and Alert without changing application layout", () => {
  const source = read("index.ts");

  assert.match(source, /ToastProvider/);
  assert.match(source, /useToast/);
  assert.match(source, /AlertVariant/);

  const globalLayout = readFileSync(
    resolve(root, "../../app/layout.tsx"),
    "utf8",
  );

  assert.doesNotMatch(
    globalLayout,
    /ToastProvider/,
  );
});