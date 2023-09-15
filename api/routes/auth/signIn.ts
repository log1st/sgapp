import { TRPCError } from "@trpc/server";
import { TokenType } from "@prisma/client";
import { differenceInSeconds } from "date-fns";
import { publicProcedure } from "../../trpc";
import { AuthTokens } from "../../types/auth/AuthToken";
import { authSignInRequest } from "../../types/auth/AuthSignInRequest";
import {
  generateToken,
  generateTokens,
} from "../../services/auth/generateToken";
import { dropCustomValidationError } from "@/api/utils/dropCustomValidationError";

export const signIn = publicProcedure
  .input(authSignInRequest)
  .mutation<AuthTokens>(async ({ ctx: { db }, input }) => {
    const existingUser = await db.user.findFirst({
      where: {
        login: input.login,
      },
    });

    if (!existingUser || existingUser.password !== input.password) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    if (existingUser.totpEnabled) {
      const token = await generateToken(existingUser, db, TokenType.totp);

      await dropCustomValidationError("totp", "totp", input, {
        token: token.token,
        expiresIn: differenceInSeconds(token.expiresAt, new Date()),
      });
    }

    return generateTokens(existingUser, db);
  });
