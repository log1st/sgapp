"use server";

import { ChangePasswordInput, makeRequest } from "@/api";
import { getApiCaller } from "@/session/getApiCaller";

export const changePasswordAction = (input: ChangePasswordInput) =>
  makeRequest(() => getApiCaller().settings.changePassword(input));
