import { getAccessToken } from "./getAccessToken";
import { createApiCaller } from "@/api/client";

export const getApiCaller = (accessToken = getAccessToken()) =>
  createApiCaller({
    token: accessToken,
  });
