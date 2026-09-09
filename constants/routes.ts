export type RouteMeta = {
  title: string;
  section: "Operations" | "Administration" | "System";
};

export const routeMeta: Record<string, RouteMeta> = {
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
    title: "Users",
    section: "Administration",
  },
  "/admin/roles": {
    title: "Roles",
    section: "Administration",
  },
  "/admin/units": {
    title: "Units",
    section: "Administration",
  },
  "/profile": {
    title: "Profile Saya",
    section: "System",
  },
};

export function getRouteMeta(pathname: string): RouteMeta {
  const exact = routeMeta[pathname];

  if (exact) {
    return exact;
  }

  const matchedPath = Object.keys(routeMeta)
    .sort((a, b) => b.length - a.length)
    .find((path) => pathname.startsWith(`${path}/`));

  if (matchedPath) {
    return routeMeta[matchedPath];
  }

  return {
    title: "OPERGRID",
    section: "System",
  };
}