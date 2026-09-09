"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  buildPlatformShellNavigation,
  hasActiveRoute,
  type PlatformShellModuleAccess,
} from "./shell-model";

export type UsePlatformShellControllerInput = {
  pathname: string;
  moduleAccess: readonly PlatformShellModuleAccess[];
};

export function usePlatformShellController({
  pathname,
  moduleAccess,
}: UsePlatformShellControllerInput) {
  const [
    sidebarCollapsed,
    setSidebarCollapsed,
  ] = useState(false);

  const [
    mobileOpen,
    setMobileOpen,
  ] = useState(false);

  const [
    administrationManualOpen,
    setAdministrationManualOpen,
  ] = useState(false);

  const navigation =
    useMemo(
      () =>
        buildPlatformShellNavigation(
          moduleAccess,
        ),
      [moduleAccess],
    );

  const administrationActive =
    useMemo(
      () =>
        hasActiveRoute(
          pathname,
          navigation.administration,
        ),
      [
        pathname,
        navigation.administration,
      ],
    );

  const administrationOpen =
    administrationManualOpen ||
    administrationActive;

  function toggleSidebar() {
    setSidebarCollapsed(
      (value) => !value,
    );
  }

  function openMobile() {
    setMobileOpen(true);
  }

  function closeMobile() {
    setMobileOpen(false);
  }

  function toggleAdministration() {
    setAdministrationManualOpen(
      (value) => !value,
    );
  }

  return {
    navigation,

    sidebarCollapsed,
    setSidebarCollapsed,
    toggleSidebar,

    mobileOpen,
    setMobileOpen,
    openMobile,
    closeMobile,

    administrationActive,
    administrationOpen,
    toggleAdministration,
  };
}