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
  initialTab:
    UserDetailTab;

  assignmentCount:
    number;

  profileContent:
    ReactNode;

  accessContent:
    ReactNode;

  statusContent:
    ReactNode;
};

type TabButtonProps = {
  active:
    boolean;

  label:
    string;

  count?:
    number;

  icon:
    ReactNode;

  onClick:
    () => void;
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
      className="og-user-detail-tab"
      data-active={
        active ||
        undefined
      }
      aria-pressed={
        active
      }
      onClick={
        onClick
      }
    >
      <span className="og-user-detail-tab-icon">
        {icon}
      </span>

      <span>
        {label}
      </span>

      {typeof count ===
      "number" ? (
        <span className="og-user-detail-tab-count">
          {count}
        </span>
      ) : null}
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
      initialTab,
    );

  function changeTab(
    nextTab:
      UserDetailTab,
  ) {
    setActiveTab(
      nextTab,
    );

    const url =
      new URL(
        window.location.href,
      );

    url.searchParams.set(
      "tab",
      nextTab,
    );

    url.searchParams.delete(
      "message",
    );

    url.searchParams.delete(
      "status",
    );

    window.history.replaceState(
      window.history.state,
      "",
      url.toString(),
    );
  }

  return (
    <>
      <div className="og-user-detail-tabs-bar">
        <div
          className="og-user-detail-tabs"
          role="tablist"
          aria-label="User detail sections"
        >
          <TabButton
            active={
              activeTab ===
              "profile"
            }
            label="Profile"
            icon={
              <UserRound
                size={15}
                strokeWidth={1.9}
              />
            }
            onClick={() =>
              changeTab(
                "profile",
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
                size={15}
                strokeWidth={1.9}
              />
            }
            onClick={() =>
              changeTab(
                "access",
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
                size={15}
                strokeWidth={1.9}
              />
            }
            onClick={() =>
              changeTab(
                "status",
              )
            }
          />
        </div>
      </div>

      <div className="og-user-detail-tab-content">
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