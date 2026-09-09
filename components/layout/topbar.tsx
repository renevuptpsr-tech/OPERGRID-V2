"use client";

import {
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { UserMenu } from "@/components/layout/user-menu";


type TopbarProps = {
  collapsed: boolean;
  fullName: string;
  roleName: string;
  onToggleSidebar: () => void;
  onOpenMobile: () => void;
};


export function Topbar({
  collapsed,
  fullName,
  roleName,
  onToggleSidebar,
  onOpenMobile,
}: TopbarProps) {
  return (
    <header className="og-topbar sticky top-0 z-40 flex items-center px-4 lg:px-5">

      <button
        type="button"
        onClick={onOpenMobile}
        className="og-control flex h-9 w-9 items-center justify-center rounded-[10px] lg:hidden"
        aria-label="Buka menu"
      >
        <Menu
          size={18}
          strokeWidth={1.8}
        />
      </button>


      <button
        type="button"
        onClick={onToggleSidebar}
        className="og-control hidden h-9 w-9 items-center justify-center rounded-[10px] lg:flex"
        aria-label={
          collapsed
            ? "Perluas sidebar"
            : "Ciutkan sidebar"
        }
      >
        {collapsed ? (
          <PanelLeftOpen
            size={17}
            strokeWidth={1.8}
          />
        ) : (
          <PanelLeftClose
            size={17}
            strokeWidth={1.8}
          />
        )}
      </button>


      <div className="ml-auto flex items-center gap-2.5">

        <ThemeToggle />

        <div
          className="hidden h-6 w-px sm:block"
          style={{
            background:
              "var(--og-border)",
          }}
        />

        <UserMenu
          fullName={fullName}
          roleName={roleName}
        />

      </div>
    </header>
  );
}