import test from "node:test";
import assert from "node:assert/strict";

import {
  readFileSync,
} from "node:fs";

import {
  dirname,
  resolve,
} from "node:path";

import {
  fileURLToPath,
} from "node:url";

const current =
  dirname(
    fileURLToPath(
      import.meta.url,
    ),
  );

const root =
  resolve(
    current,
    "../../..",
  );

function read(path) {
  return readFileSync(
    resolve(
      root,
      path,
    ),
    "utf8",
  );
}

test("premium CSS is imported after platform shell CSS", () => {
  const globals =
    read(
      "app/globals.css",
    );

  const platform =
    globals.indexOf(
      'platform-shell/platform-shell.css',
    );

  const premium =
    globals.indexOf(
      'design-system/premium/premium.css',
    );

  assert.ok(
    platform >= 0,
  );

  assert.ok(
    premium > platform,
  );
});

test("premium theme provides separate light and dark sidebar palettes", () => {
  const tokens =
    read(
      "components/design-system/foundation/tokens.css",
    );

  assert.match(
    tokens,
    /--og-sidebar-bg:\s*#ffffff/,
  );

  assert.match(
    tokens,
    /--og-sidebar-bg:\s*#05131f/,
  );

  assert.match(
    tokens,
    /--og-premium-cyan/,
  );
});

test("premium shell exposes page context in topbar and retains application navigation model", () => {
  const shell =
    read(
      "features/platform-shell/platform-shell-view.tsx",
    );

  assert.match(
    shell,
    /og-premium-topbar-context/,
  );

  assert.match(
    shell,
    /PlatformSidebarNavigation/,
  );

  assert.match(
    shell,
    /PlatformUserControl/,
  );

  assert.match(
    shell,
    /Grid Operations Intelligence/,
  );
});

test("dashboard remains grounded in current auth context rather than fabricated operational KPI values", () => {
  const dashboard =
    read(
      "app/(platform)/dashboard/page.tsx",
    );

  assert.match(
    dashboard,
    /getCurrentUserContext/,
  );

  assert.match(
    dashboard,
    /activeModules/,
  );

  assert.match(
    dashboard,
    /assignments/,
  );

  assert.doesNotMatch(
    dashboard,
    /99\.82|98\.6|Active Incidents|27 Jan 2025|Sukamaju/,
  );
});

test("premium feedback system restyles accessible dialog alert and toast primitives", () => {
  const css =
    read(
      "components/design-system/premium/premium.css",
    );

  assert.match(
    css,
    /\.og-ds-dialog/,
  );

  assert.match(
    css,
    /\.og-ds-overlay-backdrop/,
  );

  assert.match(
    css,
    /\.og-ds-alert/,
  );

  assert.match(
    css,
    /\.og-ds-toast/,
  );
});

test("premium CSS stays token driven and does not introduce palette literals", () => {
  const css =
    read(
      "components/design-system/premium/premium.css",
    );

  assert.doesNotMatch(
    css,
    /#[\da-f]{3,8}\b/i,
  );

  assert.doesNotMatch(
    css,
    /rgba?\(/i,
  );
});

test("root route continues to delegate to authenticated dashboard flow", () => {
  const rootPage =
    read(
      "app/page.tsx",
    );

  assert.match(
    rootPage,
    /redirect\("\/dashboard"\)/,
  );

  assert.doesNotMatch(
    rootPage,
    /ChartTest|Recharts/,
  );
});
test("premium typography uses the Geist variable-font contract", () => {
  const layout =
    read(
      "app/layout.tsx",
    );

  const tokens =
    read(
      "components/design-system/foundation/tokens.css",
    );

  const css =
    read(
      "components/design-system/premium/premium.css",
    );

  assert.match(
    layout,
    /GeistSans/,
  );

  assert.match(
    layout,
    /GeistMono/,
  );

  assert.match(
    tokens,
    /--font-geist-sans/,
  );

  assert.match(
    tokens,
    /--font-geist-mono/,
  );

  assert.match(
    tokens,
    /--og-font-display/,
  );

  assert.match(
    css,
    /PREMIUM TYPOGRAPHY/,
  );
});
test("premium platform content header uses breadcrumb only because page identity lives in topbar", () => {
  const header =
    read(
      "features/platform-shell/platform-page-header.tsx",
    );

  assert.match(
    header,
    /Breadcrumb/,
  );

  assert.match(
    header,
    /og-premium-content-breadcrumb/,
  );

  assert.doesNotMatch(
    header,
    /import\s*\{[^}]*\bPageHeader\b[^}]*\}\s*from/,
  );

  assert.doesNotMatch(
    header,
    /<PageHeader\b/,
  );

  assert.doesNotMatch(
    header,
    /title=\{page\.title\}/,
  );
});