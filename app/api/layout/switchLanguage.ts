"use server";

import {
  getSessionLanguage,
  setServerLanguage,
} from "@/i18n/getSessionLanguage";

export const switchLanguage = () => {
  setServerLanguage(getSessionLanguage() === "en" ? "ru" : "en");
};
