import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import ICU from "i18next-icu";
import getI18nOptions, { fallbackLng } from "./getI18nOptions";
import { arrayFrom, filteredArray } from "@/utils";
import { getSessionLanguage } from "@/i18n/getSessionLanguage";

const initI18n = async (lng?: string, ns?: string | string[]) => {
  const instance = createInstance({
    ...getI18nOptions(lng, ns),
    initImmediate: false,
  })
    .use(initReactI18next)
    .use(ICU);

  await instance.init();

  return instance;
};

export const getServerTranslation = async (
  ns?: string | string[],
  options: Partial<{
    keyPrefix?: string;
  }> = {},
  lng: string | null | undefined = undefined,
) => {
  const language = lng ?? (getSessionLanguage() || fallbackLng);
  const namespaces = filteredArray(arrayFrom(ns));

  const instance = await initI18n(language, namespaces);

  return {
    t: instance.getFixedT(language, namespaces, options.keyPrefix),
    i18n: instance,
  };
};
