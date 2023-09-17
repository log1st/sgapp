"use server";

import { revalidatePath } from "next/cache";
import { ApiResponse, makeRequest } from "@/api/client";
import { getApiCaller } from "@/session/getApiCaller";

export const changeAvatarAction = async (
  formData: FormData,
): Promise<ApiResponse<any>> => {
  const file = formData.get("file");

  if (!file) {
    return {
      success: false,
      error: ["common", "upload"],
      data: null,
      errors: null,
    };
  }

  const response = await makeRequest(() =>
    getApiCaller().settings.changeAvatar({
      file,
    }),
  );
  if (response.success) {
    revalidatePath("/");
  }
  return response;
};
