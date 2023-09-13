"use server";

import { accessTokenProcedure } from "@/api/services/auth/accessTokenProcedure";
import { omit } from "@/utils";

export const profile = accessTokenProcedure.mutation(
  async ({ ctx: { user } }) => omit(user, "password"),
);
