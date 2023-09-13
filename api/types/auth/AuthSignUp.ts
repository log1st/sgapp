import { z } from "zod";
import { AppRouterInput, AppRouterOutput } from "@/api/apiRouter";

export const authSignUpInput = z
  .object({
    login: z
      .string()
      .nonempty()
      .min(6)
      .regex(/^[\w-_]+$/),
    password: z.string().nonempty().min(8),
    confirmation: z.string(),
    agreement: z.literal(true),
  })
  .refine((data) => data.password === data.confirmation, {
    message: "match",
    path: ["confirmation"],
  });

export type AuthSignUpInput = AppRouterInput["auth"]["signUp"];
export type AuthSignUpOutput = AppRouterOutput["auth"]["signUp"];
