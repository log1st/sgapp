"use server";

import { makeRequest } from "@/api";
import { getApiCaller } from "@/session/getApiCaller";
import {
  dropAccessToken,
  dropRefreshToken,
  getRefreshToken,
} from "@/session/getAccessToken";

export const signOutAction = async () => {
  await makeRequest(getApiCaller(getRefreshToken()).auth.signOut);
  dropAccessToken();
  dropRefreshToken();
};
