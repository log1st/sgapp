import { clsx } from "@clsx";
import { UiHintProps, UiHintType } from "..";

import styles from "./ui.hint.module.scss";
import { UiIcon } from "../../icon";

export function UiHint({
  className,
  style,
  e2e,
  label,
  icon,
  type = UiHintType.normal,
  children,
}: UiHintProps) {
  return (
    <div
      data-e2e={e2e}
      style={style}
      className={clsx([styles.root, className, styles[`${type}Type`]])}
    >
      {icon && <UiIcon icon={icon} className={styles.icon} />}
      <div className={styles.label}>{label || children}</div>
    </div>
  );
}
