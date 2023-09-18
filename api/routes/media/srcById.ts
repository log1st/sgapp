import { TRPCError } from "@trpc/server";
import { accessTokenProcedure } from "../../services/auth/accessTokenProcedure";
import { srcByIdRequest } from "../../types/media/SrcByIdRequest";

export const srcById = accessTokenProcedure
  .input(srcByIdRequest)
  .query(async ({ ctx: { db, user }, input }) => {
    const media = await db.media.findFirst({
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
    });

    if (!media) {
      throw new TRPCError({ code: "NOT_FOUND" });
    }

    return {
      src: media.src,
      preview: media.preview,
      type: media.type,
    };
  });
