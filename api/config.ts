import { z } from "zod";

export const config = z
  .object({
    JWT_ACCESS_TOKEN_SECRET: z.string(),
    JWT_REFRESH_TOKEN_SECRET: z.string(),
    ENCRYPTION_KEY: z.string(),
    DATABASE_URL: z.string(),
  })
  .transform((cfg) => ({
    jwtAccessTokenSecret: cfg.JWT_ACCESS_TOKEN_SECRET,
    jwtRefreshTokenSecret: cfg.JWT_REFRESH_TOKEN_SECRET,
    encryptionKey: cfg.ENCRYPTION_KEY,
    databaseURL: cfg.DATABASE_URL,
  }))
  .parse(process.env);
