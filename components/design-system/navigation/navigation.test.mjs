import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import postcss from "postcss";

const here = dirname(fileURLToPath(import.meta.url));
const designSystemRoot = resolve(here, "..");

function read(name) {
  return readFileSync(
    resolve(here, name),
    "utf8",
  );
}

test("navigation model remains domain-agnostic", () => {
  const source = read("types.ts");

  assert.match(source, /NavigationItem/);
  assert.match(source, /NavigationGroup/);
  assert.match(source, /BreadcrumbItem/);

  assert.doesNotMatch(
    source,
    /UPT|ULTG|Gardu|Penyulang|Gangguan|Thermovisi|Supabase/i,
  );
});

test("NavItem exposes active disabled compact and badge states", () => {
  const source = read("nav-item.tsx");

  assert.match(source, /aria-current/);
  assert.match(source, /aria-disabled/);
  assert.match(source, /data-active/);
  assert.match(source, /data-disabled/);
  assert.match(source, /data-compact/);
  assert.match(source, /og-ds-nav-badge/);
});

test("disabled navigation does not expose an active href", () => {
  const source = read("nav-item.tsx");

  assert.match(
    source,
    /if \(href && !disabled\)/,
  );

  assert.match(
    source,
    /disabled=\{disabled\}/,
  );
});

test("Breadcrumb identifies the final item as the current page", () => {
  const source = read("breadcrumb.tsx");

  assert.match(source, /aria-label=\{ariaLabel\}/);
  assert.match(source, /aria-current/);
  assert.match(source, /current/);
  assert.match(source, /<ol/);
});

test("PageHeader uses one h1 and supports actions metadata and breadcrumbs", () => {
  const source = read("page-header.tsx");

  assert.equal(
    (source.match(/<h1/g) ?? []).length,
    1,
  );

  assert.match(source, /breadcrumbs/);
  assert.match(source, /metadata/);
  assert.match(source, /actions/);
  assert.match(source, /og-ds-page-header-title/);
});

test("navigation CSS is opt-in, token-only and contains no hardcoded palette", () => {
  const css = read("navigation.css");

  assert.doesNotMatch(
    css,
    /#[\da-f]{3,8}\b|rgba?\(|hsla?\(/i,
  );

  const foundation = readFileSync(
    resolve(
      designSystemRoot,
      "foundation/tokens.css",
    ),
    "utf8",
  );

  const tokens = new Set(
    [...foundation.matchAll(/(--og-[\w-]+):/g)]
      .map((match) => match[1]),
  );

  for (
    const [, token]
    of css.matchAll(/var\((--og-[\w-]+)\)/g)
  ) {
    assert.ok(
      tokens.has(token),
      `Unknown design token: ${token}`,
    );
  }

  postcss.parse(css).walkRules((rule) => {
    if (
      rule.parent?.type === "atrule" &&
      rule.parent.name === "keyframes"
    ) {
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
      `Unscoped navigation rule: ${rule.selector}`,
    );
  });
});

test("Phase 5A does not modify or depend on legacy application layout components", () => {
  for (
    const file
    of [
      "nav-item.tsx",
      "nav-group.tsx",
      "sidebar-section.tsx",
      "breadcrumb.tsx",
      "page-header.tsx",
    ]
  ) {
    const source = read(file);

    assert.doesNotMatch(
      source,
      /components\/layout|\.\.\/\.\.\/layout/,
    );
  }
});
test("Sidebar exposes collapsed state without owning application persistence", () => {
  const source = read("sidebar.tsx");

  assert.match(source, /collapsed/);
  assert.match(source, /onCollapsedChange/);
  assert.match(source, /aria-label="Navigasi utama"/);

  assert.doesNotMatch(
    source,
    /localStorage|sessionStorage|Supabase|cookie/i,
  );
});

test("collapsed sidebar navigation retains accessible label and tooltip", () => {
  const source = read("sidebar-nav-item.tsx");

  assert.match(source, /aria-label=\{label\}/);
  assert.match(source, /Tooltip/);
  assert.match(source, /side="right"/);
  assert.match(source, /aria-current/);
});

