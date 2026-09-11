"use client";

import {
  Plus,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import {
  FormField,
  SubmitButton,
} from "@/components/ui";

import type {
  AdminRoleOption,
  AdminScopeOption,
} from "@/services/admin-user-detail-service";

import {
  assignUserRoleAction,
} from "@/app/(platform)/admin/users/[user_id]/actions";

type UserAssignmentFormProps = {
  userId:
    string;

  roles:
    AdminRoleOption[];

  scopes:
    AdminScopeOption[];
};

export function UserAssignmentForm({
  userId,
  roles,
  scopes,
}: UserAssignmentFormProps) {
  const [
    selectedRoleCode,
    setSelectedRoleCode,
  ] =
    useState(
      roles[0]?.role_code ??
      "",
    );

  const selectedRole =
    useMemo(
      () =>
        roles.find(
          (role) =>
            role.role_code ===
            selectedRoleCode,
        ) ??
        null,
      [
        roles,
        selectedRoleCode,
      ],
    );

  const requiresScope =
    Boolean(
      selectedRole &&
      selectedRole.scope_level !==
        "GLOBAL",
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
            selectedRole.scope_level,
        );
      },
      [
        selectedRole,
        requiresScope,
        scopes,
      ],
    );

  return (
    <form
      action={
        assignUserRoleAction
      }
      className="og-user-assignment-form"
    >
      <input
        type="hidden"
        name="user_id"
        value={
          userId
        }
      />

      <div className="og-user-form-grid">
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
              event,
            ) =>
              setSelectedRoleCode(
                event.target.value,
              )
            }
            className="og-ui-select og-premium-form-control"
          >
            {roles.map(
              (role) => (
                <option
                  key={
                    role.role_id
                  }
                  value={
                    role.role_code
                  }
                >
                  {role.role_name}
                </option>
              ),
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
            className="og-ui-select og-premium-form-control"
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
                      {
                        scope.location_name
                      }
                    </option>
                  ),
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
            className="og-ui-input og-premium-form-control"
          />
        </FormField>

        <FormField
          label="Valid Until"
          helper="Kosongkan jika assignment tidak memiliki tanggal berakhir."
        >
          <input
            type="date"
            name="valid_until"
            className="og-ui-input og-premium-form-control"
          />
        </FormField>
      </div>

      <div className="og-user-assignment-options">
        <label>
          <input
            type="checkbox"
            name="is_primary"
          />

          <span>
            <strong>
              Primary Role
            </strong>

            <small>
              Jadikan assignment ini sebagai
              role utama pengguna.
            </small>
          </span>
        </label>

        <label>
          <input
            type="checkbox"
            name="include_children"
          />

          <span>
            <strong>
              Include Child Scope
            </strong>

            <small>
              Berlaku juga pada hierarchy
              di bawah scope ini.
            </small>
          </span>
        </label>
      </div>

      <FormField label="Notes">
        <textarea
          name="notes"
          rows={3}
          placeholder="Catatan assignment..."
          className="og-ui-input og-premium-form-textarea"
        />
      </FormField>

      <div className="og-user-assignment-submit">
        <SubmitButton
          disabled={
            roles.length ===
            0
          }
          pendingText="Adding assignment..."
          leftIcon={
            <Plus
              size={14}
              strokeWidth={1.9}
            />
          }
        >
          Add Assignment
        </SubmitButton>
      </div>
    </form>
  );
}