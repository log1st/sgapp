import { z } from "zod";
import { AppRouterInput, AppRouterOutput } from "../../apiRouter";
import { getListingRequest } from "../listing/ListingRequest";

export const jeopardyPacksListRequest = getListingRequest({
  filter: z
    .object({
      query: z.string().optional().default(""),
      creator: z.array(z.coerce.number()).optional().default([]),
    })
    .optional()
    .default({}),
});

export type JeopardyPacksListRequest = z.infer<typeof jeopardyPacksListRequest>;

export type JeopardyPacksListInput = AppRouterInput["jeopardy"]["pack"]["list"];
export type JeopardyPacksListOutput =
  AppRouterOutput["jeopardy"]["pack"]["list"];

export { type JeopardyConfig } from "@prisma/client";

export { type JeopardyPack } from "@prisma/client";

export type ListedJeopardyPack = NonNullable<
  JeopardyPacksListOutput["data"]
>[number];
