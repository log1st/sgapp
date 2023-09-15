import { TRPCError } from "@trpc/server";
import { publicProcedure } from "../../trpc";
import { AuthTokens } from "../../types/auth/AuthToken";
import { generateTokens } from "../../services/auth/generateToken";
import { authSignUpRequest } from "../../types/auth/AuthSignUpRequest";
import { generateTotpSecret } from "../../utils/totp/generateTotpSecret";

export const signUp = publicProcedure
  .input(authSignUpRequest)
  .mutation<AuthTokens>(async ({ ctx: { db }, input }) => {
    const existingUser = await db.user.findFirst({
      where: {
        login: input.login,
      },
    });

    if (existingUser) {
      throw new TRPCError({ code: "FORBIDDEN" });
    }

    return generateTokens(
      await db.user.create({
        data: {
          login: input.login,
          password: input.password,
          totpSecret: generateTotpSecret(),
        },
      }),
      db,
    );
  });
