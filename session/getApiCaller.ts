import { getAccessToken } from "./getAccessToken";
import { createApiCaller } from "@/api/client/createApiCaller";

export const getApiCaller = (accessToken = getAccessToken()) =>
  createApiCaller({
    accessToken,
  });
