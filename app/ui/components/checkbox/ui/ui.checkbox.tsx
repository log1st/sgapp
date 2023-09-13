"use client";

import { ChangeEventHandler } from "react";
import { clsx } from "@clsx";
import { UiCheckboxProps } from "..";

import styles from "./ui.checkbox.module.scss";
import { UiBoxWrapper } from "../../box-wrapper";
import { Icon, UiIcon } from "../../icon";

export function UiCheckbox({
  className,
  value,
  checked,
  indeterminate,
  onChange,
  label,
  children,
  name,
  onClick,
  ...boxWrapperProps
}: UiCheckboxProps) {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (boxWrapperProps.disabled) {
      return;
    }
    onChange?.(event);
  };

  return (
    <UiBoxWrapper
      className={clsx([
        styles.root,
        className,
        checked && styles.checked,
        indeterminate && styles.indeterminate,
      ])}
      {...boxWrapperProps}
      active={checked || indeterminate}
      onClick={onClick}
      label={children || label}
    >
      <input
        type="checkbox"
        className={styles.input}
        checked={checked}
        value={value}
        name={name}
        onChange={handleChange}
      />
      <div className={styles.box}>
        {(checked || indeterminate) && (
          <UiIcon
            icon={checked ? Icon.checkMini : Icon.minusMini}
            className={styles.icon}
          />
        )}
      </div>
    </UiBoxWrapper>
  );
}
