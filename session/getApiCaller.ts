import { getAccessToken } from "./getAccessToken";
import { createApiCaller } from "@/api";

export const getApiCaller = (accessToken = getAccessToken()) =>
  createApiCaller({
    accessToken,
  });
