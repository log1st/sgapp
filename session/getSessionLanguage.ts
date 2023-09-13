import { cookies } from "next/headers";
import { fallbackLng } from "@/i18n/getI18nOptions";

export const localeCookieName = "lng";

export const getSessionLanguage = () =>
  cookies().get(localeCookieName)?.value || fallbackLng;

export const setServerLanguage = (lng: string) =>
  cookies().set(localeCookieName, lng);
