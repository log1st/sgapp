"use server";

import { AuthTokens } from "@/api/types/auth/AuthToken";
import { generateTokens } from "@/api/services/auth/generateToken";
import { refreshTokenProcedure } from "@/api/services/auth/refreshTokenProcedure";

export const refreshToken = refreshTokenProcedure.mutation<AuthTokens>(
  async ({ ctx: { db, user } }) => generateTokens(user, db),
);
