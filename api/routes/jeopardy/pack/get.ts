import { TRPCError } from "@trpc/server";
import { accessTokenProcedure } from "../../../services/auth/accessTokenProcedure";
import { getJeopardyPackRequest } from "../../../types/jeopardy/GetJeopardyPackRequest";

export const get = accessTokenProcedure
  .input(getJeopardyPackRequest)
  .query(async ({ ctx: { db, user }, input }) => {
    const pack = await db.jeopardyPack.findFirst({
      where: {
        id: input.id,
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
        rounds: {
          select: {
            name: true,
            type: true,
            _count: {
              select: {
                questions: true,
              },
            },
          },
          orderBy: {
            order: "asc",
          },
        },
      },
    });

    if (!pack) {
      throw new TRPCError({ code: "NOT_FOUND" });
    }

    return pack;
  });
