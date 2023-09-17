"use server";

import { makeRequest } from "@/api/client";
import { getApiCaller } from "@/session/getApiCaller";
import {
  dropTotpToken,
  getTotpToken,
  setAccessToken,
  setRefreshToken,
} from "@/session/getAccessToken";
import { Submit2faInput } from "@/api";

export const submit2faAction = async (payload: Submit2faInput) => {
  const response = await makeRequest(() =>
    getApiCaller(getTotpToken()).auth.submit2fa(payload),
  );

  if (response.success) {
    dropTotpToken();
    setAccessToken(
      response.data.accessToken.token,
      response.data.accessToken.expiresIn,
    );
    setRefreshToken(
      response.data.refreshToken.token,
      response.data.refreshToken.expiresIn,
    );

    return {
      ...response,
      data: true,
    };
  }

  return response;
};
