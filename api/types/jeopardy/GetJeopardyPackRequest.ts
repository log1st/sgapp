import { z } from "zod";
import { AppRouterInput, AppRouterOutput } from "@/api/apiRouter";

export const getJeopardyPackRequest = z.object({
  id: z.coerce.number().int(),
});

export type JeopardyPackInput = AppRouterInput["jeopardy"]["pack"]["get"];
export type JeopardyPackOutput = AppRouterOutput["jeopardy"]["pack"]["get"];
