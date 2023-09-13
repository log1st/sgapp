"use server";

import { makeRequest } from "@/api";
import { getApiCaller } from "@/session/getApiCaller";

export const fetchProfileAction = async () =>
  makeRequest(getApiCaller().auth.profile);
