import { clsx } from "@clsx";
import { UiBoxWrapperProps } from "..";

import styles from "./ui.box-wrapper.module.scss";
import { UiPureButton } from "../../pure-button";

export function UiBoxWrapper({
  className,
  style,
  e2e,
  active,
  hint,
  label,
  disabled,
  children,
  panel,
  touched,
  hasError,
  onClick,
}: UiBoxWrapperProps) {
  return (
    <UiPureButton
      data-e2e={e2e}
      style={style}
      className={clsx([
        styles.root,
        className,
        active && styles.active,
        disabled && styles.disabled,
        panel && styles.panel,
        touched && styles.touched,
        hasError && styles.hasError,
      ])}
      span="label"
      onClick={onClick}
    >
      <div className={styles.header}>
        <div className={styles.box}>{children}</div>
        {label && <div className={styles.label}>{label}</div>}
      </div>
      {hint && <div className={styles.hint}>{hint}</div>}
    </UiPureButton>
  );
}
