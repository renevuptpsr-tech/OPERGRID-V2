"use client";

import {
  Activity,
  BookOpenText,
  Building2,
  CalendarClock,
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  ShieldCheck,
  ThermometerSun,
  Users,
  Wrench,
  X,
  Zap,
} from "lucide-react";

import Link from "next/link";

import {
  usePathname,
} from "next/navigation";

import {
  useMemo,
  useState,
} from "react";


export type SidebarModuleAccess = {
  module_id: string;
  module_code: string;
  module_name: string;
  module_group: string;
  route_path: string | null;
  icon_key: string | null;
  can_view: boolean;
  sort_order: number;
};


type SidebarProps = {
  collapsed: boolean;
  mobileOpen: boolean;
  moduleAccess: SidebarModuleAccess[];
  onCloseMobile: () => void;
};


const ADMIN_CODES =
  new Set([
    "USER_MANAGEMENT",
    "ROLE_MANAGEMENT",
    "UNIT_MANAGEMENT",
  ]);


function ModuleIcon({
  code,
}: {
  code: string;
}) {
  switch (code) {
    case "DASHBOARD":
      return <LayoutDashboard size={17} strokeWidth={1.8} />;

    case "LOGSHEET":
      return <BookOpenText size={17} strokeWidth={1.8} />;

    case "SHIFT":
      return <CalendarClock size={17} strokeWidth={1.8} />;

    case "MUTASI_JURNAL":
      return <Activity size={17} strokeWidth={1.8} />;

    case "MANUVER":
      return <Wrench size={17} strokeWidth={1.8} />;

    case "GANGGUAN_20KV":
      return <Zap size={17} strokeWidth={1.8} />;

    case "THERMOVISI":
      return <ThermometerSun size={17} strokeWidth={1.8} />;

    case "USER_MANAGEMENT":
      return <Users size={17} strokeWidth={1.8} />;

    case "ROLE_MANAGEMENT":
      return <ShieldCheck size={17} strokeWidth={1.8} />;

    case "UNIT_MANAGEMENT":
      return <Building2 size={17} strokeWidth={1.8} />;

    default:
      return <Activity size={17} strokeWidth={1.8} />;
  }
}


function NavItem({
  module,
  collapsed,
  onNavigate,
}: {
  module: SidebarModuleAccess;
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  const pathname =
    usePathname();

  if (!module.route_path) {
    return null;
  }

  const active =
    pathname === module.route_path ||
    pathname.startsWith(
      `${module.route_path}/`
    );

  return (
    <Link
      href={module.route_path}
      onClick={onNavigate}
      title={
        collapsed
          ? module.module_name
          : undefined
      }
      className={[
        "og-fast-transition",
        "flex h-10 items-center rounded-[10px] px-3",
        active
          ? "og-side-active"
          : "og-side-nav",
        collapsed
          ? "justify-center"
          : "",
      ].join(" ")}
    >
      <ModuleIcon
        code={module.module_code}
      />

      {!collapsed && (
        <span className="ml-3 truncate text-[12px] font-medium">
          {module.module_name}
        </span>
      )}
    </Link>
  );
}


function SectionLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="og-side-label mb-2 px-3 text-[8px] font-semibold uppercase tracking-[0.18em]">
      {children}
    </div>
  );
}


