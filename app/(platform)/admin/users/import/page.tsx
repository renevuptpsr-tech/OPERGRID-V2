import {
  ArrowLeft,
} from "lucide-react";

import Link from "next/link";

import {
  UserImportPreview,
} from "@/components/admin/users/user-import-preview";


export default function UserImportPage() {
  return (
    <div className="space-y-4">

      <Link
        href="/admin/users"
        className="og-secondary inline-flex items-center gap-2 text-[9px] font-medium hover:text-[var(--og-cyan-strong)]"
      >
        <ArrowLeft
          size={13}
        />

        User Management
      </Link>


      <UserImportPreview />

    </div>
  );
}