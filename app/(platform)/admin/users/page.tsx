import {
  UserDirectory,
} from "@/components/admin/users/user-directory";

import {
  getCanForceDeleteUsers,
} from "@/services/admin-user-force-delete-service";

import {
  getAdminDirectoryScopeHierarchy,
  getAdminUserDirectory,
  getUserDirectoryCapabilities,
} from "@/services/admin-user-directory-service";


export default async function UserManagementPage() {
  const [
    users,
    scopes,
    capabilities,
    canForceDeleteUsers,
  ] =
    await Promise.all([
      getAdminUserDirectory(),
      getAdminDirectoryScopeHierarchy(),
      getUserDirectoryCapabilities(),
      getCanForceDeleteUsers(),
    ]);

  return (
    <div className="space-y-4">
      <UserDirectory
        users={
          users
        }
        scopes={
          scopes
        }
        canManageUsers={
          capabilities.can_manage_users
        }
        canExportUsers={
          capabilities.can_export_users
        }
        canForceDeleteUsers={
          canForceDeleteUsers
        }
      />
    </div>
  );
}