import { accessTokenProcedure } from "@/api/services/auth/accessTokenProcedure";
import { enable2faRequest } from "@/api/types/settings/Enable2faRequest";
import { validateTotp } from "@/api/utils/totp/generateTotpSecret";
import { dropCustomValidationError } from "@/api/utils/dropCustomValidationError";

export const enable2fa = accessTokenProcedure
  .input(enable2faRequest)
  .mutation(async ({ ctx: { user, db }, input }) => {
    if (user.totpEnabled) {
      await dropCustomValidationError("alreadySet", "code", input);
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
        totpEnabled: true,
      },
    });

    return true;
  });
