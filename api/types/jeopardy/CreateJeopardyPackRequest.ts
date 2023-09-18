import { z } from "zod";
import {
  JeopardyPackQuestionType,
  JeopardyPackRoundType,
  JeopardyQuestionSecretCostRevealType,
  MediaType,
} from "@prisma/client";
import { AppRouterInput, AppRouterOutput } from "../../apiRouter";

export enum JeopardyPackDifficulty {
  min = 1,
  max = 10,
}

export const jeopardyPackQuestionMediaQuest = z.object({
  key: z.string(),
  id: z.number().int(),
  from: z.number().min(0).optional(),
  to: z.number().min(0).optional(),

  file: z.any().transform<File>((v) => v),
  type: z.nativeEnum(MediaType).optional(),
});

export const jeopardyQuestionSecretCostTypes: [string, ...string[]] = [
  "minMax",
  "customMinMax",
  "fixed",
];

export const jeopardyPackQuestionRequest = z
  .object({
    key: z.string(),
    type: z.nativeEnum(JeopardyPackQuestionType),
    text: z.string(),
    cost: z.number().int(),
    secretTopic: z.string().optional(),
    secretCost: z.number().optional(),
    selfSecret: z.boolean(),
    commonSecretCostReveal: z.nativeEnum(JeopardyQuestionSecretCostRevealType),
    secretMinMaxCost: z.tuple([
      z.number().min(0).int(),
      z.number().min(0).int(),
      z.number().min(0).int(),
    ]),
    answers: z.array(z.string()).min(1),
    hint: z.string().optional(),
    secretCostType: z.enum(jeopardyQuestionSecretCostTypes),
    medias: z.array(jeopardyPackQuestionMediaQuest),
  })
  .refine((v) => !!v.text || v.medias.length > 0, {
    path: ["text"],
    message: "required",
  })
  .refine(
    (v) =>
      (
        [
          JeopardyPackQuestionType.secret,
          JeopardyPackQuestionType.commonSecret,
        ] as Array<JeopardyPackQuestionType>
      ).includes(v.type)
        ? !!v.secretTopic
        : true,
    {
      path: ["secretTopic"],
      message: "required",
    },
  );

export const jeopardyPackRoundRequest = z.object({
  key: z.string(),
  name: z.string().min(5),
  type: z.nativeEnum(JeopardyPackRoundType),
  questions: z.array(jeopardyPackQuestionRequest).min(1),
});

export const createJeopardyPackRequest = z.object({
  name: z.string().min(6),
  private: z.boolean().default(false),
  difficulty: z
    .number()
    .min(JeopardyPackDifficulty.min)
    .max(JeopardyPackDifficulty.max),
  rounds: z.array(jeopardyPackRoundRequest).min(1),
});

export type CreateJeopardyPackInput = AppRouterInput["jeopardy"]["createPack"];
export type CreateJeopardyPackOutput =
  AppRouterOutput["jeopardy"]["createPack"];
