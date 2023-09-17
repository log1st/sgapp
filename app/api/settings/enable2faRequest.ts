"use server";

import { revalidatePath } from "next/cache";
import { makeRequest } from "@/api/client";
import { getApiCaller } from "@/session/getApiCaller";
import { Enable2faInput } from "@/api";

export const enable2faRequest = async (payload: Enable2faInput) => {
  const response = await makeRequest(() =>
    getApiCaller().settings.enable2fa(payload),
  );

  if (response.success) {
    revalidatePath("/");
  }

  return response;
};
