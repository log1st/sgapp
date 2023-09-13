import { z } from "zod";
import { AppRouterInput, AppRouterOutput } from "@/api/apiRouter";

export const authSignInInput = z.object({
  login: z.string().nonempty(),
  password: z.string().nonempty(),
});

export type AuthSignInInput = AppRouterInput["auth"]["signIn"];
export type AuthSignInOutput = AppRouterOutput["auth"]["signIn"];
