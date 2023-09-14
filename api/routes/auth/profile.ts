"use server";

import { omit } from "lodash";
import { accessTokenProcedure } from "@/api/services/auth/accessTokenProcedure";

export const profile = accessTokenProcedure.mutation(
  async ({ ctx: { user } }) => omit(user, "password"),
);
