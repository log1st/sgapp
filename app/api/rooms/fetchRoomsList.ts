"use server";

import { makeRequest, RoomsListInput } from "@/api";
import { getApiCaller } from "@/session/getApiCaller";

export const fetchRoomsList = (input: RoomsListInput) =>
  makeRequest(() => getApiCaller().rooms.list(input));
