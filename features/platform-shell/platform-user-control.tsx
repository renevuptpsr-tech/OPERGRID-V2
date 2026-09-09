"use client";

import {
  useRouter,
} from "next/navigation";

import {
  UserControl,
} from "@/components/design-system/navigation";

import {
  createClient,
} from "@/lib/supabase/client";

export type PlatformUserControlProps = {
  displayName: string;
  roleLabel: string;
};

export function PlatformUserControl({
  displayName,
  roleLabel,
}: PlatformUserControlProps) {
  const router =
    useRouter();

  async function handleSignOut() {
    const supabase =
      createClient();

    await supabase.auth.signOut();

    router.replace("/login");
    router.refresh();
  }

  function handleProfile() {
    router.push("/profile");
  }

  return (
    <UserControl
      displayName={displayName}
      secondaryLabel={roleLabel}
      onProfile={handleProfile}
      onSignOut={() => {
        void handleSignOut();
      }}
      profileLabel="Profile Saya"
      signOutLabel="Logout"
    />
  );
}