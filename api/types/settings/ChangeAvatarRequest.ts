import { z } from "zod";
import { AppRouterInput, AppRouterOutput } from "../../apiRouter";

export const changeAvatarRequest = z.object({
  file: z
    .any()
    .refine(
      (v: File) =>
        v === null || (v instanceof File && v.type.startsWith("image/")),
    )
    .transform((v) => v as File),
});

export type ChangeAvatarInput = AppRouterInput["settings"]["changeAvatar"];
export type ChangeAvatarOutput = AppRouterOutput["settings"]["changeAvatar"];
