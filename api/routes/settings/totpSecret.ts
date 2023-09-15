import { TRPCError } from "@trpc/server";
import { accessTokenProcedure } from "../../services/auth/accessTokenProcedure";
import {
  generateTotpSecret,
  generateTotpUri,
} from "@/api/utils/totp/generateTotpSecret";

export const totpSecret = accessTokenProcedure.query(
  async ({ ctx: { user, db } }) => {
    if (user.totpEnabled) {
      throw new TRPCError({ code: "CONFLICT" });
    }

    let secret = user.totpSecret!;

    if (!secret) {
      secret = generateTotpSecret();
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          totpSecret: secret,
        },
      });
    }

    return {
      secret,
      image: generateTotpUri(user, secret),
    };
  },
);
