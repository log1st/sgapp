"use client";

import {
  ChangeEventHandler,
  Children,
  cloneElement,
  FocusEventHandler,
  isValidElement,
  ReactElement,
  ReactNode,
} from "react";
import { useField, useFormikContext } from "formik";
import { useForm } from "./FormContext";
import { useClientTranslation } from "@/i18n/useClientTranslation";
import { UiFieldLayout } from "@/ui/layouts/field-layout";
import { UiLabel } from "@/ui/components/label";
import { UiHint, UiHintType } from "@/ui/components/hint";

export type FieldProps = {
  name: string;
  valuePropName?: string;
  children?: ReactElement<{
    name?: string;
    onChange?: ChangeEventHandler;
    touched?: boolean;
    onBlur?: FocusEventHandler;
    disabled?: boolean;
    hasError?: boolean;
  }>;
  label?: ReactNode;

  submitOnBlur?: boolean;
  submitOnChange?: boolean;
};

export function Field({
  name,
  valuePropName = "value",
  children,
  label,
  submitOnBlur,
  submitOnChange,
}: FieldProps) {
  const [{ value, onChange, onBlur, checked }, { error, touched }] =
    useField<unknown>(name);
  const { submitForm } = useFormikContext();

  const { submitting, disabled, lng } = useForm();

  const { t } = useClientTranslation(undefined, undefined, lng);

  return (
    <UiFieldLayout
      label={label && <UiLabel>{label}</UiLabel>}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      error={error && <UiHint type={UiHintType.danger}>{t(...error)}</UiHint>}
    >
      {Children.map(children, (child) =>
        isValidElement(child)
          ? cloneElement(child, {
              name,
              [valuePropName]:
                {
                  checked,
                  value,
                }[valuePropName] ?? value,
              onChange: ((event) => {
                onChange?.(event);
                if (submitOnChange) {
                  submitForm();
                }
              }) as ChangeEventHandler,
              touched,
              hasError: !!error,
              onBlur: ((event) => {
                onBlur?.(event);

                if (event.target instanceof HTMLInputElement) {
                  if (valuePropName === "value") {
                    if (String(event.target.value) === String(value)) {
                      return;
                    }
                  }
                  if (valuePropName === "checked") {
                    if (
                      event.target.checked === checked &&
                      event.target.value === value
                    ) {
                      return;
                    }
                  }
                }

                if (submitOnBlur) {
                  submitForm();
                }
              }) as FocusEventHandler,
              disabled: submitting || disabled,
            })
          : child,
      )}
    </UiFieldLayout>
  );
}
