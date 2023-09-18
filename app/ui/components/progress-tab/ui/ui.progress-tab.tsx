import { clsx } from "@clsx";
import { UiProgressTabProps } from "..";

import styles from "./ui.progress-tab.module.scss";
import { UiPureButton } from "../../pure-button";
import { NodeOrIcon } from "@/ui/utils/nodeOrIcon";

export function UiProgressTab({
  className,
  selected,
  icon,
  label,
  children,
  after,
  hasError,
  ...pureButtonProps
}: UiProgressTabProps) {
  return (
    <UiPureButton
      className={clsx([
        styles.root,
        className,
        selected && styles.selected,
        pureButtonProps.active && styles.active,
        pureButtonProps.disabled && styles.disabled,
        hasError && styles.hasError,
      ])}
      {...pureButtonProps}
    >
      <NodeOrIcon className={styles.before} iconClassName={styles.icon}>
        {icon}
      </NodeOrIcon>
      {(children || label) && (
        <div className={styles.label}>{children || label}</div>
      )}
      <NodeOrIcon className={styles.after} iconClassName={styles.icon}>
        {after}
      </NodeOrIcon>
    </UiPureButton>
  );
}
