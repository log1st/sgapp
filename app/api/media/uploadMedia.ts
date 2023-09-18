"use server";

import { makeRequest } from "@/api/client";
import { getApiCaller } from "@/session/getApiCaller";

export const uploadMedia = (input: FormData) =>
  makeRequest(() =>
    getApiCaller().media.upload({
      file: input.get("file"),
    }),
  );
