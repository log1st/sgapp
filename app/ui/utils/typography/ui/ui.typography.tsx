import { clsx } from "@clsx";
import { UiTypographyProps, UiTypographyType } from "..";

import styles from "./ui.typography.module.scss";

export function UiTypography({
  className,
  style,
  e2e,
  type = UiTypographyType.medium,
  children,
  color,
}: UiTypographyProps) {
  return (
    <span
      data-e2e={e2e}
      style={{
        ...style,
        color: color && `var(--${color})`,
      }}
      className={clsx([styles.root, className, styles[type]])}
    >
      {children}
    </span>
  );
}
