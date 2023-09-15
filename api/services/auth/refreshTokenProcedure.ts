import { TokenType } from "@prisma/client";
import { middleware, publicProcedure } from "../../trpc";
import { findUserByToken } from "./findUserByToken";

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
