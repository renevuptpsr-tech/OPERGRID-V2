"use client";

import {
  KeyRound,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import type {
  ReactNode,
} from "react";

import {
  useState,
} from "react";


type UserDetailTab =
  | "profile"
  | "access"
  | "status";


type UserDetailTabsProps = {
  initialTab: UserDetailTab;
  assignmentCount: number;

  profileContent: ReactNode;
  accessContent: ReactNode;
  statusContent: ReactNode;
};


type TabButtonProps = {
  active: boolean;
  label: string;
  count?: number;
  icon: ReactNode;
  onClick: () => void;
};


function TabButton({
  active,
  label,
  count,
  icon,
  onClick,
}: TabButtonProps) {
  return (
    <button
      type="button"
      onClick={
        onClick
      }
      className={[
        "og-workflow-tab",
        active
          ? "og-workflow-tab-active"
          : "",
      ].join(" ")}
    >
      <span>
        {icon}
      </span>

      <span>
        {label}
      </span>

      {typeof count ===
        "number" && (
        <span
          className={[
            "og-workflow-tab-count",
            active
              ? "og-workflow-tab-count-active"
              : "",
          ].join(" ")}
        >
          {count}
        </span>
      )}
    </button>
  );
}


export function UserDetailTabs({
  initialTab,
  assignmentCount,
  profileContent,
  accessContent,
  statusContent,
}: UserDetailTabsProps) {
  const [
    activeTab,
    setActiveTab,
  ] =
    useState<UserDetailTab>(
      initialTab
    );


  function changeTab(
    nextTab: UserDetailTab
  ) {
    setActiveTab(
      nextTab
    );


    const url =
      new URL(
        window.location.href
      );

    url.searchParams.set(
      "tab",
      nextTab
    );

    url.searchParams.delete(
      "message"
    );

    url.searchParams.delete(
      "status"
    );


    window.history.replaceState(
      window.history.state,
      "",
      url.toString()
    );
  }


  return (
    <>

      <div className="px-5 pt-3 lg:px-6">

        <div className="og-workflow-tabs overflow-x-auto">

          <div className="flex min-w-max items-center gap-1">

            <TabButton
              active={
                activeTab ===
                "profile"
              }
              label="Profile"
              icon={
                <UserRound
                  size={14}
                  strokeWidth={1.8}
                />
              }
              onClick={() =>
                changeTab(
                  "profile"
                )
              }
            />


            <TabButton
              active={
                activeTab ===
                "access"
              }
              label="Access & Role"
              count={
                assignmentCount
              }
              icon={
                <KeyRound
                  size={14}
                  strokeWidth={1.8}
                />
              }
              onClick={() =>
                changeTab(
                  "access"
                )
              }
            />


            <TabButton
              active={
                activeTab ===
                "status"
              }
              label="Account Status"
              icon={
                <ShieldCheck
                  size={14}
                  strokeWidth={1.8}
                />
              }
              onClick={() =>
                changeTab(
                  "status"
                )
              }
            />

          </div>

        </div>

      </div>


      <div
        className="border-t px-5 lg:px-6"
        style={{
          borderColor:
            "var(--og-border-soft)",
        }}
      >

        <div
          hidden={
            activeTab !==
            "profile"
          }
        >
          {profileContent}
        </div>


        <div
          hidden={
            activeTab !==
            "access"
          }
        >
          {accessContent}
        </div>


        <div
          hidden={
            activeTab !==
            "status"
          }
        >
          {statusContent}
        </div>

      </div>

    </>
  );
}