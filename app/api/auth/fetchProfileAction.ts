"use server";

import { makeRequest } from "@/api/client";
import { getApiCaller } from "@/session/getApiCaller";

export const fetchProfileAction = async () =>
  makeRequest(getApiCaller().auth.profile);