export function Sidebar({
  collapsed,
  mobileOpen,
  moduleAccess,
  onCloseMobile,
}: SidebarProps) {
  const pathname =
    usePathname();

  const [
    adminManualOpen,
    setAdminManualOpen,
  ] = useState(false);


  const dashboard =
    useMemo(
      () =>
        moduleAccess.find(
          (module) =>
            module.can_view &&
            module.module_code ===
              "DASHBOARD"
        ),
      [moduleAccess]
    );


  const operations =
    useMemo(
      () =>
        moduleAccess
          .filter(
            (module) =>
              module.can_view &&
              module.module_group ===
                "OPERATIONS" &&
              module.module_code !==
                "DASHBOARD"
          )
          .sort(
            (a, b) =>
              a.sort_order -
              b.sort_order
          ),
      [moduleAccess]
    );


  const administration =
    useMemo(
      () =>
        moduleAccess
          .filter(
            (module) =>
              module.can_view &&
              ADMIN_CODES.has(
                module.module_code
              )
          )
          .sort(
            (a, b) =>
              a.sort_order -
              b.sort_order
          ),
      [moduleAccess]
    );


  const adminActive =
    administration.some(
      (module) =>
        module.route_path &&
        (
          pathname === module.route_path ||
          pathname.startsWith(
            `${module.route_path}/`
          )
        )
    );


  const adminOpen =
    adminManualOpen ||
    adminActive;


  const sidebarContent = (
    <aside
      className="og-sidebar sticky top-0 flex h-screen flex-col transition-[width] duration-150"
      style={{
        width:
          collapsed
            ? "72px"
            : "244px",
      }}
    >
      <div className="flex h-14 shrink-0 items-center border-b border-white/5 px-4">

        <div className="og-brand">
          <Zap
            size={16}
            strokeWidth={2}
          />
        </div>

        {!collapsed && (
          <div className="ml-3 min-w-0">
            <div className="truncate text-[12px] font-semibold tracking-[0.18em] text-white">
              OPERGRID
            </div>

            <div className="og-side-muted mt-0.5 truncate text-[8px] uppercase tracking-[0.15em]">
              Operational Platform
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={onCloseMobile}
          className="ml-auto flex h-8 w-8 items-center justify-center rounded-[9px] text-white/70 lg:hidden"
          aria-label="Tutup menu"
        >
          <X size={16} />
        </button>
      </div>


      <nav className="flex-1 overflow-y-auto px-3 py-4">

        {dashboard && (
          <div className="mb-5">
            <NavItem
              module={dashboard}
              collapsed={collapsed}
              onNavigate={onCloseMobile}
            />
          </div>
        )}


        {operations.length >
          0 && (
          <div>
            {!collapsed && (
              <SectionLabel>
                Operations
              </SectionLabel>
            )}

            <div className="space-y-1">
              {operations.map(
                (module) => (
                  <NavItem
                    key={module.module_id}
                    module={module}
                    collapsed={collapsed}
                    onNavigate={onCloseMobile}
                  />
                )
              )}
            </div>
          </div>
        )}


        {administration.length >
          0 && (
          <div className="mt-6">

            {!collapsed && (
              <SectionLabel>
                Tools
              </SectionLabel>
            )}


            {!collapsed ? (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setAdminManualOpen(
                      (value) =>
                        !value
                    )
                  }
                  className={[
                    "og-fast-transition",
                    "flex h-10 w-full items-center rounded-[10px] px-3",
                    adminActive
                      ? "og-side-active"
                      : "og-side-nav",
                  ].join(" ")}
                >
                  <Wrench
                    size={17}
                    strokeWidth={1.8}
                  />

                  <span className="ml-3 text-[12px] font-medium">
                    Administration
                  </span>

                  <span className="ml-auto">
                    {adminOpen ? (
                      <ChevronDown size={14} />
                    ) : (
                      <ChevronRight size={14} />
                    )}
                  </span>
                </button>

                {adminOpen && (
                  <div className="ml-5 mt-1 space-y-1 border-l border-white/10 pl-2">
                    {administration.map(
                      (module) => (
                        <NavItem
                          key={module.module_id}
                          module={module}
                          collapsed={false}
                          onNavigate={onCloseMobile}
                        />
                      )
                    )}
                  </div>
                )}
              </>
            ) : (
              <div
                className={[
                  "flex h-10 items-center justify-center rounded-[10px]",
                  adminActive
                    ? "og-side-active"
                    : "og-side-nav",
                ].join(" ")}
              >
                <Wrench size={17} />
              </div>
            )}

          </div>
        )}

      </nav>


      <div className="border-t border-white/5 p-3">

        <div
          className={[
            "flex items-center rounded-[9px] bg-white/[0.035]",
            collapsed
              ? "h-9 justify-center"
              : "h-9 px-3",
          ].join(" ")}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{
              background:
                "var(--og-teal)",
            }}
          />

          {!collapsed && (
            <span className="og-side-secondary ml-2 text-[9px]">
              System Online
            </span>
          )}
        </div>

      </div>
    </aside>
  );


  return (
    <>
      <div className="hidden shrink-0 lg:block">
        {sidebarContent}
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-[90] lg:hidden">
          <button
            type="button"
            aria-label="Tutup menu"
            onClick={onCloseMobile}
            className="absolute inset-0 bg-black/45"
          />

          <div className="relative h-full w-[244px]">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}