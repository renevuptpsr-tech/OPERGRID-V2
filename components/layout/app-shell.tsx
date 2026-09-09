"use client";

import {
  useState,
} from "react";

import {
  PageHeader,
} from "@/components/layout/page-header";

import {
  Sidebar,
  type SidebarModuleAccess,
} from "@/components/layout/sidebar";

import {
  Topbar,
} from "@/components/layout/topbar";


type AppShellProps = {
  children: React.ReactNode;
  fullName: string;
  roleName: string;
  moduleAccess: SidebarModuleAccess[];
};


export function AppShell({
  children,
  fullName,
  roleName,
  moduleAccess,
}: AppShellProps) {
  const [
    collapsed,
    setCollapsed,
  ] = useState(false);

  const [
    mobileOpen,
    setMobileOpen,
  ] = useState(false);


  return (
    <div className="og-shell flex">

      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        moduleAccess={moduleAccess}
        onCloseMobile={() =>
          setMobileOpen(false)
        }
      />


      <div className="min-w-0 flex-1">

        <Topbar
          collapsed={collapsed}
          fullName={fullName}
          roleName={roleName}
          onToggleSidebar={() =>
            setCollapsed(
              (value) =>
                !value
            )
          }
          onOpenMobile={() =>
            setMobileOpen(true)
          }
        />


        <main className="og-workspace min-h-[calc(100vh-56px)] px-5 py-5 lg:px-7 lg:py-6">

          <div className="og-page-frame">

            <PageHeader />

            {children}

          </div>

        </main>

      </div>

    </div>
  );
}