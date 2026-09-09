export {
  buildPlatformShellNavigation,
  hasActiveRoute,
  isNavigableModule,
  isRouteActive,
  type PlatformShellIdentity,
  type PlatformShellModuleAccess,
  type PlatformShellNavigationModel,
} from "./shell-model";

export {
  buildPlatformShellContext,
  resolvePlatformShellIdentity,
  resolvePlatformShellModuleAccess,
  type PlatformShellContextModel,
} from "./context-adapter";

export {
  resolvePlatformPageInfo,
  type PlatformPageInfo,
} from "./page-registry";

export {
  ModuleIcon,
  type ModuleIconProps,
} from "./icon-registry";
export {
  usePlatformShellController,
  type UsePlatformShellControllerInput,
} from "./use-platform-shell-controller";

export {
  PlatformSidebarNavigation,
  type PlatformSidebarNavigationProps,
} from "./platform-sidebar-navigation";

export {
  PlatformUserControl,
  type PlatformUserControlProps,
} from "./platform-user-control";

export {
  PlatformPageHeader,
} from "./platform-page-header";

export {
  PlatformShellView,
  type PlatformShellViewProps,
} from "./platform-shell-view";