import { omit, pick } from "lodash";
import { RoomType } from "@prisma/client";
import { accessTokenProcedure } from "../../services/auth/accessTokenProcedure";
import { createRoomRequest } from "../../types/rooms/CreateRoomRequest";
import { dropCustomValidationError } from "../../utils/dropCustomValidationError";

export const create = accessTokenProcedure
  .input(createRoomRequest)
  .mutation(async ({ ctx: { db, user }, input: { config, ...input } }) => {
    const existingSlug = await db.room.findFirst({
      where: {
        slug: input.slug,
      },
    });

    if (existingSlug) {
      await dropCustomValidationError("unique", "slug", input);
    }

    if (config.type === RoomType.jeopardy) {
      const pack = await db.jeopardyPack.findFirst({
        where: { id: config.packId },
      });

      if (!pack) {
        await dropCustomValidationError("exists", ["config", "packId"], {
          config,
        });
      }
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
