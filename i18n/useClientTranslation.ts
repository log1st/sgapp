"use client";

import i18next from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import ICU from "i18next-icu";
import {
  UseTranslationOptions,
  useTranslation as useTranslationOrg,
} from "react-i18next";
import getI18nOptions from "./getI18nOptions";
import { arrayFrom, filteredArray } from "@/utils";

void i18next
  .use(initReactI18next)
  .use(ICU)
  .init({
    ...getI18nOptions(),
  });

export const useClientTranslation = (
  ns?: string | string[],
  options: Partial<UseTranslationOptions<string>> = {},
  lng: string | undefined = undefined,
) =>
  useTranslationOrg(filteredArray(arrayFrom(ns)), {
    ...options,
    lng,
  });
