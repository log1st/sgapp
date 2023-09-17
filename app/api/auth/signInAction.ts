"use server";

import { ApiResponse, makeRequest } from "@/api/client";
import { getApiCaller } from "@/session/getApiCaller";
import {
  setAccessToken,
  setRefreshToken,
  setTotpToken,
} from "@/session/getAccessToken";
import { appRedirect } from "@/utils";
import { AuthSignInInput, AuthToken } from "@/api";

export const handleSignInRedirect = (
  payload: ApiResponse<any, { totp: boolean }>,
) => {
  if (payload.meta?.totp) {
    appRedirect("/auth/2fa");
  }
};

export const signInAction = async (
  payload: AuthSignInInput,
): Promise<ApiResponse<true, { totp: boolean }>> => {
  const response = await makeRequest(
    () => getApiCaller().auth.signIn(payload),
    false,
  );

  if (response.success) {
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

  const totpError = response.errors?.find((error) => error[0] === "totp");

  if (totpError) {
    if (totpError[2] && totpError[2].params) {
      const { token, expiresIn } = totpError[2].params as AuthToken;
      setTotpToken(token, expiresIn);

      return {
        success: false,
        data: null,
        error: null,
        errors: [],
        meta: {
          totp: true,
        },
      };
    }
  }

  return response;
};
