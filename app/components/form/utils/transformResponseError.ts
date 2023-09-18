import { arrayFrom } from "@/utils";
import { ApiResponseError } from "@/api/client";

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
          : `field.${field
              .split(".")
              .filter((f) => String(parseInt(f, 10)) !== f)
              .join(".")}.validation.${type}`
      }`,
      payload,
    ],
  ];
};
