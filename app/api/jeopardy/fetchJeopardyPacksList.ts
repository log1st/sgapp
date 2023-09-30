"use server";

import { makeRequest } from "@/api/client";
import { getApiCaller } from "@/session/getApiCaller";
import { JeopardyPacksListInput } from "@/api";

export const fetchJeopardyPacksList = (payload: JeopardyPacksListInput) =>
  makeRequest(() => getApiCaller().jeopardy.pack.list(payload));
