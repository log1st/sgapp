import { Room } from "@prisma/client";

export const omitRoom = <T extends Room>({ password, ...room }: T) => ({
  ...room,
  hasPassword: !!password,
});
