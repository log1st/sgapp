import { PrismaClient, TokenType, User } from "@prisma/client";
import { addMinutes, differenceInSeconds } from "date-fns";
import jwt from "jsonwebtoken";
import { AuthTokens } from "../../types/auth/AuthToken";
import { config } from "../../config";

export const generateToken = (user: User, db: PrismaClient, type: TokenType) =>
  db.token.create({
    data: {
      userId: user.id,
      token: jwt.sign(
        {
          id: user.id,
        },
        {
          [TokenType.access]: config.jwtAccessTokenSecret,
          [TokenType.refresh]: config.jwtRefreshTokenSecret,
          [TokenType.totp]: config.jwtAccessTokenSecret,
        }[type],
      ),
      type,
      expiresAt: addMinutes(
        new Date(),
        {
          [TokenType.access]: 15,
          [TokenType.refresh]: 3 * 60,
          [TokenType.totp]: 3 * 60,
        }[type],
      ),
    },
  });

export const generateTokens = async (
  user: User,
  db: PrismaClient,
): Promise<AuthTokens> => {
  const accessToken = await generateToken(user, db, TokenType.access);
  const refreshToken = await generateToken(user, db, TokenType.refresh);

  return {
    accessToken: {
      token: accessToken.token,
      expiresIn: differenceInSeconds(accessToken.expiresAt, new Date()),
    },
    refreshToken: {
      token: refreshToken.token,
      expiresIn: differenceInSeconds(refreshToken.expiresAt, new Date()),
    },
  };
};
