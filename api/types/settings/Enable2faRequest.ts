import { z } from "zod";
import { AppRouterInput, AppRouterOutput } from "@/api/apiRouter";

export const enable2faRequest = z.object({
  code: z.string().min(6).max(6),
  enabled: z.literal(true),
});

export type Enable2faInput = AppRouterInput["settings"]["enable2fa"];
export type Enable2faOutput = AppRouterOutput["settings"]["enable2fa"];
