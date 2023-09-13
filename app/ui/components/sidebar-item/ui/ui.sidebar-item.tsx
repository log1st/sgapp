"use client";

import { clsx } from "@clsx";
import { UiSidebarItemProps, UiSidebarItemType } from "..";

import styles from "./ui.sidebar-item.module.scss";
import { UiPureButton } from "../../pure-button";
import { UiBadge } from "../../badge";
import { NodeOrIcon } from "@/app/ui/utils/nodeOrIcon";

export function UiSidebarItem({
  className,
  icon,
  label,
  children,
  badge,
  hint,
  appendIcon,
  type = UiSidebarItemType.primary,
  ...pureButtonProps
}: UiSidebarItemProps) {
  return (
    <UiPureButton
      {...pureButtonProps}
      className={clsx([
        styles.root,
        className,
        pureButtonProps.active && styles.active,
        styles[`${type}Type`],
      ])}
    >
      {icon && (
        <NodeOrIcon className={styles.before} iconClassName={styles.icon}>
          {icon}
        </NodeOrIcon>
      )}
      <div className={styles.label}>{label || children}</div>
      {badge && <UiBadge className={styles.badge} {...badge} />}
      {hint && <div className={styles.hint}>{hint}</div>}
      {appendIcon && (
        <NodeOrIcon className={styles.after} iconClassName={styles.appendIcon}>
          {appendIcon}
        </NodeOrIcon>
      )}
    </UiPureButton>
  );
}
