import { getSessionSetting, setSessionSetting } from "@/session/sessionSetting";
import { fallbackLng } from "@/i18n/getI18nOptions";
import { SettingType } from "@/session/settingType";

export const getSessionLanguage = () =>
  getSessionSetting(SettingType.language, fallbackLng);

export const setServerLanguage = (lng: string) =>
  setSessionSetting(SettingType.language, lng);
