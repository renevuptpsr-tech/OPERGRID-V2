"use client";

import {
  Search,
  SlidersHorizontal,
} from "lucide-react";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  useState,
} from "react";


type UserListToolbarProps = {
  initialSearch: string;
  initialStatus: string;
  initialUserType: string;
};


export function UserListToolbar({
  initialSearch,
  initialStatus,
  initialUserType,
}: UserListToolbarProps) {
  const router =
    useRouter();

  const pathname =
    usePathname();

  const searchParams =
    useSearchParams();

  const [
    search,
    setSearch,
  ] = useState(
    initialSearch
  );


  function updateParams(
    updates: Record<
      string,
      string
    >
  ) {
    const params =
      new URLSearchParams(
        searchParams.toString()
      );

    for (
      const [
        key,
        value,
      ] of Object.entries(
        updates
      )
    ) {
      if (
        !value ||
        value === "ALL"
      ) {
        params.delete(
          key
        );
      } else {
        params.set(
          key,
          value
        );
      }
    }

    const query =
      params.toString();

    router.push(
      query
        ? `${pathname}?${query}`
        : pathname
    );
  }


  function handleSubmit(
    event:
      React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    updateParams({
      search:
        search.trim(),
    });
  }


  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center">

      <form
        onSubmit={
          handleSubmit
        }
        className="relative flex-1"
      >
        <Search
          size={15}
          strokeWidth={1.8}
          className="og-muted absolute left-3 top-1/2 -translate-y-1/2"
        />

        <input
          type="search"
          value={search}
          onChange={(
            event
          ) =>
            setSearch(
              event.target.value
            )
          }
          placeholder="Cari nama, email, employee ID..."
          className="og-ui-input h-10 w-full rounded-[10px] pl-9 pr-3 text-[11px] outline-none"
        />
      </form>


      <div className="flex flex-wrap items-center gap-2">

        <div className="og-muted hidden items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.08em] xl:flex">
          <SlidersHorizontal
            size={13}
          />

          Filter
        </div>


        <select
          value={
            initialStatus
          }
          onChange={(
            event
          ) =>
            updateParams({
              status:
                event
                  .target
                  .value,
            })
          }
          className="og-ui-select h-10 min-w-[135px] rounded-[10px] px-3 text-[10px] outline-none"
        >
          <option value="ALL">
            Semua Status
          </option>

          <option value="ACTIVE">
            Active
          </option>

          <option value="INACTIVE">
            Inactive
          </option>

          <option value="SUSPENDED">
            Suspended
          </option>

          <option value="PENDING">
            Pending
          </option>
        </select>


        <select
          value={
            initialUserType
          }
          onChange={(
            event
          ) =>
            updateParams({
              type:
                event
                  .target
                  .value,
            })
          }
          className="og-ui-select h-10 min-w-[145px] rounded-[10px] px-3 text-[10px] outline-none"
        >
          <option value="ALL">
            Semua User Type
          </option>

          <option value="EMPLOYEE">
            Employee
          </option>

          <option value="CONTRACTOR">
            Contractor
          </option>

          <option value="EXTERNAL">
            External
          </option>

          <option value="SYSTEM">
            System
          </option>
        </select>

      </div>
    </div>
  );
}