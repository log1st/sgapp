import { AppTheme } from "@/ui/layouts/root";
import { languages } from "@/i18n/getI18nOptions";

export enum SettingType {
  theme = "theme",
  language = "language",
  sidebar = "sidebar",
}

export type SettingValue<Type extends SettingType> = {
  [SettingType.theme]: AppTheme;
  [SettingType.language]: (typeof languages)[number];
  [SettingType.sidebar]: boolean;
}[Type];
