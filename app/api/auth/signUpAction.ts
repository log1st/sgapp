"use server";

import { ApiResponse, makeRequest } from "@/api/client";
import { getApiCaller } from "@/session/getApiCaller";
import { setAccessToken, setRefreshToken } from "@/session/getAccessToken";
import { AuthSignUpInput } from "../../../api/types/auth/AuthSignUpRequest";

export const signUpAction = async (
  payload: AuthSignUpInput,
): Promise<ApiResponse<true>> => {
  const response = await makeRequest(
    () => getApiCaller().auth.signUp(payload),
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
