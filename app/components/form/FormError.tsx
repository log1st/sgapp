"use client";

import { useField } from "formik";
import {
  Children,
  cloneElement,
  CSSProperties,
  isValidElement,
  PropsWithChildren,
} from "react";
import { useForm } from "./FormContext";
import { useClientTranslation } from "@/i18n/useClientTranslation";
import { UiHint, UiHintType } from "@/ui/components/hint";

export type FormErrorProps = {
  name?: string;
  style?: CSSProperties;
};

export type HasErrorProps = PropsWithChildren<{
  name: string;
}>;

export function HasError({ children, name }: HasErrorProps) {
  const [, { error }] = useField(name);
  return Children.map(children, (child) =>
    isValidElement(child)
      ? cloneElement(child, {
          hasError: !!error,
          e2e: error ? "has-error" : undefined,
        } as any)
      : child,
  );
}

export function FormError({ name, style }: FormErrorProps) {
  const { error, lng } = useForm();
  const [, { error: fieldError }] = useField(name || "_");

  const { t } = useClientTranslation(undefined, undefined, lng);

  if (name ? !fieldError : !error) {
    return null;
  }

  const err = name ? fieldError : (error as any)[1];

  if (typeof err[0] !== "string") {
    return null;
  }

  return (
    <UiHint e2e="has-error" type={UiHintType.danger} style={style}>
      {t(...err)}
    </UiHint>
  );
}
