"use server";

import { revalidatePath } from "next/cache";
import { makeRequest } from "@/api";
import { getApiCaller } from "@/session/getApiCaller";

export const deleteCurrentAvatarAction = async () => {
  const response = await makeRequest(() =>
    getApiCaller().settings.changeAvatar({
      file: null,
    }),
  );

  if (response.success) {
    revalidatePath("/");
  }

  return response;
};
