"use client";

import {
  ChangeEventHandler,
  Children,
  cloneElement,
  CSSProperties,
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
import { Icon } from "@/ui/components/icon";

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
    style?: CSSProperties;
  }>;
  label?: ReactNode;
  hint?: ReactNode;

  submitOnBlur?: boolean;
  submitOnChange?: boolean;

  icon?: Icon | ReactNode;

  fixedSize?: number | null;

  style?: CSSProperties;
};

export function Field({
  name,
  valuePropName = "value",
  children,
  label,
  hint,
  submitOnBlur,
  submitOnChange,
  icon,
  fixedSize = null,
  style,
}: FieldProps) {
  const [{ value, onChange, onBlur, checked }, { error, touched }] =
    useField<unknown>(name);
  const { submitForm } = useFormikContext();

  const { submitting, disabled, lng } = useForm();

  const { t } = useClientTranslation(undefined, undefined, lng);

  return (
    <UiFieldLayout
      label={label && <UiLabel icon={icon}>{label}</UiLabel>}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      error={error && <UiHint type={UiHintType.danger}>{t(...error)}</UiHint>}
      hint={hint && <UiHint>{hint}</UiHint>}
      e2e={error && "has-error"}
      style={style}
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

                if (submitOnBlur) {
                  submitForm();
                }
              }) as FocusEventHandler,
              disabled: submitting || disabled,
              style: fixedSize
                ? {
                    blockSize: `${fixedSize}px`,
                  }
                : {},
            })
          : child,
      )}
    </UiFieldLayout>
  );
}
