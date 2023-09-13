import { clsx, arrayFrom } from "@/utils";
import { UiToastProps, UiToastStatus } from "..";

import styles from "./ui.toast.module.scss";
import { Icon, UiIcon } from "../../icon";
import { UiPureButton } from "../../pure-button";
import { NodeOrIcon } from "../../../utils/nodeOrIcon";

export function UiToast({
  className,
  style,
  e2e,
  icon,
  message,
  title,
  status = UiToastStatus.info,
  actions,
}: UiToastProps) {
  return (
    <div
      data-e2e={e2e}
      style={style}
      className={clsx([styles.root, className, styles[`${status}Status`]])}
    >
      <div className={styles.content}>
        {!!(icon || title) && (
          <div className={styles.header}>
            {icon && <UiIcon icon={icon} className={styles.icon} />}
            <div className={styles.title}>{title}</div>
          </div>
        )}
        {message && <div className={styles.message}>{message}</div>}
      </div>
      {actions && (
        <div className={styles.actions}>
          {arrayFrom(actions).map(
            ({ key, loading, label, primary, ...action }) => (
              <UiPureButton
                key={key}
                {...action}
                className={clsx([
                  styles.action,
                  loading && styles.loading,
                  primary && styles.primary,
                  action.disabled && styles.disabled,
                ])}
                disabled={action.disabled || loading}
              >
                <NodeOrIcon
                  className={styles.actionLabel}
                  iconClassName={styles.actionIcon}
                >
                  {label}
                </NodeOrIcon>
                {loading && (
                  <div className={styles.loader}>
                    <UiIcon
                      icon={Icon.spinner}
                      className={styles.loaderIcon}
                      spin
                    />
                  </div>
                )}
              </UiPureButton>
            ),
          )}
        </div>
      )}
    </div>
  );
}
