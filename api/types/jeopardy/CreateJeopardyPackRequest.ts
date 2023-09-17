import { z } from "zod";
import { JeopardyPackRoundType } from "@prisma/client";
import { AppRouterInput, AppRouterOutput } from "../../apiRouter";

export enum JeopardyPackDifficulty {
  min = 1,
  max = 10,
}

export const jeopardyPackRoundRequest = z.object({
  key: z.string(),
  name: z.string().min(5),
  type: z.nativeEnum(JeopardyPackRoundType),
  questions: z.array(z.object({})),
});

export const createJeopardyPackRequest = z.object({
  name: z.string().min(6),
  private: z.boolean().default(false),
  difficulty: z
    .number()
    .min(JeopardyPackDifficulty.min)
    .max(JeopardyPackDifficulty.max),
  rounds: z.array(jeopardyPackRoundRequest),
});

export type CreateJeopardyPackInput = AppRouterInput["jeopardy"]["createPack"];
export type CreateJeopardyPackOutput =
  AppRouterOutput["jeopardy"]["createPack"];
