export type PlatformShellModuleAccess = {
  module_id: string;
  module_code: string;
  module_name: string;
  module_group: string;
  route_path: string | null;
  icon_key: string | null;
  can_view: boolean;
  sort_order: number;
};

export type PlatformShellIdentity = {
  userId: string;
  displayName: string;
  roleLabel: string;
};

export type PlatformShellNavigationModel = {
  dashboard: PlatformShellModuleAccess | null;
  operations: PlatformShellModuleAccess[];
  administration: PlatformShellModuleAccess[];
};

const ADMINISTRATION_MODULE_CODES = new Set([
  "USER_MANAGEMENT",
  "ROLE_MANAGEMENT",
  "UNIT_MANAGEMENT",
]);

function bySortOrder(
  a: PlatformShellModuleAccess,
  b: PlatformShellModuleAccess,
) {
  return a.sort_order - b.sort_order;
}

export function isNavigableModule(
  module: PlatformShellModuleAccess,
) {
  return (
    module.can_view === true &&
    typeof module.route_path === "string" &&
    module.route_path.length > 0
  );
}

export function isRouteActive(
  pathname: string,
  routePath: string | null,
) {
  if (!routePath) {
    return false;
  }

  return (
    pathname === routePath ||
    pathname.startsWith(`${routePath}/`)
  );
}

export function buildPlatformShellNavigation(
  moduleAccess: readonly PlatformShellModuleAccess[],
): PlatformShellNavigationModel {
  const navigable =
    moduleAccess.filter(isNavigableModule);

  const dashboard =
    navigable.find(
      (module) =>
        module.module_code === "DASHBOARD",
    ) ?? null;

  const operations =
    navigable
      .filter(
        (module) =>
          module.module_group === "OPERATIONS" &&
          module.module_code !== "DASHBOARD",
      )
      .sort(bySortOrder);

  const administration =
    navigable
      .filter((module) =>
        ADMINISTRATION_MODULE_CODES.has(
          module.module_code,
        ),
      )
      .sort(bySortOrder);

  return {
    dashboard,
    operations,
    administration,
  };
}

export function hasActiveRoute(
  pathname: string,
  modules: readonly PlatformShellModuleAccess[],
) {
  return modules.some((module) =>
    isRouteActive(
      pathname,
      module.route_path,
    ),
  );
}