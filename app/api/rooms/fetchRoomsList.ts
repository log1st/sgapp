"use server";

import { makeRequest } from "@/api/client";
import { getApiCaller } from "@/session/getApiCaller";
import { RoomsListInput } from "@/api";

export const fetchRoomsList = (input: RoomsListInput) =>
  makeRequest(() => getApiCaller().rooms.list(input));
