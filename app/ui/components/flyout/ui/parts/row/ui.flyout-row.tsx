import { PropsWithChildren, ReactNode } from "react";
import { clsx } from "@clsx";
import { Icon, UiIcon } from "../../../../icon";
import { UiBadge, UiBadgeProps, UiBadgeSize } from "../../../../badge";
import { UiPureButton, UiPureButtonCommonProps } from "../../../../pure-button";

import styles from "./ui.flyout-row.module.scss";
import { NodeOrIcon } from "@/app/ui/utils/nodeOrIcon";

export type FlyoutRowProps = PropsWithChildren<
  UiPureButtonCommonProps & {
    checked?: boolean;
    radio?: boolean;
    icon?: Icon | ReactNode;
    loading?: boolean;
    label?: ReactNode;
    hint?: ReactNode;
    badge?: UiBadgeProps;
    danger?: boolean;
  }
>;

export function UiFlyoutRow({
  badge,
  hint,
  icon,
  checked,
  label,
  children,
  radio,
  onClick,
  danger,
  loading,
  interactive = true,
  ...pureButtonProps
}: FlyoutRowProps) {
  return (
    <UiPureButton
      onClick={onClick}
      disabled={pureButtonProps.disabled}
      className={clsx([
        styles.root,
        checked && styles.checked,
        pureButtonProps.disabled && styles.disabled,
        danger && styles.danger,
        interactive && styles.interactive,
      ])}
      {...pureButtonProps}
    >
      {checked && (
        <UiIcon
          icon={radio ? Icon.ellipseMiniSolid : Icon.checkMini}
          className={styles.check}
        />
      )}
      <NodeOrIcon iconClassName={styles.icon} className={styles.before}>
        {loading ? (
          <UiIcon icon={Icon.spinner} className={styles.icon} spin />
        ) : (
          icon
        )}
      </NodeOrIcon>
      <div className={styles.label}>{label || children}</div>
      {hint && <div className={styles.hint}>{hint}</div>}
      {badge && <UiBadge size={UiBadgeSize.small} {...badge} />}
    </UiPureButton>
  );
}
