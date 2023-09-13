import { TokenType } from "@prisma/client";
import { middleware, publicProcedure } from "@/api/trpc";
import { findUserByToken } from "@/api/services/auth/findUserByToken";

export const refreshTokenProcedure = publicProcedure.use(
  middleware(async ({ ctx: { token, db }, next }) => {
    const user = await findUserByToken(db, token, TokenType.refresh);

    return next({
      ctx: {
        user,
      },
    });
  }),
);
