import type {
  CurrentUserContext,
} from "@/features/auth/get-current-user-context";

import type {
  PlatformShellIdentity,
  PlatformShellModuleAccess,
} from "./shell-model";

export type PlatformShellContextModel = {
  identity: PlatformShellIdentity;
  moduleAccess: PlatformShellModuleAccess[];
};

export function resolvePlatformShellIdentity(
  context: CurrentUserContext,
): PlatformShellIdentity {
  const displayName =
    context.profile?.display_name ??
    context.profile?.full_name ??
    context.user.email ??
    "User";

  const primaryAssignment =
    context.assignments.find(
      (assignment) =>
        assignment.is_primary,
    ) ??
    context.assignments[0];

  const roleLabel =
    primaryAssignment?.role_name ??
    primaryAssignment?.role_code ??
    "User";

  return {
    userId:
      context.user.id,

    displayName,
    roleLabel,
  };
}

export function resolvePlatformShellModuleAccess(
  context: CurrentUserContext,
): PlatformShellModuleAccess[] {
  return context.moduleAccess
    .filter(
      (module) =>
        module.can_view === true,
    )
    .map((module) => ({
      module_id: module.module_id,
      module_code: module.module_code,
      module_name: module.module_name,
      module_group: module.module_group,
      route_path: module.route_path,
      icon_key: module.icon_key,
      can_view: module.can_view,
      sort_order: module.sort_order,
    }));
}

export function buildPlatformShellContext(
  context: CurrentUserContext,
): PlatformShellContextModel {
  return {
    identity:
      resolvePlatformShellIdentity(context),

    moduleAccess:
      resolvePlatformShellModuleAccess(context),
  };
}