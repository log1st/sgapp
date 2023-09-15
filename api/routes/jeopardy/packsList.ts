import { Prisma } from ".prisma/client";
import { accessTokenProcedure } from "../../services/auth/accessTokenProcedure";
import { jeopardyPacksListRequest } from "../../types/jeopardy/JeopardyPacksListRequest";
import JeopardyQuestionPackWhereInput = Prisma.JeopardyQuestionPackWhereInput;

export const packsList = accessTokenProcedure
  .input(jeopardyPacksListRequest)
  .query(async ({ ctx: { db }, input }) => {
    const where: JeopardyQuestionPackWhereInput = {
      OR: [
        {
          name: {
            contains: input.query,
            mode: "insensitive",
          },
        },
        {
          creator: {
            login: {
              contains: input.query,
              mode: "insensitive",
            },
          },
        },
      ],
    };

    const data = await db.jeopardyQuestionPack.findMany({
      where,
      skip: (input.page - 1) * input.limit,
      take: input.limit,
      include: {
        creator: {
          select: {
            id: true,
            login: true,
          },
        },
      },
    });

    const total = await db.jeopardyQuestionPack.count({ where });

    return {
      total,
      data,
      page: Math.max(input.page, Math.ceil(total / input.limit)),
      limit: input.limit,
    };
  });
