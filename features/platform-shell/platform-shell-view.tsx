"use client";

import {
  Zap,
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
  moduleAccess: readonly PlatformShellModuleAccess[];
};

export function PlatformShellView({
  children,
  identity,
  moduleAccess,
}: PlatformShellViewProps) {
  const pathname =
    usePathname();

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
          descriptor="Operational Platform"
          mark={
            <Zap
              size={22}
              strokeWidth={2}
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
            descriptor="Operational Platform"
            mark={
              <Zap
                size={22}
                strokeWidth={2}
              />
            }
          />
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
    <div data-og-design-system="1">
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
              <PlatformPageHeader />
            }
          >
            {children}
          </PageContent>
        </ContentContainer>
      </AppShell>
    </div>
  );
}