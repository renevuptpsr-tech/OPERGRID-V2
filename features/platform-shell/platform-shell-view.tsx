"use client";

import {
  Network,
} from "lucide-react";

import {
  usePathname,
} from "next/navigation";

import {
  type ReactNode,
} from "react";

import {
  AppShell,
  ContentContainer,
  MobileNavTrigger,
  MobileSidebarDrawer,
  PageContent,
  Sidebar,
  SidebarBrand,
  Topbar,
} from "@/components/design-system/navigation";

import {
  ThemeToggle,
} from "@/components/theme/theme-toggle";

import {
  resolvePlatformPageInfo,
} from "./page-registry";

import {
  type PlatformShellIdentity,
  type PlatformShellModuleAccess,
} from "./shell-model";

import {
  PlatformSidebarNavigation,
} from "./platform-sidebar-navigation";

import {
  PlatformUserControl,
} from "./platform-user-control";

import {
  PlatformPageHeader,
} from "./platform-page-header";

import {
  usePlatformShellController,
} from "./use-platform-shell-controller";

export type PlatformShellViewProps = {
  children: ReactNode;
  identity: PlatformShellIdentity;
  moduleAccess:
    readonly PlatformShellModuleAccess[];
};

export function PlatformShellView({
  children,
  identity,
  moduleAccess,
}: PlatformShellViewProps) {
  const pathname =
    usePathname();

  const page =
    resolvePlatformPageInfo(
      pathname,
    );

  const shell =
    usePlatformShellController({
      pathname,
      moduleAccess,
    });

  const desktopSidebar = (
    <Sidebar
      collapsed={
        shell.sidebarCollapsed
      }
      onCollapsedChange={
        shell.setSidebarCollapsed
      }
      brand={
        <SidebarBrand
          collapsed={
            shell.sidebarCollapsed
          }
          name="OPERGRID"
          descriptor="Grid Operations Intelligence"
          mark={
            <Network
              size={23}
              strokeWidth={1.9}
            />
          }
        />
      }
      footer={
        <div className="og-platform-system-status">
          <span
            className="og-platform-system-dot"
            aria-hidden="true"
          />

          {!shell.sidebarCollapsed ? (
            <span>
              System Online
            </span>
          ) : null}
        </div>
      }
    >
      <PlatformSidebarNavigation
        pathname={pathname}
        navigation={
          shell.navigation
        }
        collapsed={
          shell.sidebarCollapsed
        }
        administrationOpen={
          shell.administrationOpen
        }
        administrationActive={
          shell.administrationActive
        }
        onToggleAdministration={
          shell.toggleAdministration
        }
      />
    </Sidebar>
  );

  const mobileSidebar = (
    <MobileSidebarDrawer
      open={shell.mobileOpen}
      onOpenChange={
        shell.setMobileOpen
      }
    >
      <Sidebar
        collapsed={false}
        brand={
          <SidebarBrand
            name="OPERGRID"
            descriptor="Grid Operations Intelligence"
            mark={
              <Network
                size={23}
                strokeWidth={1.9}
              />
            }
          />
        }
        footer={
          <div className="og-platform-system-status">
            <span
              className="og-platform-system-dot"
              aria-hidden="true"
            />

            <span>
              System Online
            </span>
          </div>
        }
      >
        <PlatformSidebarNavigation
          pathname={pathname}
          navigation={
            shell.navigation
          }
          collapsed={false}
          administrationOpen={
            shell.administrationOpen
          }
          administrationActive={
            shell.administrationActive
          }
          onToggleAdministration={
            shell.toggleAdministration
          }
          onNavigate={
            shell.closeMobile
          }
        />
      </Sidebar>
    </MobileSidebarDrawer>
  );

  const topbar = (
    <Topbar
      navigationControl={
        <MobileNavTrigger
          open={shell.mobileOpen}
          onOpenChange={
            shell.setMobileOpen
          }
        />
      }
      context={
        <div className="og-premium-topbar-context">
          <span className="og-premium-topbar-eyebrow">
            {page.section}
          </span>

          <strong className="og-premium-topbar-title">
            {page.title}
          </strong>
        </div>
      }
      actions={
        <ThemeToggle />
      }
      userControl={
        <PlatformUserControl
          displayName={
            identity.displayName
          }
          roleLabel={
            identity.roleLabel
          }
        />
      }
    />
  );

  return (
    <div
      data-og-design-system="1"
      className="og-premium-root"
    >
      <AppShell
        sidebar={desktopSidebar}
        topbar={topbar}
        mobileNavigation={
          mobileSidebar
        }
        sidebarCollapsed={
          shell.sidebarCollapsed
        }
      >
        <ContentContainer size="wide">
          <PageContent
            header={
              pathname ===
              "/dashboard"
                ? undefined
                : (
                    <PlatformPageHeader />
                  )
            }
          >
            {children}
          </PageContent>
        </ContentContainer>
      </AppShell>
    </div>
  );
}