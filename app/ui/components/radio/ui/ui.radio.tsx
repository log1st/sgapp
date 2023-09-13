import { MouseEventHandler } from "react";
import { clsx } from "@clsx";
import { UiRadioProps } from "..";

import styles from "./ui.radio.module.scss";
import { UiBoxWrapper } from "../../box-wrapper";

export function UiRadio({
  className,
  value,
  checked,
  onChange,
  label,
  children,
  name,
  onClick,
  ...boxWrapperProps
}: UiRadioProps) {
  const handleClick: MouseEventHandler<
    HTMLButtonElement | HTMLAnchorElement
  > = (event) => {
    onClick?.(event);
    onChange?.({
      target: {
        value,
        checked: !checked,
        name,
      },
    });
  };

  return (
    <UiBoxWrapper
      className={clsx([styles.root, className, checked && styles.checked])}
      {...boxWrapperProps}
      active={checked}
      onClick={handleClick}
      label={children || label}
    >
      <div className={styles.box}>
        {checked && <div className={styles.icon} />}
      </div>
    </UiBoxWrapper>
  );
}
