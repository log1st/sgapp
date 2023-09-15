import { TRPCError } from "@trpc/server";
import { accessTokenProcedure } from "../../services/auth/accessTokenProcedure";
import { getRoomRequest } from "../../types/rooms/GetRoomRequest";
import { omitRoom } from "@/api/utils/omit/omitRoom";

export const get = accessTokenProcedure
  .input(getRoomRequest)
  .query(async ({ ctx: { db, user }, input }) => {
    const room = await db.room.findFirst({
      where: {
        OR: [{ private: false }, { private: true, creatorId: user.id }],
        slug: input.slug,
      },
      include: {
        jeopardyConfig: {
          include: {
            questionPack: true,
          },
        },
        creator: {
          select: {
            avatar: true,
            login: true,
          },
        },
      },
    });

    if (!room) {
      throw new TRPCError({ code: "NOT_FOUND" });
    }

    return omitRoom(room);
  });
