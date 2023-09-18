import { clsx, filteredArray } from "@/utils";
import { UiBadgeColor, UiBadgeProps, UiBadgeSize, UiBadgeType } from "..";

import styles from "./ui.badge.module.scss";
import { Icon, icons } from "../../icon";
import { NodeOrIcon } from "@/app/ui/utils/nodeOrIcon";

export function UiBadge({
  className,
  style,
  e2e,
  before,
  children,
  size = UiBadgeSize.base,
  color = UiBadgeColor.gray,
  type = UiBadgeType.squared,
  label,
  after,
  interactive,
}: UiBadgeProps) {
  return (
    <div
      data-e2e={e2e}
      style={style}
      className={clsx([
        styles.root,
        className,
        styles[`${size}Size`],
        styles[`${color}Color`],
        styles[`${type}Type`],
        interactive && styles.interactive,
        filteredArray([before, label, children, after]).length === 1 &&
          [before, label, children, after].some((i) =>
            icons.includes(i as Icon),
          ) &&
          styles.iconOnly,
      ])}
    >
      <NodeOrIcon iconClassName={styles.icon} className={styles.before}>
        {before}
      </NodeOrIcon>
      <NodeOrIcon iconClassName={styles.icon} className={styles.label}>
        {label || children}
      </NodeOrIcon>
      <NodeOrIcon iconClassName={styles.icon} className={styles.after}>
        {after}
      </NodeOrIcon>
    </div>
  );
}
