"use server";

import { revalidatePath } from "next/cache";
import { makeRequest } from "@/api/client";
import { getApiCaller } from "@/session/getApiCaller";
import { Disable2faInput } from "@/api";

export const disable2faRequest = async (payload: Disable2faInput) => {
  const response = await makeRequest(() =>
    getApiCaller().settings.disable2fa(payload),
  );

  if (response.success) {
    revalidatePath("/");
  }

  return response;
};
