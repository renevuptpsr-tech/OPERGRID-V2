"use client";

import {
  ChevronDown,
  LogOut,
  UserRound,
} from "lucide-react";

import Link from "next/link";

import {
  useRef,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  createClient,
} from "@/lib/supabase/client";


type UserMenuProps = {
  fullName: string;
  roleName: string;
};


function initials(
  value: string
) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(
      (part) =>
        part
          .charAt(0)
          .toUpperCase()
    )
    .join("");
}


export function UserMenu({
  fullName,
  roleName,
}: UserMenuProps) {
  const router =
    useRouter();

  const detailsRef =
    useRef<HTMLDetailsElement>(
      null
    );


  async function handleLogout() {
    const supabase =
      createClient();

    await supabase.auth.signOut();

    router.replace("/login");
    router.refresh();
  }


  return (
    <details
      ref={detailsRef}
      className="group relative"
    >

      <summary className="og-control flex h-10 cursor-pointer list-none items-center rounded-[10px] px-2.5 [&::-webkit-details-marker]:hidden">

        <div
          className="flex h-7 w-7 items-center justify-center rounded-[8px] text-[9px] font-semibold"
          style={{
            color:
              "var(--og-cyan-strong)",
            background:
              "var(--og-cyan-soft)",
          }}
        >
          {initials(fullName)}
        </div>


        <div className="ml-2.5 hidden min-w-0 text-left sm:block">

          <div className="og-text max-w-[145px] truncate text-[11px] font-semibold">
            {fullName}
          </div>

          <div className="og-muted mt-0.5 max-w-[145px] truncate text-[9px]">
            {roleName}
          </div>

        </div>


        <ChevronDown
          size={13}
          className="og-muted ml-2 hidden transition-transform duration-150 group-open:rotate-180 sm:block"
        />

      </summary>


      <div className="og-popover absolute right-0 top-[48px] z-[100] w-[225px] rounded-[12px] p-2">

        <div className="px-2.5 pb-2 pt-1">

          <div className="og-text text-[12px] font-semibold">
            {fullName}
          </div>

          <div className="og-muted mt-0.5 text-[10px]">
            {roleName}
          </div>

        </div>


        <div
          className="my-1 h-px"
          style={{
            background:
              "var(--og-border-soft)",
          }}
        />


        <Link
          href="/profile"
          onClick={() =>
            detailsRef.current
              ?.removeAttribute(
                "open"
              )
          }
          className="og-secondary flex h-10 items-center rounded-[9px] px-2.5 text-[11px] font-medium"
        >
          <UserRound
            size={15}
            className="mr-2.5"
          />

          Profile Saya
        </Link>


        <button
          type="button"
          onClick={
            handleLogout
          }
          className="flex h-10 w-full items-center rounded-[9px] px-2.5 text-left text-[11px] font-medium"
          style={{
            color:
              "var(--og-danger)",
          }}
        >
          <LogOut
            size={15}
            className="mr-2.5"
          />

          Logout
        </button>

      </div>

    </details>
  );
}