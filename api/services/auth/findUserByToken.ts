import { PrismaClient, TokenType } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import jwt from "jsonwebtoken";
import { config } from "@/api/config";

export const findUserByToken = async (
  db: PrismaClient,
  token: string | undefined,
  type: TokenType,
) => {
  if (!token) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  try {
    jwt.verify(
      token,
      {
        [TokenType.access]: config.jwtAccessTokenSecret,
        [TokenType.refresh]: config.jwtRefreshTokenSecret,
      }[type],
    );
  } catch {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  const user = await db.user.findFirst({
    where: {
      tokens: {
        some: {
          token,
          type,
          expiresAt: {
            gt: new Date(),
          },
          revokedAt: null,
        },
      },
    },
  });

  if (!user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return user;
};
