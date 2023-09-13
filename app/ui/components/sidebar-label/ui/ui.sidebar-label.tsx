import { clsx } from "@clsx";
import { UiSidebarLabelProps, UiSidebarLabelType } from "..";

import styles from "./ui.sidebar-label.module.scss";
import { NodeOrIcon } from "@/app/ui/utils/nodeOrIcon";

export function UiSidebarLabel({
  className,
  style,
  e2e,
  label,
  icon,
  appendIcon,
  type = UiSidebarLabelType.label,
  children,
}: UiSidebarLabelProps) {
  return (
    <div
      data-e2e={e2e}
      style={style}
      className={clsx([styles.root, className, styles[`${type}Type`]])}
    >
      {icon && (
        <NodeOrIcon className={styles.before} iconClassName={styles.icon}>
          {children}
        </NodeOrIcon>
      )}
      <div className={styles.label}>{label || children}</div>
      {appendIcon && (
        <NodeOrIcon
          noIconClassName={styles.noIconAfter}
          className={styles.after}
          iconClassName={styles.icon}
        >
          {appendIcon}
        </NodeOrIcon>
      )}
    </div>
  );
}
