import { clsx } from "@clsx";
import { UiLabelProps } from "..";

import styles from "./ui.label.module.scss";
import { UiIcon } from "../../icon";

export function UiLabel({
  className,
  style,
  e2e,
  hint,
  children,
  icon,
  label,
}: UiLabelProps) {
  return (
    <div
      data-e2e={e2e}
      style={style}
      className={clsx([styles.root, className])}
    >
      <div className={styles.label}>{label || children}</div>
      {hint && <div className={styles.hint}>{hint}</div>}
      {icon && <UiIcon icon={icon} className={styles.icon} />}
    </div>
  );
}
