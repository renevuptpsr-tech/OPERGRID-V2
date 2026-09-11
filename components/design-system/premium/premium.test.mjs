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
test("premium user directory preserves administration routes and global detail navigation", () => {
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

  /*
   * Stage 2C contract:
   * User Detail is globally readable for authenticated users.
   * We no longer force UNASSIGNED users directly into ?tab=access.
   */
  assert.match(
    source,
    /\/admin\/users\/\$\{user\.user_id\}/,
  );

  assert.doesNotMatch(
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
test("Stage 2B User Detail exposes the premium identity workspace and three required tabs", () => {
  const page =
    read(
      "app/(platform)/admin/users/[user_id]/page.tsx",
    );

  const tabs =
    read(
      "components/admin/users/user-detail-tabs.tsx",
    );

  assert.match(
    page,
    /og-user-detail-hero/,
  );

  assert.match(
    page,
    /og-user-detail-workspace/,
  );

  assert.match(
    tabs,
    /Profile/,
  );

  assert.match(
    tabs,
    /Access & Role/,
  );

  assert.match(
    tabs,
    /Account Status/,
  );
});

test("Stage 2B fixes role selection contract to use role_code as the form value", () => {
  const form =
    read(
      "components/admin/users/user-assignment-form.tsx",
    );

  assert.match(
    form,
    /name="role_code"/,
  );

  assert.match(
    form,
    /value=\{\s*role\.role_code\s*\}/,
  );

  assert.doesNotMatch(
    form,
    /value=\{\s*role\.role_id\s*\}/,
  );
});

test("Stage 2B assignment mutations preserve pending-aware anti-spam behavior", () => {
  const form =
    read(
      "components/admin/users/user-assignment-form.tsx",
    );

  const list =
    read(
      "components/admin/users/user-assignment-list.tsx",
    );

  const confirmed =
    read(
      "components/ui/confirmed-server-action.tsx",
    );

  assert.match(
    form,
    /SubmitButton/,
  );

  assert.match(
    form,
    /Adding assignment/,
  );

  assert.match(
    list,
    /ConfirmedServerAction/,
  );

  assert.match(
    list,
    /Deactivate Role Assignment/,
  );

  assert.match(
    confirmed,
    /useTransition/,
  );

  assert.match(
    confirmed,
    /loading=\{\s*pending\s*\}/,
  );
});

test("Stage 2B assignment modal uses Design System Dialog instead of a manual fixed backdrop", () => {
  const modal =
    read(
      "components/admin/users/user-assignment-modal.tsx",
    );

  assert.match(
    modal,
    /components\/design-system\/overlays/,
  );

  assert.match(
    modal,
    /<Dialog/,
  );

  assert.doesNotMatch(
    modal,
    /bg-\[#/,
  );
});

test("Stage 2B result modal uses Design System Dialog and contains no hardcoded palette", () => {
  const modal =
    read(
      "components/ui/action-result-modal.tsx",
    );

  assert.match(
    modal,
    /<Dialog/,
  );

  assert.doesNotMatch(
    modal,
    /#[\da-f]{3,8}\b/i,
  );

  assert.doesNotMatch(
    modal,
    /rgba?\(/i,
  );
});

test("Stage 2B profile form uses compact premium form controls and sticky action system", () => {
  const form =
    read(
      "components/admin/users/user-profile-form.tsx",
    );

  assert.match(
    form,
    /og-user-form-layout/,
  );

  assert.match(
    form,
    /og-premium-form-control/,
  );

  assert.match(
    form,
    /StickyActionBar/,
  );

  assert.match(
    form,
    /Saving profile/,
  );
});

test("Stage 2B premium CSS is token-driven and defines user detail workspace", () => {
  const css =
    read(
      "components/design-system/premium/premium.css",
    );

  assert.match(
    css,
    /PREMIUM REBUILD 2\.0 — STAGE 2B/,
  );

  assert.match(
    css,
    /\.og-user-detail-hero/,
  );

  assert.match(
    css,
    /\.og-user-detail-tab/,
  );

  assert.match(
    css,
    /\.og-premium-sticky-action/,
  );
});
test("Stage 2B.1A Account Status uses balanced account-control and security columns", () => {
  const status =
    read(
      "components/admin/users/user-status-form.tsx",
    );

  const css =
    read(
      "components/design-system/premium/premium.css",
    );

  assert.match(
    status,
    /og-account-control-grid/,
  );

  assert.match(
    status,
    /og-account-control-panel/,
  );

  assert.match(
    status,
    /og-account-security-panel/,
  );

  assert.match(
    status,
    /og-account-status-inline-form/,
  );

  assert.match(
    css,
    /STAGE 2B\.1A/,
  );

  assert.match(
    css,
    /grid-template-columns:\s*minmax\(0,\s*1\.5fr\)/,
  );
});

test("Stage 2B.1A and 2B.1B preserve pending-aware status and password recovery mutations", () => {
  const status =
    read(
      "components/admin/users/user-status-form.tsx",
    );

  const confirmed =
    read(
      "components/ui/confirmed-server-action.tsx",
    );

  assert.match(
    status,
    /ConfirmedServerAction/,
  );

  assert.match(
    status,
    /setUserStatusAction/,
  );

  assert.match(
    status,
    /sendPasswordResetAction/,
  );

  assert.match(
    confirmed,
    /useTransition/,
  );

  assert.match(
    confirmed,
    /Processing\.\.\./,
  );

  assert.match(
    confirmed,
    /loading=\{\s*pending\s*\}/,
  );

  assert.match(
    confirmed,
    /disabled=\{\s*disabled \|\|\s*pending\s*\}/,
  );
});
test("Stage 2B.1B sensitive actions require Design System confirmation", () => {
  const confirmed =
    read(
      "components/ui/confirmed-server-action.tsx",
    );

  const status =
    read(
      "components/admin/users/user-status-form.tsx",
    );

  const assignments =
    read(
      "components/admin/users/user-assignment-list.tsx",
    );

  assert.match(
    confirmed,
    /AlertDialog/,
  );

  assert.match(
    status,
    /Confirm Account Status Change/,
  );

  assert.match(
    status,
    /Send Password Reset Link\?/,
  );

  assert.match(
    assignments,
    /Deactivate Role Assignment\?/,
  );
});

test("Stage 2B.1B confirmed action uses transition pending state for anti-spam", () => {
  const confirmed =
    read(
      "components/ui/confirmed-server-action.tsx",
    );

  assert.match(
    confirmed,
    /useTransition/,
  );

  assert.match(
    confirmed,
    /loading=\{\s*pending\s*\}/,
  );

  assert.match(
    confirmed,
    /disabled=\{\s*disabled \|\|\s*pending\s*\}/,
  );
});

test("Stage 2B.1B Account Status does not submit unchanged status", () => {
  const status =
    read(
      "components/admin/users/user-status-form.tsx",
    );

  assert.match(
    status,
    /statusChanged/,
  );

  /*
   * Stage 2C.4 extends the original Stage 2B.1B protection:
   *
   * - unauthorized viewer cannot mutate status
   * - unchanged status still cannot be submitted
   */
  assert.match(
    status,
    /disabled=\{\s*!canChangeStatus\s*\|\|\s*!statusChanged\s*\}/,
  );
});

test("Stage 2B.1B sensitive confirmation CSS remains token-driven", () => {
  const css =
    read(
      "components/design-system/premium/premium.css",
    );

  assert.match(
    css,
    /STAGE 2B\.1B/,
  );

  assert.match(
    css,
    /\.og-sensitive-action-summary/,
  );

  assert.match(
    css,
    /\.og-sensitive-action-note/,
  );
});
test("Stage 2C.2 User Directory is authenticated-global and scope-driven", () => {
  const service =
    read(
      "services/admin-user-directory-service.ts",
    );

  assert.match(
    service,
    /assertAuthenticatedDirectoryViewer/,
  );

  assert.doesNotMatch(
    service,
    /Hanya Super Administrator yang dapat melihat Authentication Directory/,
  );

  assert.match(
    service,
    /roles:/,
  );

  assert.match(
    service,
    /assigned_scopes:/,
  );

  assert.match(
    service,
    /effective_scope_ids:/,
  );

  assert.match(
    service,
    /effective_upt_scope_ids:/,
  );

  assert.match(
    service,
    /effective_ultg_scope_ids:/,
  );

  assert.match(
    service,
    /effective_gi_scope_ids:/,
  );
});

test("Stage 2C.2 GI hierarchy uses bc_flc for operational ULTG parent", () => {
  const service =
    read(
      "services/admin-user-directory-service.ts",
    );

  assert.match(
    service,
    /GI raw sup_functloc_id points to UPT/,
  );

  assert.match(
    service,
    /row\.bc_flc/,
  );

  assert.match(
    service,
    /include_children/,
  );

  assert.match(
    service,
    /child_count/,
  );
});
test("Stage 2C.3 User Directory renders Scope and distinct Role badges", () => {
  const directory =
    read(
      "components/admin/users/user-directory.tsx",
    );

  assert.match(
    directory,
    /Unit Scope/,
  );

  assert.match(
    directory,
    /assigned_scopes/,
  );

  assert.match(
    directory,
    /user\.roles/,
  );

  assert.match(
    directory,
    /child_count/,
  );

  assert.doesNotMatch(
    directory,
    />Organization</,
  );
});

test("Stage 2C.3 User Directory uses a hierarchical Filter Dialog", () => {
  const modal =
    read(
      "components/admin/users/user-directory-filter-modal.tsx",
    );

  assert.match(
    modal,
    /Dialog/,
  );

  assert.match(
    modal,
    /UPT/,
  );

  assert.match(
    modal,
    /ULTG/,
  );

  assert.match(
    modal,
    /GI/,
  );

  assert.match(
    modal,
    /upt_functloc_id/,
  );

  assert.match(
    modal,
    /ultg_functloc_id/,
  );
});

test("Stage 2C.4D assigned scope drives directory filtering", () => {
  const directory =
    read(
      "components/admin/users/user-directory.tsx",
    );

  assert.match(
    directory,
    /effective_scope_ids/,
  );

  assert.match(
    directory,
    /selectedScopeTargetIds/,
  );

  assert.match(
    directory,
    /scope\.ultg_functloc_id/,
  );

  assert.match(
    directory,
    /scope\.upt_functloc_id/,
  );
});

test("Stage 2C.3 administration actions are capability-gated while Open remains global", () => {
  const directory =
    read(
      "components/admin/users/user-directory.tsx",
    );

  assert.match(
    directory,
    /canManageUsers/,
  );

  assert.match(
    directory,
    /Template/,
  );

  assert.match(
    directory,
    /Import/,
  );

  assert.match(
    directory,
    /Add User/,
  );

  assert.match(
    directory,
    /\bOpen\b/,
  );

  assert.match(
    directory,
    /canExportUsers/,
  );
});
test("Stage 2C.4A User Detail backend exposes granular capabilities", () => {
  const service =
    read(
      "services/admin-user-detail-service.ts",
    );

  assert.match(
    service,
    /can_edit_personal/,
  );

  assert.match(
    service,
    /can_edit_organization/,
  );

  assert.match(
    service,
    /can_edit_contact/,
  );

  assert.match(
    service,
    /can_add_role/,
  );

  assert.match(
    service,
    /can_deactivate_assignment/,
  );

  assert.match(
    service,
    /can_delete_assignment/,
  );

  assert.match(
    service,
    /can_change_status/,
  );

  assert.match(
    service,
    /can_password_recovery/,
  );
});

test("Stage 2C.4A profile mutation separates personal organization and contact authorization", () => {
  const actions =
    read(
      "app/(platform)/admin/users/[user_id]/actions.ts",
    );

  assert.match(
    actions,
    /updateUserPersonalInformation/,
  );

  assert.match(
    actions,
    /updateUserOrganization/,
  );

  assert.match(
    actions,
    /updateUserContactInformation/,
  );

  assert.match(
    actions,
    /capabilities\.can_edit_personal/,
  );

  assert.match(
    actions,
    /capabilities\.can_edit_organization/,
  );

  assert.match(
    actions,
    /capabilities\.can_edit_contact/,
  );
});

test("Stage 2C.4A password recovery never trusts browser supplied email", () => {
  const security =
    read(
      "app/(platform)/admin/users/[user_id]/security-actions.ts",
    );

  assert.match(
    security,
    /can_password_recovery/,
  );

  assert.match(
    security,
    /getUserById/,
  );

  assert.doesNotMatch(
    security,
    /requiredValue\(\s*formData,\s*"email"/,
  );
});

test("Stage 2C.4A assignment delete is SUPER_ADMIN capability protected", () => {
  const actions =
    read(
      "app/(platform)/admin/users/[user_id]/actions.ts",
    );

  const service =
    read(
      "services/admin-user-detail-service.ts",
    );

  assert.match(
    actions,
    /deleteUserAssignmentAction/,
  );

  assert.match(
    actions,
    /can_delete_assignment/,
  );

  assert.match(
    service,
    /opg_user_detail_delete_assignment/,
  );
});
test("Stage 2C.4B.1 User Detail profile UI follows granular capabilities", () => {
  const page =
    read(
      "app/(platform)/admin/users/[user_id]/page.tsx",
    );

  const profile =
    read(
      "components/admin/users/user-profile-form.tsx",
    );

  assert.match(
    page,
    /getUserDetailCapabilities/,
  );

  assert.match(
    page,
    /capabilities\.can_edit_personal/,
  );

  assert.match(
    page,
    /capabilities\.can_edit_organization/,
  );

  assert.match(
    page,
    /capabilities\.can_edit_contact/,
  );

  assert.match(
    profile,
    /disabled=\{!canEditPersonal\}/,
  );

  assert.match(
    profile,
    /disabled=\{!canEditOrganization\}/,
  );

  assert.match(
    profile,
    /disabled=\{!canEditContact\}/,
  );

  assert.match(
    profile,
    /canEditAny/,
  );
});

test("Stage 2C.4B.1 Authentication email remains permanently read only", () => {
  const profile =
    read(
      "components/admin/users/user-profile-form.tsx",
    );

  assert.match(
    profile,
    /label="Email"/,
  );

  assert.match(
    profile,
    /disabled/,
  );

  assert.match(
    profile,
    /readOnly/,
  );
});
test("Stage 2C.4B.2A User Detail wires access status and recovery capabilities", () => {
  const page =
    read(
      "app/(platform)/admin/users/[user_id]/page.tsx",
    );

  assert.match(
    page,
    /capabilities\.can_add_role/,
  );

  assert.match(
    page,
    /capabilities\.can_deactivate_assignment/,
  );

  assert.match(
    page,
    /capabilities\.can_delete_assignment/,
  );

  assert.match(
    page,
    /capabilities\.can_change_status/,
  );

  assert.match(
    page,
    /capabilities\.can_password_recovery/,
  );
});
test("Stage 2C.4B.2B child components accept wired capabilities", () => {
  const assignments =
    read(
      "components/admin/users/user-assignment-list.tsx",
    );

  const status =
    read(
      "components/admin/users/user-status-form.tsx",
    );

  assert.match(
    assignments,
    /canDeactivate:\s*boolean/,
  );

  assert.match(
    assignments,
    /canDelete:\s*boolean/,
  );

  assert.match(
    status,
    /canChangeStatus:\s*boolean/,
  );

  assert.match(
    status,
    /canPasswordRecovery:\s*boolean/,
  );
});
test("Stage 2C.4B.2C Access actions enforce viewer capabilities while preserving confirmation", () => {
  const assignments =
    read(
      "components/admin/users/user-assignment-list.tsx",
    );

  assert.match(
    assignments,
    /assignment\.is_active && canDeactivate/,
  );

  assert.match(
    assignments,
    /!assignment\.is_active && canDelete/,
  );

  assert.match(
    assignments,
    /deleteUserAssignmentAction/,
  );

  assert.match(
    assignments,
    /triggerLabel="Delete Assignment"/,
  );

  const confirmations =
    assignments.match(
      /<ConfirmedServerAction/g,
    ) ?? [];

  assert.ok(
    confirmations.length >= 2,
  );
});

test("Stage 2C.4B.2C status and recovery become read only without viewer capability", () => {
  const status =
    read(
      "components/admin/users/user-status-form.tsx",
    );

  assert.match(
    status,
    /disabled=\{!canChangeStatus\}/,
  );

  assert.match(
    status,
    /!canChangeStatus \|\|/,
  );

  assert.match(
    status,
    /email && canPasswordRecovery/,
  );

  assert.match(
    status,
    /Account Status bersifat read-only/,
  );

  assert.match(
    status,
    /Password Recovery user lain bersifat read-only/,
  );

  assert.match(
    status,
    /ConfirmedServerAction/,
  );
});
test("Stage 2C.4C.1 User Data export is global for authenticated users", () => {
  const service =
    read(
      "services/admin-user-export-service.ts",
    );

  assert.match(
    service,
    /async function assertAuthenticated/,
  );

  assert.match(
    service,
    /auth[\s\S]*getUser\(\)/,
  );

  assert.match(
    service,
    /await assertAuthenticated\(\)/,
  );

  assert.doesNotMatch(
    service,
    /await assertSuperAdmin\(\)/,
  );

  assert.doesNotMatch(
    service,
    /Hanya Super Administrator yang dapat mengunduh User Data/,
  );
});
test("Stage 2C.4C.2 import template and preview require ADMIN or SUPER_ADMIN", () => {
  const templateService =
    read(
      "services/admin-user-template-service.ts",
    );

  const previewService =
    read(
      "services/admin-user-import-preview-service.ts",
    );

  assert.match(
    templateService,
    /opg_fn_is_admin_or_super_admin/,
  );

  assert.match(
    templateService,
    /await assertAdminOrSuperAdmin\(\)/,
  );

  assert.doesNotMatch(
    templateService,
    /await assertSuperAdmin\(\)/,
  );

  assert.match(
    previewService,
    /opg_fn_is_admin_or_super_admin/,
  );

  assert.match(
    previewService,
    /await assertAdminOrSuperAdmin\(\)/,
  );

  assert.doesNotMatch(
    previewService,
    /await assertSuperAdmin\(\)/,
  );
});
test("Stage 2C.4C.3B create and provision user allow ADMIN or SUPER_ADMIN", () => {
  const service =
    read(
      "services/admin-create-user-service.ts",
    );

  assert.match(
    service,
    /opg_fn_is_admin_or_super_admin/,
  );

  assert.match(
    service,
    /await assertCanCreateUser\(\)/,
  );

  assert.doesNotMatch(
    service,
    /"opg_fn_is_super_admin"/,
  );

  assert.match(
    service,
    /Hanya Administrator atau Super Administrator yang dapat membuat atau memprovision user/,
  );
});

test("Stage 2C.4C.3C.3 bulk import UI executes only after confirmation", () => {
  const source =
    read(
      "components/admin/users/user-import-preview.tsx",
    );

  assert.match(
    source,
    /\/api\/admin\/users\/import\/execute/,
  );

  assert.match(
    source,
    /Confirm Bulk Import/,
  );

  assert.match(
    source,
    /AlertDialog/,
  );

  assert.match(
    source,
    /importCompleted/,
  );

  assert.match(
    source,
    /Access Added/,
  );
});
test("Stage 2C.4D directory uses direct assigned scope and SUPER_ADMIN force delete", () => {
  const directory =
    read(
      "components/admin/users/user-directory.tsx",
    );

  const service =
    read(
      "services/admin-user-force-delete-service.ts",
    );

  assert.match(
    directory,
    /user\.assigned_scopes\.some/,
  );

  assert.doesNotMatch(
    directory,
    /!user\.effective_scope_ids\.some/,
  );

  assert.match(
    directory,
    /Force Delete/,
  );

  assert.match(
    directory,
    /canForceDeleteUsers/,
  );

  assert.match(
    service,
    /opg_superadmin_force_delete_v2_user/,
  );
});