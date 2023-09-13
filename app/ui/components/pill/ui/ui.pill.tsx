import { clsx } from "@clsx";
import { UiPillProps } from "..";

import styles from "./ui.pill.module.scss";
import { UiPureButton } from "../../pure-button";
import { NodeOrIcon } from "../../../utils/nodeOrIcon";

export function UiPill({
  className,
  label,
  children,
  selected,
  ...pureButtonProps
}: UiPillProps) {
  return (
    <UiPureButton
      className={clsx([
        styles.root,
        className,
        pureButtonProps.disabled && styles.disabled,
        selected && styles.selected,
      ])}
      {...pureButtonProps}
    >
      <NodeOrIcon iconClassName={styles.icon} className={styles.label}>
        {label || children}
      </NodeOrIcon>
    </UiPureButton>
  );
}
