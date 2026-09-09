import { redirect } from "next/navigation";

import { AppShell } from "@/components/layout/app-shell";
import { getCurrentUserContext } from "@/features/auth/get-current-user-context";

export default async function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const context =
    await getCurrentUserContext();

  if (!context) {
    redirect("/login");
  }

  const fullName =
    context.profile?.display_name ??
    context.profile?.full_name ??
    context.user.email ??
    "User";

  const primaryAssignment =
    context.assignments.find(
      (assignment) =>
        assignment.is_primary
    ) ??
    context.assignments[0];

  const roleName =
    primaryAssignment?.role_name ??
    primaryAssignment?.role_code ??
    "User";

  const moduleAccess =
    context.moduleAccess
      .filter(
        (module) =>
          module.can_view === true
      )
      .map((module) => ({
        module_id: module.module_id,
        module_code:
          module.module_code,
        module_name:
          module.module_name,
        module_group:
          module.module_group,
        route_path:
          module.route_path,
        icon_key:
          module.icon_key,
        can_view:
          module.can_view,
        sort_order:
          module.sort_order,
      }));

  return (
    <AppShell
      fullName={fullName}
      roleName={roleName}
      moduleAccess={moduleAccess}

    >
      {children}
    </AppShell>
  );
}