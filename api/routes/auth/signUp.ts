"use server";

import { TRPCError } from "@trpc/server";
import { publicProcedure } from "@/api/trpc";
import { AuthTokens } from "@/api/types/auth/AuthToken";
import { generateTokens } from "@/api/services/auth/generateToken";
import { authSignUpInput } from "@/api/types/auth/AuthSignUp";

export const signUp = publicProcedure
  .input(authSignUpInput)
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
        },
      }),
      db,
    );
  });
