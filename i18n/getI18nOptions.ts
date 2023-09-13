import en from "./locales/en";
import ru from "./locales/ru";

export const fallbackLng = "en";

export const languages = [fallbackLng, "ru"];

export const defaultNS = "translation";

export default function getI18nOptions(
  lng = fallbackLng,
  ns: string | string[] = defaultNS,
) {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
    react: {
      useSuspense: true,
      escapeValue: false,
    },
    resources: {
      en,
      ru,
    },
  };
}
