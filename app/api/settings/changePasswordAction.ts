"use server";

import { makeRequest } from "@/api/client";
import { getApiCaller } from "@/session/getApiCaller";
import { ChangePasswordInput } from "@/api";

export const changePasswordAction = (input: ChangePasswordInput) =>
  makeRequest(() => getApiCaller().settings.changePassword(input));
