"use server";

import { TRPCError } from "@trpc/server";
import { publicProcedure } from "@/api/trpc";
import { AuthTokens } from "@/api/types/auth/AuthToken";
import { authSignInInput } from "@/api/types/auth/AuthSignIn";
import { generateTokens } from "@/api/services/auth/generateToken";

export const signIn = publicProcedure
  .input(authSignInInput)
  .mutation<AuthTokens>(async ({ ctx: { db }, input }) => {
    const existingUser = await db.user.findFirst({
      where: {
        login: input.login,
      },
    });

    if (!existingUser || existingUser.password !== input.password) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    return generateTokens(existingUser, db);
  });
