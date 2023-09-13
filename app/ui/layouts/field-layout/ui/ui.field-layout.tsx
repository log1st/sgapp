import { clsx } from "@clsx";
import { UiFieldLayoutProps } from "..";

import styles from "./ui.field-layout.module.scss";

export function UiFieldLayout({
  className,
  style,
  e2e,
  error,
  label,
  children,
}: UiFieldLayoutProps) {
  return (
    <div
      data-e2e={e2e}
      style={style}
      className={clsx([styles.root, className])}
    >
      {label && <div className={styles.label}>{label}</div>}
      {children && <div className={styles.field}>{children}</div>}
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
