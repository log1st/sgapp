"use server";

import { Route } from "next";
import { RoomsListInput } from "@/api";
import { appRedirect, newSearchParams } from "@/utils";

export const navigateToRoomsList = (input?: RoomsListInput) => {
  appRedirect(
    `/rooms/${input ? `?${newSearchParams(input).toString()}` : ""}` as Route,
  );
};