test("Sidebar navigation remains free of OPERGRID business access decisions", () => {
  const combined = [
    read("sidebar.tsx"),
    read("sidebar-nav-item.tsx"),
    read("sidebar-group.tsx"),
  ].join("\n");

  assert.doesNotMatch(
    combined,
    /moduleAccess|SUPER_ADMIN|ADMIN_UPT|ADMIN_ULTG|INSPECTOR|VERIFICATOR|Supabase/i,
  );
});

test("sidebar visual rules use tokens and remain inside DS opt-in boundary", () => {
  const css = read("navigation.css");

  assert.match(css, /\.og-ds-sidebar/);
  assert.match(css, /\.og-ds-sidebar-nav-item/);

  assert.doesNotMatch(
    css,
    /#[\da-f]{3,8}\b|rgba?\(|hsla?\(/i,
  );
});
test("Topbar remains a composition primitive without business or auth logic", () => {
  const source = read("topbar.tsx");

  assert.match(source, /navigationControl/);
  assert.match(source, /context/);
  assert.match(source, /actions/);
  assert.match(source, /userControl/);

  assert.doesNotMatch(
    source,
    /Supabase|auth\.|moduleAccess|role_code|SUPER_ADMIN/i,
  );
});

test("MobileNavTrigger exposes expanded state and stable navigation relationship", () => {
  const source = read("mobile-nav-trigger.tsx");

  assert.match(source, /aria-expanded/);
  assert.match(
    source,
    /aria-controls="og-ds-mobile-navigation"/,
  );
  assert.match(source, /onOpenChange/);
});

test("UserControl is presentation-only and delegates sign out behavior to caller", () => {
  const source = read("user-control.tsx");

  assert.match(source, /onSignOut/);
  assert.match(source, /DropdownMenu/);
  assert.match(source, /destructive/);

  assert.doesNotMatch(
    source,
    /signOut\(|supabase|router\.push|window\.location/i,
  );
});

test("Topbar action retains accessible label and tooltip behavior", () => {
  const source = read("topbar-action.tsx");

  assert.match(source, /aria-label=\{label\}/);
  assert.match(source, /Tooltip/);
  assert.match(source, /aria-describedby/);
});

test("topbar and user-control styles remain token-driven", () => {
  const css = read("navigation.css");

  assert.match(css, /\.og-ds-topbar/);
  assert.match(css, /\.og-ds-user-control-trigger/);

  assert.doesNotMatch(
    css,
    /#[\da-f]{3,8}\b|rgba?\(|hsla?\(/i,
  );
});
test("AppShell composes sidebar topbar content and optional mobile navigation only", () => {
  const source = read("app-shell.tsx");

  assert.match(source, /sidebar/);
  assert.match(source, /topbar/);
  assert.match(source, /mobileNavigation/);
  assert.match(source, /sidebarCollapsed/);

  assert.doesNotMatch(
    source,
    /Supabase|moduleAccess|usePathname|useRouter|localStorage/i,
  );
});

test("MobileSidebarDrawer uses accessible dialog semantics and stable mobile navigation id", () => {
  const source = read("mobile-sidebar-drawer.tsx");

  assert.match(
    source,
    /@radix-ui\/react-dialog/,
  );

  assert.match(
    source,
    /id="og-ds-mobile-navigation"/,
  );

  assert.match(
    source,
    /DialogPrimitive\.Title/,
  );

  assert.match(
    source,
    /DialogPrimitive\.Close/,
  );

  assert.match(
    source,
    /useOverlayPortal/,
  );
});

test("ContentContainer exposes standard wide and full presentation sizes", () => {
  const source = read("content-container.tsx");

  assert.match(source, /"standard"/);
  assert.match(source, /"wide"/);
  assert.match(source, /"full"/);
  assert.match(source, /data-size=\{size\}/);
});

test("PageContent remains a simple composition primitive", () => {
  const source = read("page-content.tsx");

  assert.match(source, /header/);
  assert.match(source, /children/);

  assert.doesNotMatch(
    source,
    /fetch\(|Supabase|useEffect|useState/,
  );
});

test("application shell CSS keeps desktop sidebar and mobile drawer responsive", () => {
  const css = read("navigation.css");

  assert.match(css, /\.og-ds-app-shell/);
  assert.match(css, /\.og-ds-mobile-drawer/);
  assert.match(css, /max-width: 767px/);

  assert.doesNotMatch(
    css,
    /#[\da-f]{3,8}\b|rgba?\(|hsla?\(/i,
  );
});