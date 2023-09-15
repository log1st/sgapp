import { AuthTokens } from "../../types/auth/AuthToken";
import { generateTokens } from "../../services/auth/generateToken";
import { refreshTokenProcedure } from "../../services/auth/refreshTokenProcedure";

export const refreshToken = refreshTokenProcedure.mutation<AuthTokens>(
  async ({ ctx: { db, user } }) => generateTokens(user, db),
);
