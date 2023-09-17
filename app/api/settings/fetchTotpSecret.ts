"use server";

import { makeRequest } from "@/api/client";
import { getApiCaller } from "@/session/getApiCaller";

export const fetchTotpSecret = () =>
  makeRequest(getApiCaller().settings.totpSecret);
