import {
  redirect,
} from "next/navigation";

import {
  getCurrentUserContext,
} from "@/features/auth/get-current-user-context";

import {
  buildPlatformShellContext,
  PlatformShellView,
} from "@/features/platform-shell";

export default async function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const context =
    await getCurrentUserContext();

  if (!context) {
    redirect("/login");
  }

  const shell =
    buildPlatformShellContext(
      context,
    );

  return (
    <PlatformShellView
      identity={shell.identity}
      moduleAccess={
        shell.moduleAccess
      }
    >
      {children}
    </PlatformShellView>
  );
}