"use client";

import {
  ChevronDown,
  ChevronRight,
  Wrench,
} from "lucide-react";

import {
  SidebarGroup,
  SidebarNavItem,
} from "@/components/design-system/navigation";

import {
  isRouteActive,
  type PlatformShellNavigationModel,
} from "./shell-model";

import {
  ModuleIcon,
} from "./icon-registry";

export type PlatformSidebarNavigationProps = {
  pathname: string;
  navigation: PlatformShellNavigationModel;
  collapsed: boolean;
  administrationOpen: boolean;
  administrationActive: boolean;
  onToggleAdministration: () => void;
  onNavigate?: () => void;
};

export function PlatformSidebarNavigation({
  pathname,
  navigation,
  collapsed,
  administrationOpen,
  administrationActive,
  onToggleAdministration,
  onNavigate,
}: PlatformSidebarNavigationProps) {
  const dashboard =
    navigation.dashboard;

  return (
    <>
      {dashboard ? (
        <SidebarGroup collapsed={collapsed}>
          <SidebarModuleItem
            module={dashboard}
            pathname={pathname}
            collapsed={collapsed}
            onNavigate={onNavigate}
          />
        </SidebarGroup>
      ) : null}

      {navigation.operations.length > 0 ? (
        <SidebarGroup
          label="Operations"
          collapsed={collapsed}
        >
          {navigation.operations.map(
            (module) => (
              <SidebarModuleItem
                key={module.module_id}
                module={module}
                pathname={pathname}
                collapsed={collapsed}
                onNavigate={onNavigate}
              />
            ),
          )}
        </SidebarGroup>
      ) : null}

      {navigation.administration.length > 0 ? (
        <SidebarGroup
          label="Tools"
          collapsed={collapsed}
        >
          {!collapsed ? (
            <>
              <button
                type="button"
                className="og-ds-sidebar-nav-item"
                data-active={
                  administrationActive ||
                  undefined
                }
                aria-expanded={
                  administrationOpen
                }
                onClick={
                  onToggleAdministration
                }
              >
                <span
                  className="og-ds-sidebar-nav-icon"
                  aria-hidden="true"
                >
                  <Wrench size={18} />
                </span>

                <span className="og-ds-sidebar-nav-label">
                  Administration
                </span>

                <span
                  aria-hidden="true"
                  className="og-ds-sidebar-nav-icon"
                >
                  {administrationOpen ? (
                    <ChevronDown size={15} />
                  ) : (
                    <ChevronRight size={15} />
                  )}
                </span>
              </button>

              {administrationOpen ? (
                <div className="og-platform-admin-subnav">
                  {navigation.administration.map(
                    (module) => (
                      <SidebarModuleItem
                        key={module.module_id}
                        module={module}
                        pathname={pathname}
                        collapsed={false}
                        onNavigate={onNavigate}
                      />
                    ),
                  )}
                </div>
              ) : null}
            </>
          ) : (
            <div
              className="og-ds-sidebar-nav-item"
              data-active={
                administrationActive ||
                undefined
              }
              data-collapsed
              aria-label="Administration"
            >
              <span
                className="og-ds-sidebar-nav-icon"
                aria-hidden="true"
              >
                <Wrench size={18} />
              </span>
            </div>
          )}
        </SidebarGroup>
      ) : null}
    </>
  );
}

function SidebarModuleItem({
  module,
  pathname,
  collapsed,
  onNavigate,
}: {
  module: PlatformShellNavigationModel["operations"][number];
  pathname: string;
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  if (!module.route_path) {
    return null;
  }

  return (
    <SidebarNavItem
      label={module.module_name}
      href={module.route_path}
      icon={
        <ModuleIcon
          moduleCode={
            module.module_code
          }
          size={18}
          strokeWidth={1.8}
        />
      }
      active={
        isRouteActive(
          pathname,
          module.route_path,
        )
      }
      collapsed={collapsed}
      onClick={onNavigate}
    />
  );
}