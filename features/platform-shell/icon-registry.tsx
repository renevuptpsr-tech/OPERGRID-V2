import {
  Activity,
  BookOpenText,
  Building2,
  CalendarClock,
  LayoutDashboard,
  ShieldCheck,
  ThermometerSun,
  Users,
  Wrench,
  Zap,
} from "lucide-react";

export type ModuleIconProps = {
  moduleCode: string;
  size?: number;
  strokeWidth?: number;
};

export function ModuleIcon({
  moduleCode,
  size = 18,
  strokeWidth = 1.8,
}: ModuleIconProps) {
  switch (moduleCode) {
    case "DASHBOARD":
      return (
        <LayoutDashboard
          size={size}
          strokeWidth={strokeWidth}
          aria-hidden="true"
        />
      );

    case "LOGSHEET":
      return (
        <BookOpenText
          size={size}
          strokeWidth={strokeWidth}
          aria-hidden="true"
        />
      );

    case "SHIFT":
      return (
        <CalendarClock
          size={size}
          strokeWidth={strokeWidth}
          aria-hidden="true"
        />
      );

    case "MUTASI_JURNAL":
      return (
        <Activity
          size={size}
          strokeWidth={strokeWidth}
          aria-hidden="true"
        />
      );

    case "MANUVER":
      return (
        <Wrench
          size={size}
          strokeWidth={strokeWidth}
          aria-hidden="true"
        />
      );

    case "GANGGUAN_20KV":
      return (
        <Zap
          size={size}
          strokeWidth={strokeWidth}
          aria-hidden="true"
        />
      );

    case "THERMOVISI":
      return (
        <ThermometerSun
          size={size}
          strokeWidth={strokeWidth}
          aria-hidden="true"
        />
      );

    case "USER_MANAGEMENT":
      return (
        <Users
          size={size}
          strokeWidth={strokeWidth}
          aria-hidden="true"
        />
      );

    case "ROLE_MANAGEMENT":
      return (
        <ShieldCheck
          size={size}
          strokeWidth={strokeWidth}
          aria-hidden="true"
        />
      );

    case "UNIT_MANAGEMENT":
      return (
        <Building2
          size={size}
          strokeWidth={strokeWidth}
          aria-hidden="true"
        />
      );

    default:
      return (
        <Activity
          size={size}
          strokeWidth={strokeWidth}
          aria-hidden="true"
        />
      );
  }
}