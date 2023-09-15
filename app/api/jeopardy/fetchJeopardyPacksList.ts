"use server";

import { JeopardyPacksListInput, makeRequest } from "@/api";
import { getApiCaller } from "@/session/getApiCaller";

export const fetchJeopardyPacksList = (payload: JeopardyPacksListInput) =>
  makeRequest(() => getApiCaller().jeopardy.packsList(payload));
