import { AppTheme } from "@/ui/layouts/root";
import { getSessionSetting, setSessionSetting } from "@/session/sessionSetting";
import { SettingType } from "@/session/settingType";

export const getSessionTheme = () =>
  getSessionSetting(SettingType.theme, AppTheme.dark);

export const setTheme = (theme: AppTheme) =>
  setSessionSetting(SettingType.theme, theme);
