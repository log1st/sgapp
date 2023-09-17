import * as crypto from "crypto";
import { accessTokenProcedure } from "../../services/auth/accessTokenProcedure";
import { changeAvatarRequest } from "../../types/settings/ChangeAvatarRequest";
import { saveUpload } from "../../../nodeUtils/saveUpload";

export const changeAvatar = accessTokenProcedure
  .input(changeAvatarRequest)
  .mutation(async ({ ctx: { db, user }, input }) => {
    if (!input.file) {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          avatar: null,
        },
      });
      return null;
    }

    const avatar = await saveUpload(
      input.file,
      `avatars/${crypto.randomUUID()}`,
      `${user.login}.${input.file.type.split("/")[1]}`,
    );

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        avatar,
      },
    });

    return avatar;
  });
