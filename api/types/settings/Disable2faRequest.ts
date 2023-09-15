import { z } from "zod";
import { AppRouterInput, AppRouterOutput } from "@/api/apiRouter";

export const disable2faRequest = z.object({
  code: z.string().min(6).max(6),
  enabled: z.literal(false),
});

export type Disable2faInput = AppRouterInput["settings"]["disable2fa"];
export type Disable2faOutput = AppRouterOutput["settings"]["disable2fa"];
