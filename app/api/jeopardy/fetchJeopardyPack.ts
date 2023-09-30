import { JeopardyPackInput } from "@/api";
import { makeRequest } from "@/api/client";
import { getApiCaller } from "@/session/getApiCaller";
import { appRedirect } from "@/utils";

export const fetchJeopardyPack = async (input: JeopardyPackInput) => {
  const response = await makeRequest(() =>
    getApiCaller().jeopardy.pack.get(input),
  );

  if (!response.success) {
    appRedirect("/jeopardy/packs");
  }

  return response;
};
