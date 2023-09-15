import { Prisma, RoomStatus } from "@prisma/client";
import { addMinutes } from "date-fns";
import { accessTokenProcedure } from "../../services/auth/accessTokenProcedure";
import { roomsListRequest } from "../../types/rooms/RoomsListRequest";
import RoomWhereInput = Prisma.RoomWhereInput;
import { omitRoom } from "@/api/utils/omit/omitRoom";

export const list = accessTokenProcedure
  .input(roomsListRequest)
  .query(async ({ ctx: { db, user }, input }) => {
    const where: RoomWhereInput = {
      OR: input.filter.status.length
        ? undefined
        : [
            {
              status: {
                notIn: [RoomStatus.finished],
              },
            },
            {
              status: RoomStatus.finished,
              finishedAt: {
                gte: addMinutes(new Date(), -5),
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
      type: input.filter.type.length
        ? {
            in: input.filter.type,
          }
        : {},
      status: input.filter.status.length ? { in: input.filter.status } : {},
      title: input.filter.query
        ? {
            contains: input.filter.query,
            mode: "insensitive",
          }
        : {},
      password: [0, 2].includes(input.filter.password.length)
        ? {}
        : input.filter.password[0]
        ? { not: null }
        : { equals: null },
    };

    const total = await db.room.count({ where });

    const data = await db.room.findMany({
      where,
      take: input.limit,
      skip: (input.page - 1) * input.limit,
      include: {
        creator: {
          select: {
            login: true,
            avatar: true,
          },
        },
        jeopardyConfig: true,
        jeopardyUsersOnRooms: {
          include: {
            user: {
              select: {
                login: true,
                avatar: true,
              },
            },
          },
        },
      },
    });

    return {
      data: data.map(omitRoom),
      total,
      page: Math.max(input.page, Math.ceil(total / input.limit)),
      limit: input.limit,
    };
  });
