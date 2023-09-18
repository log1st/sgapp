import { z } from "zod";
import { getListingRequest } from "../listing/ListingRequest";
import { AppRouterInput, AppRouterOutput } from "../../apiRouter";

export const usersListRequest = getListingRequest({
  filter: z
    .object({
      query: z.string().optional().default(""),
    })
    .optional()
    .default({}),
});

export type UsersListInput = AppRouterInput["users"]["list"];
export type UsersListOutput = AppRouterOutput["users"]["list"];
