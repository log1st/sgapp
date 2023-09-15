/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from "@prisma/client";

export const omitUser = <T extends User>({
  password,
  totpSecret,
  ...user
}: T) => ({
  ...user,
  hasTotpSecret: !!totpSecret,
});
