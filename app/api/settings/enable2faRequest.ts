"use server";

import { revalidatePath } from "next/cache";
import { Enable2faInput, makeRequest } from "@/api";
import { getApiCaller } from "@/session/getApiCaller";

export const enable2faRequest = async (payload: Enable2faInput) => {
  const response = await makeRequest(() =>
    getApiCaller().settings.enable2fa(payload),
  );

  if (response.success) {
    revalidatePath("/");
  }

  return response;
};
