"use client";

import {
  Activity,
  ChevronDown,
  ChevronRight,
  Wrench,
} from "lucide-react";

import {
  useState,
} from "react";

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
  navigation:
    PlatformShellNavigationModel;
  collapsed: boolean;
  administrationOpen: boolean;
  administrationActive: boolean;
  onToggleAdministration:
    () => void;
  onNavigate?:
    () => void;
};


const INCIDENT_MODULE_CODES =
  new Set([
    "MANUVER",
    "GANGGUAN_20KV",
  ]);


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

  const incidentModules =
    navigation.operations.filter(
      (module) =>
        INCIDENT_MODULE_CODES.has(
          module.module_code,
        ),
    );

  const otherOperations =
    navigation.operations.filter(
      (module) =>
        !INCIDENT_MODULE_CODES.has(
          module.module_code,
        ),
    );

  const incidentActive =
    incidentModules.some(
      (module) =>
        isRouteActive(
          pathname,
          module.route_path,
        ),
    );

  const [
    incidentManualOpen,
    setIncidentManualOpen,
  ] = useState(false);

  const incidentOpen =
    incidentManualOpen ||
    incidentActive;

  return (
    <>
      {dashboard ? (
        <SidebarGroup
          collapsed={collapsed}
        >
          <SidebarModuleItem
            module={dashboard}
            pathname={pathname}
            collapsed={collapsed}
            onNavigate={onNavigate}
          />
        </SidebarGroup>
      ) : null}

      {navigation.operations.length >
      0 ? (
        <SidebarGroup
          label="Operations"
          collapsed={collapsed}
        >
          {otherOperations.map(
            (module) => (
              <SidebarModuleItem
                key={
                  module.module_id
                }
                module={module}
                pathname={pathname}
                collapsed={collapsed}
                onNavigate={
                  onNavigate
                }
              />
            ),
          )}

          {incidentModules.length >
          0 ? (
            collapsed ? (
              incidentModules.map(
                (module) => (
                  <SidebarModuleItem
                    key={
                      module.module_id
                    }
                    module={module}
                    pathname={
                      pathname
                    }
                    collapsed
                    onNavigate={
                      onNavigate
                    }
                  />
                ),
              )
            ) : (
              <>
                <button
                  type="button"
                  className="og-ds-sidebar-nav-item"
                  data-active={
                    incidentActive ||
                    undefined
                  }
                  aria-expanded={
                    incidentOpen
                  }
                  onClick={() =>
                    setIncidentManualOpen(
                      (value) =>
                        !value,
                    )
                  }
                >
                  <span
                    className="og-ds-sidebar-nav-icon"
                    aria-hidden="true"
                  >
                    <Activity
                      size={18}
                      strokeWidth={1.8}
                    />
                  </span>

                  <span className="og-ds-sidebar-nav-label">
                    Manuver / Gangguan
                  </span>

                  <span
                    className="og-ds-sidebar-nav-icon"
                    aria-hidden="true"
                  >
                    {incidentOpen ? (
                      <ChevronDown
                        size={15}
                      />
                    ) : (
                      <ChevronRight
                        size={15}
                      />
                    )}
                  </span>
                </button>

                {incidentOpen ? (
                  <div className="og-platform-admin-subnav">
                    {incidentModules.map(
                      (module) => (
                        <SidebarModuleItem
                          key={
                            module.module_id
                          }
                          module={
                            module
                          }
                          pathname={
                            pathname
                          }
                          collapsed={
                            false
                          }
                          onNavigate={
                            onNavigate
                          }
                        />
                      ),
                    )}
                  </div>
                ) : null}
              </>
            )
          ) : null}
        </SidebarGroup>
      ) : null}

      {navigation.administration.length >
      0 ? (
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
                  <Wrench
                    size={18}
                  />
                </span>

                <span className="og-ds-sidebar-nav-label">
                  Administration
                </span>

                <span
                  aria-hidden="true"
                  className="og-ds-sidebar-nav-icon"
                >
                  {administrationOpen ? (
                    <ChevronDown
                      size={15}
                    />
                  ) : (
                    <ChevronRight
                      size={15}
                    />
                  )}
                </span>
              </button>

              {administrationOpen ? (
                <div className="og-platform-admin-subnav">
                  {navigation
                    .administration
                    .map(
                      (module) => (
                        <SidebarModuleItem
                          key={
                            module.module_id
                          }
                          module={
                            module
                          }
                          pathname={
                            pathname
                          }
                          collapsed={
                            false
                          }
                          onNavigate={
                            onNavigate
                          }
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
                <Wrench
                  size={18}
                />
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
  module:
    PlatformShellNavigationModel[
      "operations"
    ][number];

  pathname:
    string;

  collapsed:
    boolean;

  onNavigate?:
    () => void;
}) {
  if (
    !module.route_path
  ) {
    return null;
  }

  return (
    <SidebarNavItem
      label={
        module.module_name
      }
      href={
        module.route_path
      }
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
      collapsed={
        collapsed
      }
      onClick={
        onNavigate
      }
    />
  );
}