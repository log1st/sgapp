"use client";

import { arrayFrom, clsx, filteredArray } from "@/utils";
import { UiButtonProps, UiButtonSize, UiButtonVariant } from "..";

import styles from "./ui.button.module.scss";
import { UiPureButton } from "../../pure-button";
import { Icon, icons, UiIcon } from "../../icon";
import { NodeOrIcon } from "@/app/ui/utils/nodeOrIcon";

export function UiButton({
  className,
  variant = UiButtonVariant.primary,
  size = UiButtonSize.base,
  loading = false,
  label,
  children,
  before,
  modifier,
  after,
  ...pureButtonProps
}: UiButtonProps) {
  return (
    <UiPureButton
      className={clsx([
        styles.root,
        className,
        styles[`${variant}Variant`],
        styles[`${size}Size`],
        loading && styles.loading,
        pureButtonProps.active && styles.active,
        pureButtonProps.disabled && styles.disabled,
        filteredArray([before, label, children, after]).length === 1 &&
          [before, label, children, after].some((i) =>
            icons.includes(i as Icon),
          ) &&
          styles.iconOnly,
        ...filteredArray(arrayFrom(modifier)).map(
          (m) => styles[`${m}Modifier`],
        ),
      ])}
      {...pureButtonProps}
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
      {loading && (
        <div className={styles.loader}>
          <UiIcon icon={Icon.spinner} spin className={styles.loaderIcon} />
        </div>
      )}
    </UiPureButton>
  );
}
