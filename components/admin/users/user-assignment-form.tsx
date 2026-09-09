"use client";

import {
  Plus,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import {
  Button,
  FormField,
} from "@/components/ui";

import type {
  AdminRoleOption,
  AdminScopeOption,
} from "@/services/admin-user-detail-service";

import {
  assignUserRoleAction,
} from "@/app/(platform)/admin/users/[user_id]/actions";


type UserAssignmentFormProps = {
  userId: string;
  roles: AdminRoleOption[];
  scopes: AdminScopeOption[];
};


export function UserAssignmentForm({
  userId,
  roles,
  scopes,
}: UserAssignmentFormProps) {
  const [
    selectedRoleCode,
    setSelectedRoleId,
  ] = useState(
    roles[0]?.role_code ??
      ""
  );


  const selectedRole =
    useMemo(
      () =>
        roles.find(
          (role) =>
            role.role_code ===
            selectedRoleCode
        ) ??
        null,
      [
        roles,
        selectedRoleCode,
      ]
    );


  const requiresScope =
    Boolean(
      selectedRole &&
      selectedRole.scope_level !==
        "GLOBAL"
    );


  const filteredScopes =
    useMemo(
      () => {
        if (
          !selectedRole ||
          !requiresScope
        ) {
          return [];
        }

        if (
          selectedRole.scope_level ===
          "FLEXIBLE"
        ) {
          return scopes;
        }

        return scopes.filter(
          (scope) =>
            scope.scope_level ===
            selectedRole.scope_level
        );
      },
      [
        selectedRole,
        requiresScope,
        scopes,
      ]
    );


  return (
    <form
      action={
        assignUserRoleAction
      }
      className="space-y-5"
    >

      <input
        type="hidden"
        name="user_id"
        value={
          userId
        }
      />


      <div className="grid gap-4 sm:grid-cols-2">

        <FormField
          label="Role"
          required
        >
          <select
            name="role_code"
            required
            value={
              selectedRoleCode
            }
            onChange={(
              event
            ) =>
              setSelectedRoleId(
                event.target.value
              )
            }
            className="og-ui-select h-10 w-full rounded-[10px] px-3 text-[11px] outline-none"
          >
            {roles.map(
              (role) => (
                <option
                  key={
                    role.role_id
                  }
                  value={
                    role.role_id
                  }
                >
                  {role.role_name}
                </option>
              )
            )}
          </select>
        </FormField>


        <FormField
          label="Operational Scope"
          required={
            requiresScope
          }
          helper={
            selectedRole
              ? `Scope level: ${selectedRole.scope_level}`
              : undefined
          }
        >
          <select
            name="scope_functloc_id"
            required={
              requiresScope
            }
            disabled={
              !requiresScope
            }
            defaultValue=""
            className="og-ui-select h-10 w-full rounded-[10px] px-3 text-[11px] outline-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            {!requiresScope ? (
              <option value="">
                GLOBAL
              </option>
            ) : (
              <>
                <option value="">
                  Pilih operational scope
                </option>

                {filteredScopes.map(
                  (scope) => (
                    <option
                      key={
                        scope.functloc_id
                      }
                      value={
                        scope.functloc_id
                      }
                    >
                      {scope.location_name}
                    </option>
                  )
                )}
              </>
            )}
          </select>
        </FormField>


        <FormField
          label="Valid From"
        >
          <input
            type="date"
            name="valid_from"
            className="og-ui-input h-10 w-full rounded-[10px] px-3 text-[11px] outline-none"
          />
        </FormField>


        <FormField
          label="Valid Until"
          helper="Kosongkan jika assignment tidak memiliki tanggal berakhir."
        >
          <input
            type="date"
            name="valid_until"
            className="og-ui-input h-10 w-full rounded-[10px] px-3 text-[11px] outline-none"
          />
        </FormField>

      </div>


      <div className="grid gap-3 rounded-[12px] border p-4 sm:grid-cols-2"
        style={{
          background:
            "var(--og-surface-soft)",

          borderColor:
            "var(--og-border-soft)",
        }}
      >

        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            name="is_primary"
            className="mt-0.5 h-4 w-4 accent-[var(--og-cyan-strong)]"
          />

          <span>
            <span className="og-text block text-[10px] font-medium">
              Primary Role
            </span>

            <span className="og-muted mt-0.5 block text-[8px]">
              Jadikan assignment ini sebagai role utama user.
            </span>
          </span>
        </label>


        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            name="include_children"
            className="mt-0.5 h-4 w-4 accent-[var(--og-cyan-strong)]"
          />

          <span>
            <span className="og-text block text-[10px] font-medium">
              Include Child Scope
            </span>

            <span className="og-muted mt-0.5 block text-[8px]">
              Berlaku juga pada hierarchy di bawah scope ini.
            </span>
          </span>
        </label>

      </div>


      <FormField
        label="Notes"
      >
        <textarea
          name="notes"
          rows={3}
          placeholder="Catatan assignment..."
          className="og-ui-input w-full resize-y rounded-[10px] px-3 py-2.5 text-[11px] outline-none"
        />
      </FormField>


      <div className="flex justify-end border-t pt-4"
        style={{
          borderColor:
            "var(--og-border-soft)",
        }}
      >
        <Button
          type="submit"
          disabled={
            roles.length ===
            0
          }
          leftIcon={
            <Plus
              size={14}
              strokeWidth={1.8}
            />
          }
        >
          Add Assignment
        </Button>
      </div>

    </form>
  );
}