"use client";

import {
  Children,
  cloneElement,
  CSSProperties,
  isValidElement,
  PropsWithChildren,
} from "react";
import { useFormikContext } from "formik";
import { useForm } from "./FormContext";
import { UiPureButtonHtmlType } from "@/ui/components/pure-button";

export type SubmitProps = PropsWithChildren<{
  typePropName?: string;
  loadingPropName?: string;
  dirtyOnly?: boolean;
  style?: CSSProperties;
}>;

export function Submit({
  children,
  loadingPropName = "loading",
  typePropName = "htmlType",
  dirtyOnly = false,
  style,
}: SubmitProps) {
  const { submitting, disabled } = useForm();
  const { dirty } = useFormikContext();

  return (
    <>
      {Children.map(children, (child) =>
        isValidElement(child)
          ? cloneElement(child, {
              [typePropName]: UiPureButtonHtmlType.submit,
              [loadingPropName]: submitting,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              disabled: disabled || (dirtyOnly && !dirty),
              style,
            })
          : child,
      )}
    </>
  );
}
