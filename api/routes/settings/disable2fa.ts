import { accessTokenProcedure } from "@/api/services/auth/accessTokenProcedure";
import { validateTotp } from "@/api/utils/totp/generateTotpSecret";
import { dropCustomValidationError } from "@/api/utils/dropCustomValidationError";
import { disable2faRequest } from "@/api/types/settings/Disable2faRequest";

export const disable2fa = accessTokenProcedure
  .input(disable2faRequest)
  .mutation(async ({ ctx: { user, db }, input }) => {
    if (!user.totpEnabled) {
      return true;
    }

    if (!validateTotp(user, input.code)) {
      await dropCustomValidationError("invalid", "code", input);
    }

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        totpEnabled: false,
        totpSecret: null,
      },
    });

    return true;
  });
