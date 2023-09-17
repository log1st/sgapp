import { accessTokenProcedure } from "../../services/auth/accessTokenProcedure";
import { omitUser } from "../../utils/omit/omitUser";

export const profile = accessTokenProcedure.mutation(
  async ({ ctx: { user } }) => omitUser(user),
);
