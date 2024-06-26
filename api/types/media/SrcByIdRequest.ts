import { z } from "zod";
import { AppRouterInput, AppRouterOutput } from "../../apiRouter";

export const srcByIdRequest = z.object({
  id: z.number(),
});

export type MediaSrcByIdInput = AppRouterInput["media"]["get"];
export type MediaSrcByIdOutput = AppRouterOutput["media"]["get"];
