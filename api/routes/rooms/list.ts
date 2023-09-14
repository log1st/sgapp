import { Prisma, RoomStatus } from "@prisma/client";
import { addMinutes } from "date-fns";
import { accessTokenProcedure } from "@/api/services/auth/accessTokenProcedure";
import {
  roomsListRequest,
  RoomsListResponse,
} from "@/api/types/rooms/RoomsList";
import RoomWhereInput = Prisma.RoomWhereInput;

export const list = accessTokenProcedure
  .input(roomsListRequest)
  .query<RoomsListResponse>(async ({ ctx: { db }, input }) => {
    const where: RoomWhereInput = {
      OR: [
        {
          status: {
            notIn: [RoomStatus.finished],
          },
        },
        {
          status: RoomStatus.finished,
          finishedAt: {
            lte: addMinutes(new Date(), 5),
          },
        },
      ],
    };

    const total = await db.room.count({ where });

    return {
      data: await db.room.findMany({
        where,
        take: input.limit,
        skip: (input.page - 1) * input.limit,
      }),
      total,
      page: Math.max(input.page, Math.ceil(total / input.limit)),
    };
  });
