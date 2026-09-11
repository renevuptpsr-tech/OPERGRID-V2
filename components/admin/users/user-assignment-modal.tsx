"use client";

import {
  Plus,
} from "lucide-react";

import {
  useState,
} from "react";

import {
  Button,
} from "@/components/ui";

import {
  Dialog,
} from "@/components/design-system/overlays";

import type {
  AdminRoleOption,
  AdminScopeOption,
} from "@/services/admin-user-detail-service";

import {
  UserAssignmentForm,
} from "@/components/admin/users/user-assignment-form";

type UserAssignmentModalProps = {
  userId:
    string;

  roles:
    AdminRoleOption[];

  scopes:
    AdminScopeOption[];
};

export function UserAssignmentModal({
  userId,
  roles,
  scopes,
}: UserAssignmentModalProps) {
  const [
    open,
    setOpen,
  ] =
    useState(false);

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
            strokeWidth={1.9}
          />
        }
      >
        Add Role Assignment
      </Button>

      <Dialog
        open={open}
        onOpenChange={
          setOpen
        }
        title="Add Role Assignment"
        description="Tentukan role, operational scope, dan masa berlaku akses pengguna."
        size="lg"
        closeOnOutsideInteraction={
          true
        }
        contentClassName="og-user-assignment-dialog"
      >
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
      </Dialog>
    </>
  );
}