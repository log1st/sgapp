"use server";

import { MediaSrcByIdInput } from "@/api";
import { makeRequest } from "@/api/client";
import { getApiCaller } from "@/session/getApiCaller";

export const getMediaUrlById = (input: MediaSrcByIdInput) =>
  makeRequest(() => getApiCaller().media.srcById(input));
