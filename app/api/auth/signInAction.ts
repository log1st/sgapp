"use server";

import { ApiResponse, AuthSignInInput, makeRequest } from "@/api";
import { getApiCaller } from "@/session/getApiCaller";
import { setAccessToken, setRefreshToken } from "@/session/getAccessToken";

export const signInAction = async (
  payload: AuthSignInInput,
): Promise<ApiResponse<true>> => {
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

  return response;
};
