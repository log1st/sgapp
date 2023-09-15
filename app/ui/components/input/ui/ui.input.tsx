"use client";

import { useToggle } from "react-use";
import { RefObject, useRef } from "react";
import { arrayFrom, clsx, filteredArray } from "@/utils";
import { UiInputProps, UiInputType } from "..";

import styles from "./ui.input.module.scss";
import { UiField } from "../../field";
import { Icon, UiIcon } from "../../icon";
import { UiPureButton } from "../../pure-button";

export function UiInput<Type extends UiInputType = UiInputType.text>({
  className,
  style,
  e2e,
  name,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  htmlType = UiInputType.text,
  value,
  autoFocus,
  placeholder,
  onBlur,
  onFocus,
  onChange,
  clearable,
  clearValue,
  autoSelect = false,
  ...fieldProps
}: UiInputProps<Type>) {
  const handleChange: typeof onChange = (event) => {
    if (fieldProps.disabled || fieldProps.readOnly) {
      return;
    }
    onChange?.(event);
  };

  const ref = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  const clear = () => {
    if (!ref.current) {
      return;
    }
    ref.current.value = String(clearValue || "");
  };

  const props = {
    autoFocus,
    placeholder,
    readOnly: fieldProps.readOnly,
    disabled: fieldProps.disabled,
    className: clsx([
      styles.input,
      fieldProps.disabled && styles.disabled,
      fieldProps.readOnly && styles.readOnly,
    ]),
    onFocus: ((event) => {
      onFocus?.(event);
      if (autoSelect) {
        event.target.select();
      }
    }) as typeof onFocus,
    onBlur,
    onChange: handleChange,
    name,
    value,
    ...(
      {
        [UiInputType.text]: ["pattern"],
        [UiInputType.number]: ["min", "max", "step"],
        [UiInputType.password]: [],
        [UiInputType.textarea]: ["rows"],
      }[htmlType ?? UiInputType.text] as string[]
    ).reduce(
      (a, c) => ({
        ...a,
        [c]: (fieldProps as Record<typeof c, unknown>)[c],
      }),
      {},
    ),
  };

  const [visible, toggleVisibility] = useToggle(false);

  return (
    <UiField
      data-e2e={e2e}
      style={style}
      className={clsx([
        styles.root,
        className,
        ...filteredArray(arrayFrom(fieldProps.modifier)).map(
          (m) => styles[`${m}Modifier`],
        ),
      ])}
      {...fieldProps}
      action={
        <>
          {htmlType === UiInputType.password && (
            <UiPureButton
              tabIndex={-1}
              className={styles.toggle}
              onClick={toggleVisibility}
            >
              <UiIcon
                icon={visible ? Icon.eye1 : Icon.eyeSlash1}
                className={styles.icon}
              />
            </UiPureButton>
          )}
          {clearable &&
            value !== clearValue &&
            typeof value !== "undefined" && (
              <UiPureButton
                tabIndex={-1}
                className={styles.clear}
                onClick={clear}
              >
                <UiIcon icon={Icon.xMarkMini} className={styles.icon} />
              </UiPureButton>
            )}
        </>
      }
    >
      {htmlType === UiInputType.textarea ? (
        <textarea {...props} ref={ref as RefObject<HTMLTextAreaElement>} />
      ) : (
        <input
          {...props}
          type={
            htmlType === UiInputType.password
              ? visible
                ? UiInputType.text
                : htmlType
              : htmlType
          }
          ref={ref as RefObject<HTMLInputElement>}
        />
      )}
    </UiField>
  );
}
