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
test("premium user directory preserves administration business routes", () => {
  const source =
    read(
      "components/admin/users/user-directory.tsx",
    );

  assert.match(
    source,
    /\/api\/admin\/users\/template/,
  );

  assert.match(
    source,
    /\/api\/admin\/users\/export/,
  );

  assert.match(
    source,
    /\/admin\/users\/import/,
  );

  assert.match(
    source,
    /\/admin\/users\/new/,
  );

  assert.match(
    source,
    /existing_auth_user_id/,
  );

  assert.match(
    source,
    /\?tab=access/,
  );
});

test("premium user directory retains all directory states and filters", () => {
  const source =
    read(
      "components/admin/users/user-directory.tsx",
    );

  for (
    const state of [
      "ASSIGNED",
      "PENDING_PROVISIONING",
      "UNASSIGNED",
      "INACTIVE",
    ]
  ) {
    assert.match(
      source,
      new RegExp(state),
    );
  }

  assert.match(
    source,
    /normalizedSearch/,
  );

  assert.match(
    source,
    /pageSize/,
  );

  assert.match(
    source,
    /paginatedUsers/,
  );
});

test("premium user directory uses the Stage 2A administration visual system", () => {
  const source =
    read(
      "components/admin/users/user-directory.tsx",
    );

  const css =
    read(
      "components/design-system/premium/premium.css",
    );

  assert.match(
    source,
    /og-admin-directory/,
  );

  assert.match(
    source,
    /og-admin-directory-table/,
  );

  assert.match(
    source,
    /og-admin-directory-search/,
  );

  assert.match(
    css,
    /PREMIUM REBUILD 2\.0 — STAGE 2A/,
  );

  assert.match(
    css,
    /\.og-admin-directory-panel/,
  );

  assert.match(
    css,
    /\.og-admin-row-action/,
  );
});

test("premium user directory removes micro seven and eight pixel primary content", () => {
  const source =
    read(
      "components/admin/users/user-directory.tsx",
    );

  assert.doesNotMatch(
    source,
    /text-\[(?:7|8|9)px\]/,
  );
});
test("premium rebuild roadmap keeps User Detail as Stage 2B with anti-spam mutation loading", () => {
  const readme =
    read(
      "components/design-system/premium/README.md",
    );

  assert.match(
    readme,
    /Stage 2B — User Detail/,
  );

  for (
    const requirement of [
      "compact identity hero",
      "Profile tab",
      "Access & Role tab",
      "Account Status tab",
      "sticky action area",
      "premium confirm",
      "loading state for every save",
      "disabled action controls",
    ]
  ) {
    assert.match(
      readme,
      new RegExp(
        requirement,
        "i",
      ),
    );
  }
});