import { accessTokenProcedure } from "../../services/auth/accessTokenProcedure";
import { changePasswordRequest } from "../../types/settings/ChangePasswordRequest";
import { dropCustomValidationError } from "../../utils/dropCustomValidationError";

export const changePassword = accessTokenProcedure
  .input(changePasswordRequest)
  .mutation(async ({ ctx: { user, db }, input }) => {
    if (input.current !== user.password) {
      await dropCustomValidationError("invalid", "current", input);
    }

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: input.password,
      },
    });

    return true;
  });
