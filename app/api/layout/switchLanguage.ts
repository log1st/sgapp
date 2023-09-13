"use server";

import {
  getSessionLanguage,
  setServerLanguage,
} from "@/session/getSessionLanguage";

export const switchLanguage = () => {
  setServerLanguage(getSessionLanguage() === "en" ? "ru" : "en");
};
