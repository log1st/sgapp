import { authenticator } from "otplib";
import { User } from "@prisma/client";

export const generateTotpSecret = () => authenticator.generateSecret();

export const generateTotpUri = (user: User, secret: string) =>
  authenticator.keyuri(user.login, "Games", secret);

export const validateTotp = (user: User, code: string) =>
  !user.totpSecret ? false : authenticator.check(code, user.totpSecret);
