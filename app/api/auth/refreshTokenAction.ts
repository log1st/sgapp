"use server";

import { ApiResponse, makeRequest } from "@/api/client";
import { getApiCaller } from "@/session/getApiCaller";
import {
  dropAccessToken,
  dropRefreshToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "@/session/getAccessToken";

// @TODO fix drop tokens flow in server components
export const refreshTokenAction = async (): Promise<ApiResponse<true>> => {
  const response = await makeRequest(
    getApiCaller(getRefreshToken()).auth.refreshToken,
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
  dropAccessToken();
  dropRefreshToken();

  return response;
};
