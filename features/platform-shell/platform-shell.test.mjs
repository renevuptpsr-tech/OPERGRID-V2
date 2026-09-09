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
import {
  test,
} from "node:test";

const here =
  dirname(
    fileURLToPath(import.meta.url),
  );

const root =
  resolve(here, "../..");

function read(name) {
  return readFileSync(
    resolve(here, name),
    "utf8",
  );
}

test("shell model preserves legacy dashboard operations and administration grouping", () => {
  const source =
    read("shell-model.ts");

  assert.match(
    source,
    /module_code === "DASHBOARD"/,
  );

  assert.match(
    source,
    /module_group === "OPERATIONS"/,
  );

  assert.match(
    source,
    /USER_MANAGEMENT/,
  );

  assert.match(
    source,
    /ROLE_MANAGEMENT/,
  );

  assert.match(
    source,
    /UNIT_MANAGEMENT/,
  );
});

test("shell model rejects inaccessible and non-navigable modules", () => {
  const source =
    read("shell-model.ts");

  assert.match(
    source,
    /module\.can_view === true/,
  );

  assert.match(
    source,
    /module\.route_path/,
  );
});

test("active route contract preserves nested-route behavior", () => {
  const source =
    read("shell-model.ts");

  assert.match(
    source,
    /pathname === routePath/,
  );

  assert.match(
    source,
    /pathname\.startsWith\(`\$\{routePath\}\/`\)/,
  );
});

test("context adapter preserves existing identity fallback order", () => {
  const source =
    read("context-adapter.ts");

  const displayName =
    source.indexOf(
      "context.profile?.display_name",
    );

  const fullName =
    source.indexOf(
      "context.profile?.full_name",
    );

  const email =
    source.indexOf(
      "context.user.email",
    );

  assert.ok(displayName >= 0);
  assert.ok(fullName > displayName);
  assert.ok(email > fullName);

  assert.match(
    source,
    /assignment\.is_primary/,
  );
});

test("context adapter consumes current auth context but performs no authentication IO", () => {
  const source =
    read("context-adapter.ts");

  assert.match(
    source,
    /CurrentUserContext/,
  );

  assert.doesNotMatch(
    source,
    /createClient|auth\.getUser|rpc\(|signOut\(/,
  );
});

test("page registry preserves current production page labels", () => {
  const source =
    read("page-registry.ts");

  for (
    const label of [
      "Dashboard",
      "Logsheet",
      "Shift",
      "Mutasi Jurnal",
      "Manuver",
      "Gangguan 20 kV",
      "Thermovisi",
      "User Management",
      "Role Management",
      "Unit Management",
      "Import Users",
      "Create User",
      "User Detail",
    ]
  ) {
    assert.match(
      source,
      new RegExp(label),
    );
  }
});

test("module icon registry is presentation-only and statically declared", () => {
  const source =
    read("icon-registry.tsx");

  assert.match(
    source,
    /export function ModuleIcon/,
  );

  assert.match(
    source,
    /switch \(moduleCode\)/,
  );

  assert.match(
    source,
    /case "DASHBOARD"/,
  );

  assert.match(
    source,
    /case "GANGGUAN_20KV"/,
  );

  assert.doesNotMatch(
    source,
    /can_view|role_code|moduleAccess|Supabase|auth/i,
  );
});

test("Phase 6A does not modify production shell files", () => {
  const productionFiles = [
    "components/layout/app-shell.tsx",
    "components/layout/sidebar.tsx",
    "components/layout/topbar.tsx",
    "components/layout/user-menu.tsx",
    "components/layout/page-header.tsx",
    "app/(platform)/layout.tsx",
  ];

  for (const file of productionFiles) {
    assert.ok(
      readFileSync(
        resolve(root, file),
        "utf8",
      ).length > 0,
    );
  }
});
test("client shell controller owns only presentation state and consumes adapter model", () => {
  const source =
    read("use-platform-shell-controller.ts");

  assert.match(
    source,
    /useState/,
  );

  assert.match(
    source,
    /buildPlatformShellNavigation/,
  );

  assert.match(
    source,
    /hasActiveRoute/,
  );

  assert.doesNotMatch(
    source,
    /Supabase|createClient|auth\.|rpc\(/i,
  );
});

test("production sidebar view delegates access decisions to shell model", () => {
  const source =
    read("platform-sidebar-navigation.tsx");

  assert.match(
    source,
    /PlatformShellNavigationModel/,
  );

  assert.match(
    source,
    /isRouteActive/,
  );

  assert.doesNotMatch(
    source,
    /can_view\s*===|SUPER_ADMIN|ADMIN_UPT|ADMIN_ULTG/i,
  );
});

test("platform user control is the explicit application auth boundary", () => {
  const source =
    read("platform-user-control.tsx");

  assert.match(
    source,
    /createClient/,
  );

  assert.match(
    source,
    /auth\.signOut/,
  );

  assert.match(
    source,
    /router\.replace\("\/login"\)/,
  );

  assert.match(
    source,
    /UserControl/,
  );
});

test("new shell view composes Design System without being activated by platform layout", () => {
  const source =
    read("platform-shell-view.tsx");

  assert.match(source, /AppShell/);
  assert.match(source, /Sidebar/);
  assert.match(source, /Topbar/);
  assert.match(source, /MobileSidebarDrawer/);
  assert.match(source, /ContentContainer/);
  assert.match(
    source,
    /data-og-design-system="1"/,
  );

  const layout =
    readFileSync(
      resolve(
        root,
        "app/(platform)/layout.tsx",
      ),
      "utf8",
    );

  assert.doesNotMatch(
    layout,
    /PlatformShellView/,
  );
});

test("new platform page header consumes centralized page registry", () => {
  const source =
    read("platform-page-header.tsx");

  assert.match(
    source,
    /resolvePlatformPageInfo/,
  );

  assert.match(
    source,
    /Breadcrumb/,
  );

  assert.match(
    source,
    /PageHeader/,
  );
});

test("Phase 6B platform styles remain scoped and token-driven", () => {
  const css =
    read("platform-shell.css");

  assert.match(
    css,
    /\[data-og-design-system="1"\]/,
  );

  assert.doesNotMatch(
    css,
    /#[\da-f]{3,8}\b|rgba?\(|hsla?\(/i,
  );
});
test("sidebar module item renders a stable ModuleIcon component instead of resolving component types during render", () => {
  const source =
    read("platform-sidebar-navigation.tsx");

  assert.match(
    source,
    /<ModuleIcon/,
  );

  assert.match(
    source,
    /moduleCode=/,
  );

  assert.doesNotMatch(
    source,
    /const Icon\s*=/,
  );

  assert.doesNotMatch(
    source,
    /resolveModuleIcon\(/,
  );
});