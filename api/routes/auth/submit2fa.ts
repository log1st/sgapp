import { totpTokenProcedure } from "@/api/services/auth/totpTokenProcedure";
import { submit2faRequest } from "@/api/types/auth/Submit2faRequest";
import { generateTokens } from "@/api/services/auth/generateToken";
import { validateTotp } from "@/api/utils/totp/generateTotpSecret";
import { dropCustomValidationError } from "@/api/utils/dropCustomValidationError";

export const submit2fa = totpTokenProcedure
  .input(submit2faRequest)
  .mutation(async ({ ctx: { db, user }, input }) => {
    const { code } = input;

    if (!validateTotp(user, code)) {
      await dropCustomValidationError("invalid", "code", input);
    }

    return generateTokens(user, db);
  });
