"use server";

import { cookies } from "next/headers";
import { SettingType, SettingValue } from "@/session/settingType";

export const setSessionSetting = async <Type extends SettingType>(
  key: Type,
  value: SettingValue<Type>,
) => {
  cookies().set(key, JSON.stringify(value));
};

export const getSessionSetting = <Type extends SettingType>(
  key: Type,
  fallback?: SettingValue<Type>,
): SettingValue<Type> =>
  JSON.parse(cookies().get(key)?.value || "null") ?? fallback ?? null;
