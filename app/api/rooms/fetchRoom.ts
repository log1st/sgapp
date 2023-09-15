"use server";

import { GetRoomInput, GetRoomOutput, makeRequest } from "@/api";
import { getApiCaller } from "@/session/getApiCaller";
import { appRedirect } from "@/utils";

export const fetchRoom = async (
  input: GetRoomInput,
): Promise<GetRoomOutput> => {
  const response = await makeRequest(() => getApiCaller().rooms.get(input));

  if (!response.success || !response.data) {
    appRedirect("/rooms");
  }

  return response.data!;
};
