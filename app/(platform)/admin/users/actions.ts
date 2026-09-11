"use server";

import {
  revalidatePath,
} from "next/cache";

import {
  forceDeleteV2User,
} from "@/services/admin-user-force-delete-service";


export async function forceDeleteV2UserAction(
  formData:
    FormData
) {
  const userId =
    String(
      formData.get(
        "user_id"
      ) ?? ""
    ).trim();

  if (!userId) {
    throw new Error(
      "User ID tidak tersedia."
    );
  }

  await forceDeleteV2User(
    userId
  );

  revalidatePath(
    "/admin/users"
  );
}
