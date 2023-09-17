"use server";

import { makeRequest } from "@/api/client";
import { getApiCaller } from "@/session/getApiCaller";
import { appRedirect } from "@/utils";
import { GetRoomInput, GetRoomOutput } from "@/api";

export const fetchRoom = async (
  input: GetRoomInput,
): Promise<GetRoomOutput> => {
  const response = await makeRequest(() => getApiCaller().rooms.get(input));

  if (!response.success || !response.data) {
    appRedirect("/rooms");
  }

  return response.data!;
};
