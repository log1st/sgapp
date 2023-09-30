"use server";

import { Route } from "next";
import { makeRequest } from "@/api/client";
import { getApiCaller } from "@/session/getApiCaller";
import { appRedirect } from "@/utils";
import { CreateJeopardyPackInput } from "@/api";

export const createJeopardyPackAction = async (
  input: CreateJeopardyPackInput,
) => {
  const response = await makeRequest(() =>
    getApiCaller().jeopardy.pack.create(input),
  );

  if (response.success) {
    appRedirect(`/jeopardy/packs/${response.data.id}` as Route);
  }

  return response;
};
