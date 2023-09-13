// eslint-disable-next-line import/no-extraneous-dependencies
import { PrismaClient } from "@prisma/client";

export type ApiDbContext = {
  db: PrismaClient;
};

export type ApiClientContext = {
  accessToken?: string;
};

export type ApiContext = ApiDbContext & ApiClientContext;
