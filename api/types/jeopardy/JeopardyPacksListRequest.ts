import { z } from "zod";
import { AppRouterInput, AppRouterOutput } from "../../apiRouter";
import { getListingRequest } from "../listing/ListingRequest";

export const jeopardyPacksListRequest = getListingRequest({
  query: z.string().optional(),
});

export type JeopardyPacksListRequest = z.infer<typeof jeopardyPacksListRequest>;

export type JeopardyPacksListInput = AppRouterInput["jeopardy"]["packsList"];
export type JeopardyPacksListOutput = AppRouterOutput["jeopardy"]["packsList"];

export { type JeopardyConfig } from "@prisma/client";

export { type JeopardyPack } from "@prisma/client";

export type ListedJeopardyPack = NonNullable<
  JeopardyPacksListOutput["data"]
>[number];
