import { z } from "zod";
import { AppRouterInput, AppRouterOutput } from "../../apiRouter";

export const uploadMediaRequest = z.object({
  file: z
    .any()
    .refine(
      (v: File) =>
        v === null ||
        (v instanceof File &&
          ["image", "audio", "video"].some((t) => v.type.startsWith(`${t}/`))),
    )
    .transform((v) => v as File),
});

export type UploadMediaInput = AppRouterInput["media"]["upload"];
export type UploadMediaOutput = AppRouterOutput["media"]["upload"];
