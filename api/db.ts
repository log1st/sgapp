import { PrismaClient } from "@prisma/client";
import { fieldEncryptionExtension } from "prisma-field-encryption";
import { config } from "@/api/config";

export const db = new PrismaClient().$extends(
  fieldEncryptionExtension({
    encryptionKey: config.encryptionKey,
  }),
) as PrismaClient;

if (config.isDev) {
  setTimeout(async () => {
    await db.$disconnect();
  }, 3000);
}
