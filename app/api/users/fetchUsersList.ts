"use server";

import { UsersListInput } from "@/api";
import { makeRequest } from "@/api/client";
import { getApiCaller } from "@/session/getApiCaller";

export const fetchUsersList = (input: UsersListInput) =>
  makeRequest(() => getApiCaller().users.list(input));
