"use client";

import {
  Plus,
  X,
} from "lucide-react";

import {
  useState,
} from "react";

import {
  Button,
  IconButton,
} from "@/components/ui";

import type {
  AdminRoleOption,
  AdminScopeOption,
} from "@/services/admin-user-detail-service";

import {
  UserAssignmentForm,
} from "@/components/admin/users/user-assignment-form";


type UserAssignmentModalProps = {
  userId: string;
  roles: AdminRoleOption[];
  scopes: AdminScopeOption[];
};


export function UserAssignmentModal({
  userId,
  roles,
  scopes,
}: UserAssignmentModalProps) {
  const [
    open,
    setOpen,
  ] = useState(false);


  return (
    <>
      <Button
        type="button"
        onClick={() =>
          setOpen(true)
        }
        leftIcon={
          <Plus
            size={14}
            strokeWidth={1.8}
          />
        }
      >
        Add Role Assignment
      </Button>


      {open && (
        <div className="fixed inset-0 z-[150]">

          <button
            type="button"
            aria-label="Tutup modal"
            onClick={() =>
              setOpen(false)
            }
            className="absolute inset-0 bg-[#07111c]/55"
          />


          <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6">

            <div className="og-modal-panel relative flex max-h-[90vh] w-full max-w-[720px] flex-col overflow-hidden rounded-[16px]">

              <div className="flex shrink-0 items-start justify-between border-b px-5 py-4"
                style={{
                  borderColor:
                    "var(--og-border-soft)",
                }}
              >

                <div>
                  <h2 className="og-text text-[14px] font-semibold">
                    Add Role Assignment
                  </h2>

                  <p className="og-muted mt-1 text-[9px]">
                    Tentukan role, scope, dan masa berlaku akses user.
                  </p>
                </div>

                <IconButton
                  icon={
                    <X
                      size={16}
                      strokeWidth={1.8}
                    />
                  }
                  label="Tutup"
                  variant="ghost"
                  onClick={() =>
                    setOpen(false)
                  }
                />

              </div>


              <div className="overflow-y-auto p-5">

                <UserAssignmentForm
                  userId={
                    userId
                  }
                  roles={
                    roles
                  }
                  scopes={
                    scopes
                  }
                />

              </div>

            </div>

          </div>

        </div>
      )}
    </>
  );
}