import { accessTokenProcedure } from "../../services/auth/accessTokenProcedure";
import { jeopardyPacksListRequest } from "../../types/jeopardy/JeopardyPacksListRequest";

export const packsList = accessTokenProcedure
  .input(jeopardyPacksListRequest)
  .query(async ({ ctx: { db, user }, input }) => {
    const where: Required<
      Parameters<typeof db.jeopardyPack.findMany>
    >[0]["where"] = {
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
      AND: {
        OR: [
          {
            private: false,
          },
          {
            private: true,
            creatorId: user.id,
          },
        ],
      },
    };

    const data = await db.jeopardyPack.findMany({
      where,
      skip: (input.page - 1) * input.limit,
      take: input.limit,
      include: {
        creator: {
          select: {
            id: true,
            login: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            rounds: true,
            configs: true,
          },
        },
      },
    });

    const total = await db.jeopardyPack.count({ where });

    return {
      total,
      data,
      page: Math.max(input.page, Math.ceil(total / input.limit)),
      limit: input.limit,
    };
  });
