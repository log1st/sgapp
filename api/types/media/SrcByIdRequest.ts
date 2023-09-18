import { z } from "zod";
import { AppRouterInput, AppRouterOutput } from "@/api/apiRouter";

export const srcByIdRequest = z.object({
  id: z.number(),
});

export type MediaSrcByIdInput = AppRouterInput["media"]["srcById"];
export type MediaSrcByIdOutput = AppRouterOutput["media"]["srcById"];
