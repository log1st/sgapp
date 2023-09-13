"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  PropsWithChildren,
} from "react";
import { useForm } from "./FormContext";
import { UiPureButtonHtmlType } from "@/ui/components/pure-button";

export type SubmitProps = PropsWithChildren<{
  typePropName?: string;
  loadingPropName?: string;
}>;

export function Submit({
  children,
  loadingPropName = "loading",
  typePropName = "htmlType",
}: SubmitProps) {
  const { submitting, disabled } = useForm();

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
