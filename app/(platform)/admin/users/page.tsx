import {
  UserDirectory,
} from "@/components/admin/users/user-directory";

import {
  getAdminUserDirectory,
} from "@/services/admin-user-directory-service";


export default async function UserManagementPage() {
  const users =
    await getAdminUserDirectory();


  return (
    <div className="space-y-4">

      <UserDirectory
        users={
          users
        }
      />

    </div>
  );
}