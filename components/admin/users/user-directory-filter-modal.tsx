"use client";

import {
  Filter,
  RotateCcw,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import {
  Dialog,
} from "@/components/design-system/overlays";

import {
  Button,
} from "@/components/design-system/primitives/button";

import type {
  AdminDirectoryScopeHierarchyNode,
} from "@/services/admin-user-directory-service";


export type DirectoryStatusFilter =
  | "ALL"
  | "ASSIGNED"
  | "UNASSIGNED"
  | "INACTIVE";


export type UserDirectoryFilters = {
  status:
    DirectoryStatusFilter;

  roleCode:
    string;

  uptScopeId:
    string;

  ultgScopeId:
    string;

  giScopeId:
    string;
};


type RoleOption = {
  role_code:
    string;

  role_name:
    string;
};


type Props = {
  value:
    UserDirectoryFilters;

  onApply:
    (
      filters:
        UserDirectoryFilters,
    ) => void;

  roles:
    RoleOption[];

  scopes:
    AdminDirectoryScopeHierarchyNode[];
};


export function UserDirectoryFilterModal({
  value,
  onApply,
  roles,
  scopes,
}: Props) {
  const [
    open,
    setOpen,
  ] =
    useState(
      false,
    );

  const [
    draft,
    setDraft,
  ] =
    useState<UserDirectoryFilters>(
      value,
    );

  const uptOptions =
    useMemo(
      () =>
        scopes.filter(
          (
            scope,
          ) =>
            scope.scope_level ===
            "UPT",
        ),
      [
        scopes,
      ],
    );

  const ultgOptions =
    useMemo(
      () =>
        scopes.filter(
          (
            scope,
          ) =>
            scope.scope_level ===
              "ULTG" &&
            (
              !draft.uptScopeId ||
              scope.upt_functloc_id ===
                draft.uptScopeId
            ),
        ),
      [
        scopes,
        draft.uptScopeId,
      ],
    );

  const giOptions =
    useMemo(
      () =>
        scopes.filter(
          (
            scope,
          ) => {
            if (
              scope.scope_level !==
              "GI"
            ) {
              return false;
            }

            if (
              draft.ultgScopeId
            ) {
              return (
                scope.ultg_functloc_id ===
                draft.ultgScopeId
              );
            }

            if (
              draft.uptScopeId
            ) {
              return (
                scope.upt_functloc_id ===
                draft.uptScopeId
              );
            }

            return true;
          },
        ),
      [
        scopes,
        draft.uptScopeId,
        draft.ultgScopeId,
      ],
    );

  const activeFilterCount =
    [
      value.status !==
        "ALL",

      Boolean(
        value.roleCode,
      ),

      Boolean(
        value.uptScopeId,
      ),

      Boolean(
        value.ultgScopeId,
      ),

      Boolean(
        value.giScopeId,
      ),
    ].filter(
      Boolean,
    ).length;

  function resetDraft() {
    setDraft({
      status:
        "ALL",

      roleCode:
        "",

      uptScopeId:
        "",

      ultgScopeId:
        "",

      giScopeId:
        "",
    });
  }

  function apply() {
    onApply(
      draft,
    );

    setOpen(
      false,
    );
  }

  return (
    <Dialog
      open={
        open
      }
      onOpenChange={
        setOpen
      }
      size="md"
      title="Filter User Directory"
      description="Filter user berdasarkan status, role, dan operational scope UPT → ULTG → GI."
      trigger={
        <button
          type="button"
          className="og-admin-directory-filter-trigger"
          data-active={
            activeFilterCount >
            0 ||
            undefined
          }
          onClick={() => {
            setDraft(
              value,
            );
          }}
        >
          <Filter
            size={15}
            strokeWidth={1.9}
          />

          Filter

          {activeFilterCount >
          0 ? (
            <span className="og-admin-directory-filter-count">
              {
                activeFilterCount
              }
            </span>
          ) : null}
        </button>
      }
      footer={
        <div className="og-admin-directory-filter-footer">
          <Button
            variant="ghost"
            size="sm"
            leftIcon={
              <RotateCcw
                size={14}
              />
            }
            onClick={
              resetDraft
            }
          >
            Reset
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={
              apply
            }
          >
            Apply Filters
          </Button>
        </div>
      }
    >
      <div className="og-admin-directory-filter-form">
        <div className="og-admin-directory-filter-field">
          <label htmlFor="directory-filter-status">
            Directory Status
          </label>

          <select
            id="directory-filter-status"
            value={
              draft.status
            }
            onChange={(
              event,
            ) => {
              setDraft(
                (
                  current,
                ) => ({
                  ...current,

                  status:
                    event.target.value as DirectoryStatusFilter,
                }),
              );
            }}
          >
            <option value="ALL">
              All Users
            </option>

            <option value="ASSIGNED">
              Assigned
            </option>

            <option value="UNASSIGNED">
              Unassigned / Pending
            </option>

            <option value="INACTIVE">
              Inactive
            </option>
          </select>
        </div>

        <div className="og-admin-directory-filter-field">
          <label htmlFor="directory-filter-role">
            Role
          </label>

          <select
            id="directory-filter-role"
            value={
              draft.roleCode
            }
            onChange={(
              event,
            ) => {
              setDraft(
                (
                  current,
                ) => ({
                  ...current,

                  roleCode:
                    event.target.value,
                }),
              );
            }}
          >
            <option value="">
              All Roles
            </option>

            {roles.map(
              (
                role,
              ) => (
                <option
                  key={
                    role.role_code
                  }
                  value={
                    role.role_code
                  }
                >
                  {
                    role.role_name
                  }
                </option>
              ),
            )}
          </select>
        </div>

        <div className="og-admin-directory-filter-divider">
          Operational Scope
        </div>

        <div className="og-admin-directory-filter-field">
          <label htmlFor="directory-filter-upt">
            UPT
          </label>

          <select
            id="directory-filter-upt"
            value={
              draft.uptScopeId
            }
            onChange={(
              event,
            ) => {
              const value =
                event.target.value;

              setDraft(
                (
                  current,
                ) => ({
                  ...current,

                  uptScopeId:
                    value,

                  ultgScopeId:
                    "",

                  giScopeId:
                    "",
                }),
              );
            }}
          >
            <option value="">
              All UPT
            </option>

            {uptOptions.map(
              (
                scope,
              ) => (
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
          </select>
        </div>

        <div className="og-admin-directory-filter-field">
          <label htmlFor="directory-filter-ultg">
            ULTG
          </label>

          <select
            id="directory-filter-ultg"
            value={
              draft.ultgScopeId
            }
            onChange={(
              event,
            ) => {
              const value =
                event.target.value;

              setDraft(
                (
                  current,
                ) => ({
                  ...current,

                  ultgScopeId:
                    value,

                  giScopeId:
                    "",
                }),
              );
            }}
          >
            <option value="">
              All ULTG
            </option>

            {ultgOptions.map(
              (
                scope,
              ) => (
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
          </select>
        </div>

        <div className="og-admin-directory-filter-field">
          <label htmlFor="directory-filter-gi">
            GI
          </label>

          <select
            id="directory-filter-gi"
            value={
              draft.giScopeId
            }
            onChange={(
              event,
            ) => {
              setDraft(
                (
                  current,
                ) => ({
                  ...current,

                  giScopeId:
                    event.target.value,
                }),
              );
            }}
          >
            <option value="">
              All GI
            </option>

            {giOptions.map(
              (
                scope,
              ) => (
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
          </select>
        </div>
      </div>
    </Dialog>
  );
}