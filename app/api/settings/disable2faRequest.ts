"use server";

import { revalidatePath } from "next/cache";
import { Disable2faInput, makeRequest } from "@/api";
import { getApiCaller } from "@/session/getApiCaller";

export const disable2faRequest = async (payload: Disable2faInput) => {
  const response = await makeRequest(() =>
    getApiCaller().settings.disable2fa(payload),
  );

  if (response.success) {
    revalidatePath("/");
  }

  return response;
};
