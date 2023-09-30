import { omit } from "lodash";
import { accessTokenProcedure } from "../../../services/auth/accessTokenProcedure";
import { createJeopardyPackRequest } from "../../../types/jeopardy/CreateJeopardyPackRequest";

export const create = accessTokenProcedure
  .input(createJeopardyPackRequest)
  .mutation(async ({ ctx: { db, user }, input: { rounds, ...pack } }) => {
    const record = await db.jeopardyPack.create({
      data: {
        ...pack,
        creatorId: user.id,
        rounds: {
          create: rounds.map(({ questions, ...round }, index) => ({
            ...omit(round, "key"),
            order: index,
            questions: {
              create: questions.map(({ medias, ...question }, i) => ({
                ...omit(question, "secretCostType", "key"),
                order: i,
                mediasOnQuestion: {
                  create: medias.map(({ id }) => ({
                    mediaId: id,
                  })),
                },
              })),
            },
          })),
        },
      },
    });

    return {
      id: record.id,
    };
  });
