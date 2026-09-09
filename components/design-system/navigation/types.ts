import type { ReactNode } from "react";

export type NavigationBadgeTone =
  | "neutral"
  | "info"
  | "success"
  | "warning"
  | "danger";

export type NavigationBadge = {
  label: string;
  tone?: NavigationBadgeTone;
};

export type NavigationItem = {
  id: string;
  label: string;
  href?: string;
  icon?: ReactNode;
  badge?: NavigationBadge;
  disabled?: boolean;
  description?: string;
};

export type NavigationGroup = {
  id: string;
  label?: string;
  description?: string;
  items: readonly NavigationItem[];
};

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export type PageHeaderMetadata = {
  label: string;
  value: ReactNode;
};