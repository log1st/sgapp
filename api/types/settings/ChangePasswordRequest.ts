import { z } from "zod";
import { AppRouterInput, AppRouterOutput } from "../../apiRouter";

export const changePasswordRequest = z
  .object({
    current: z.string().nonempty(),
    password: z.string().nonempty().min(8),
    confirmation: z.string(),
  })
  .refine((data) => data.password === data.confirmation, {
    message: "match",
    path: ["confirmation"],
  });

export type ChangePasswordInput = AppRouterInput["settings"]["changePassword"];
export type ChangePasswordOutput =
  AppRouterOutput["settings"]["changePassword"];
