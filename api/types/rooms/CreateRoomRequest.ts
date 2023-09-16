import { z } from "zod";
import { JeopardyAnswerType, RoomType } from "@prisma/client";
import { generateSlug } from "random-word-slugs";
import { AppRouterInput, AppRouterOutput } from "../../apiRouter";

export const createRoomRequest = z.object({
  type: z.nativeEnum(RoomType),
  title: z.string().min(6),
  slug: z
    .string()
    .transform((v) => v || undefined)
    .pipe(
      z
        .string()
        .min(6)
        .optional()
        .default(() =>
          generateSlug(4, {
            format: "kebab",
          }),
        ),
    ),
  private: z.boolean().optional().default(false),
  password: z
    .string()
    .transform((v) => v || null)
    .pipe(z.string().nullish().default(null)),
  config: z.discriminatedUnion("type", [
    z.object({
      type: z.literal(RoomType.jeopardy),
      maxPlayers: z.number().max(12),
      answerType: z.nativeEnum(JeopardyAnswerType),
      partialText: z.boolean(),
      falseStarts: z.boolean(),
      previewAnswers: z.boolean(),
      readingSpeed: z.number(),
      stepByStep: z.boolean(),
      appellations: z.boolean(),
      noPenalty: z.boolean(),
      awaitSync: z.boolean(),
      preloadMedia: z.boolean(),

      choosingQuestionTime: z.number(),
      thinkingOnQuestionTime: z.number(),
      answerTime: z.number(),
      givingSecretQuestionTime: z.number(),
      makingStakeTime: z.number(),
      thinkingOnStakeQuestionTime: z.number(),
      printingAnswerTime: z.number(),
      roundTime: z.number(),
      choosingFinalCategoryTime: z.number(),
      thinkingOnFinalQuestionTime: z.number(),
      answerValidationTime: z.number(),
      mediaPauseTime: z.number(),
      falseStartTime: z.number(),
      packId: z.number(),
    }),
    z.object({
      type: z.literal(RoomType.sixMinds),
    }),
  ]),
});

export type CreateRoomInput = AppRouterInput["rooms"]["create"];
export type CreateRoomOutput = AppRouterOutput["rooms"]["create"];
