import { refreshTokenProcedure } from "@/api/services/auth/refreshTokenProcedure";

export const signOut = refreshTokenProcedure.mutation(
  async ({ ctx: { db, user } }) => {
    await db.token.updateMany({
      where: {
        userId: user.id,
      },
      data: {
        revokedAt: new Date(),
      },
    });

    return true;
  },
);
