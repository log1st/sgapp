import { TRPCError } from "@trpc/server";
import { publicProcedure } from "@/api/trpc";
import { AuthTokens } from "@/api/types/auth/AuthToken";
import { authSignInInput } from "@/api/types/auth/AuthSignIn";

export const signIn = publicProcedure
  .input(authSignInInput)
  .mutation<AuthTokens>(async ({ ctx: { db }, input }) => {
    const existingUser = await db.user.findFirst({
      where: {
        login: input.login,
      },
    });

    if (!existingUser) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    return {
      accessToken: {
        token: "",
        expiresIn: 60 * 60,
      },
      refreshToken: {
        token: "",
        expiresIn: 60 * 60,
      },
    };
  });
