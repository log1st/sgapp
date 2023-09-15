import { z } from "zod";
import { AppRouterInput, AppRouterOutput } from "../../apiRouter";

export const getRoomRequest = z.object({
  slug: z.coerce.string(),
});

export type GetRoomInput = AppRouterInput["rooms"]["get"];
export type GetRoomOutput = AppRouterOutput["rooms"]["get"];
