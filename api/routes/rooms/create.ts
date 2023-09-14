import { TRPCError } from "@trpc/server";
import { omit, pick } from "lodash";
import { JeopardyConfigCreateInput, Prisma } from ".prisma/client";
import { accessTokenProcedure } from "@/api/services/auth/accessTokenProcedure";
import { createRoomRequest } from "@/api/types/rooms/CreateRoomRequest";
import { RoomType } from "@/api";
import JeopardyConfigCreateArgs = Prisma.JeopardyConfigCreateArgs;

export const create = accessTokenProcedure
  .input(createRoomRequest)
  .mutation(async ({ ctx: { db, user }, input: { config, ...input } }) => {
    const existingSlug = await db.room.findFirst({
      where: {
        slug: input.slug,
      },
    });

    if (existingSlug) {
      throw new TRPCError({
        code: "UNPROCESSABLE_CONTENT",
        message: "slug.unique",
      });
    }

    const configModel =
      config.type === RoomType.jeopardy
        ? {
            jeopardyConfigId: (
              await db.jeopardyConfig.create({ data: omit(config, "type") })
            ).id,
          }
        : {};

    const room = await db.room.create({
      data: {
        ...input,
        ...configModel,
        creatorId: user.id,
      },
    });

    return pick(room, "slug", "id");
  });
