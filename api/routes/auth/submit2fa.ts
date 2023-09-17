import { totpTokenProcedure } from "../../services/auth/totpTokenProcedure";
import { submit2faRequest } from "../../types/auth/Submit2faRequest";
import { generateTokens } from "../../services/auth/generateToken";
import { validateTotp } from "../../utils/totp/generateTotpSecret";
import { dropCustomValidationError } from "../../utils/dropCustomValidationError";

export const submit2fa = totpTokenProcedure
  .input(submit2faRequest)
  .mutation(async ({ ctx: { db, user }, input }) => {
    const { code } = input;

    if (!validateTotp(user, code)) {
      await dropCustomValidationError("invalid", "code", input);
    }

    return generateTokens(user, db);
  });
