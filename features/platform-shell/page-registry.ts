export type PlatformPageInfo = {
  title: string;
  section: string;
};

const STATIC_PAGE_REGISTRY:
  Record<string, PlatformPageInfo> = {
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

export function resolvePlatformPageInfo(
  pathname: string,
): PlatformPageInfo {
  const staticPage =
    STATIC_PAGE_REGISTRY[pathname];

  if (staticPage) {
    return staticPage;
  }

  if (pathname === "/admin/users/import") {
    return {
      title: "Import Users",
      section: "Administration",
    };
  }

  if (pathname === "/admin/users/new") {
    return {
      title: "Create User",
      section: "Administration",
    };
  }

  if (
    pathname.startsWith(
      "/admin/users/",
    )
  ) {
    return {
      title: "User Detail",
      section: "Administration",
    };
  }

  if (
    pathname.startsWith(
      "/admin/roles/",
    )
  ) {
    return {
      title: "Role Detail",
      section: "Administration",
    };
  }

  if (
    pathname.startsWith(
      "/admin/units/",
    )
  ) {
    return {
      title: "Unit Detail",
      section: "Administration",
    };
  }

  return {
    title: "OPERGRID",
    section: "Platform",
  };
}