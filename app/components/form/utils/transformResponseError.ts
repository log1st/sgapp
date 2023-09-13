import { ApiResponseError } from "@/api";
import { arrayFrom } from "@/utils";

export type TranslatedResponseError = [
  string,
  [string, Record<string, unknown> | undefined],
];

export const transformResponseError = (
  error: ApiResponseError,
  ns?: string | string[],
  keyPrefix?: string,
): TranslatedResponseError => {
  const [field, type, payload] = error;

  return [
    field,
    [
      `${ns ? `${arrayFrom(ns)[0]}:` : ""}${keyPrefix ? `${keyPrefix}.` : ""}${
        field === "common"
          ? `error.${type}`
          : `field.${field}.validation.${type}`
      }`,
      payload,
    ],
  ];
};
