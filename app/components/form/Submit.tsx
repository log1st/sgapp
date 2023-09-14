"use client";

import {
  Children,
  cloneElement,
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
}>;

export function Submit({
  children,
  loadingPropName = "loading",
  typePropName = "htmlType",
  dirtyOnly = false,
}: SubmitProps) {
  const { submitting, disabled } = useForm();
  const { dirty } = useFormikContext();

  if (dirtyOnly && !dirty) {
    return null;
  }

  return (
    <>
      {Children.map(children, (child) =>
        isValidElement(child)
          ? cloneElement(child, {
              [typePropName]: UiPureButtonHtmlType.submit,
              [loadingPropName]: submitting,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              disabled,
            })
          : child,
      )}
    </>
  );
}
