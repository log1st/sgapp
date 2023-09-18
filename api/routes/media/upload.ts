import crypto from "crypto";
import { MediaType } from "@prisma/client";
import { accessTokenProcedure } from "../../services/auth/accessTokenProcedure";
import { uploadMediaRequest } from "../../types/media/UploadMediaRequest";
import { saveUpload } from "../../../nodeUtils/saveUpload";

export const upload = accessTokenProcedure
  .input(uploadMediaRequest)
  .query(async ({ ctx: { db, user }, input }) => {
    const { src, preview } = await saveUpload(
      input.file,
      `media/${crypto.randomUUID()}`,
      `${crypto.randomUUID()}.${
        input.file.name.split(".").at(-1) ?? input.file.type.split("/")[1]
      }`,
    );

    const media = await db.media.create({
      data: {
        creatorId: user.id,
        type: input.file.type.split("/")[0] as MediaType,
        src,
        name: input.file.name,
        preview,
      },
    });

    return {
      id: media.id,
      type: media.type,
    };
  });
