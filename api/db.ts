import { PrismaClient } from "@prisma/client";
import { fieldEncryptionExtension } from "prisma-field-encryption";
import { config } from "@/api/config";

const innerDb = new PrismaClient();

const client = innerDb.$extends(
  fieldEncryptionExtension({
    encryptionKey: config.encryptionKey,
  }),
);

export const db = client as typeof innerDb;
