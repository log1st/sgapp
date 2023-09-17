import { z } from "zod";
import { AppRouterInput, AppRouterOutput } from "../../apiRouter";

export const submit2faRequest = z.object({
  code: z.string().min(6).max(6),
});

export type Submit2faInput = AppRouterInput["auth"]["submit2fa"];
export type Submit2faOutput = AppRouterOutput["auth"]["submit2fa"];
