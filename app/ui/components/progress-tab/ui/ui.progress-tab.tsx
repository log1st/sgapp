import { clsx } from "@clsx";
import { UiProgressTabProps } from "..";

import styles from "./ui.progress-tab.module.scss";
import { UiPureButton } from "../../pure-button";
import { UiIcon } from "../../icon";

export function UiProgressTab({
  className,
  selected,
  icon,
  label,
  children,
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
      ])}
      {...pureButtonProps}
    >
      {icon && <UiIcon className={styles.icon} icon={icon} />}
      <div className={styles.label}>{children || label}</div>
    </UiPureButton>
  );
}
