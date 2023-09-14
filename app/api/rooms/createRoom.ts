"use server";

import { Route } from "next";
import { CreateRoomInput, makeRequest } from "@/api";
import { getApiCaller } from "@/session/getApiCaller";
import { appRedirect } from "@/utils";

export const createRoom = async (payload: CreateRoomInput) => {
  const response = await makeRequest(() =>
    getApiCaller().rooms.create(payload),
  );

  if (response.success) {
    appRedirect(`/rooms/${response.data.slug}` as Route);
  }

  return response;
};
