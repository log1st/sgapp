"use server";

import { Route } from "next";
import { JeopardyPacksListInput } from "@/api";
import { appRedirect, newSearchParams } from "@/utils";

export const nanvigateToJeopardyPacksList = (
  input?: JeopardyPacksListInput,
) => {
  appRedirect(
    `/jeopardy/packs/${
      input ? `?${newSearchParams(input).toString()}` : ""
    }` as Route,
  );
};
