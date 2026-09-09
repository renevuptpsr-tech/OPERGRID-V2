"use client";

import {
  ChevronRight,
  Zap,
} from "lucide-react";

import {
  usePathname,
} from "next/navigation";


type PageInfo = {
  title: string;
  section: string;
};


const staticPages: Record<
  string,
  PageInfo
> = {
  "/dashboard": {
    title: "Dashboard",
    section: "Operations",
  },

  "/logsheet": {
    title: "Logsheet",
    section: "Operations",
  },

  "/shift": {
    title: "Shift",
    section: "Operations",
  },

  "/mutasi-jurnal": {
    title: "Mutasi Jurnal",
    section: "Operations",
  },

  "/manuver": {
    title: "Manuver",
    section: "Operations",
  },

  "/gangguan-20kv": {
    title: "Gangguan 20 kV",
    section: "Operations",
  },

  "/thermovisi": {
    title: "Thermovisi",
    section: "Operations",
  },

  "/admin/users": {
    title: "User Management",
    section: "Administration",
  },

  "/admin/roles": {
    title: "Role Management",
    section: "Administration",
  },

  "/admin/units": {
    title: "Unit Management",
    section: "Administration",
  },
};


function resolvePageInfo(
  pathname: string
): PageInfo {
  const staticPage =
    staticPages[pathname];

  if (staticPage) {
    return staticPage;
  }

  if (
    pathname ===
    "/admin/users/import"
  ) {
    return {
      title:
        "Import Users",

      section:
        "Administration",
    };
  }


  if (
    pathname ===
    "/admin/users/new"
  ) {
    return {
      title:
        "Create User",

      section:
        "Administration",
    };
  }


  if (
    pathname.startsWith(
      "/admin/users/"
    )
  ) {
    return {
      title:
        "User Detail",

      section:
        "Administration",
    };
  }

  if (
    pathname.startsWith(
      "/admin/roles/"
    )
  ) {
    return {
      title:
        "Role Detail",

      section:
        "Administration",
    };
  }

  if (
    pathname.startsWith(
      "/admin/units/"
    )
  ) {
    return {
      title:
        "Unit Detail",

      section:
        "Administration",
    };
  }

  return {
    title: "OPERGRID",
    section: "Platform",
  };
}


export function PageHeader() {
  const pathname =
    usePathname();

  const meta =
    resolvePageInfo(
      pathname
    );


  return (
    <header className="pb-4">

      <div className="flex items-center gap-1.5 text-[8px] font-semibold uppercase tracking-[0.16em]">

        <span
          className="flex items-center gap-1.5"
          style={{
            color:
              "var(--og-cyan-strong)",
          }}
        >
          <Zap
            size={10}
            strokeWidth={2}
          />

          OPERGRID
        </span>


        <ChevronRight
          size={10}
          className="og-subtle"
        />


        <span className="og-muted">
          {meta.section}
        </span>


        <ChevronRight
          size={10}
          className="og-subtle"
        />


        <span className="og-muted">
          {meta.title}
        </span>

      </div>


      <h1 className="og-text mt-2.5 text-[24px] font-semibold leading-none tracking-[-0.025em]">
        {meta.title}
      </h1>

    </header>
  );
}