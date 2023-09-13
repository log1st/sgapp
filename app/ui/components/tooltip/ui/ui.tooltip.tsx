import { clsx, arrayFrom } from "@/utils";
import { UiTooltipProps } from "..";

import styles from "./ui.tooltip.module.scss";
import { UiKbd } from "../../kbd";
import { UiButton } from "../../button";

export function UiTooltip({
  className,
  style,
  e2e,
  kbd,
  children,
  label,
  action,
}: UiTooltipProps) {
  return (
    <div
      data-e2e={e2e}
      style={style}
      className={clsx([styles.root, className])}
    >
      <div className={styles.body}>
        <div className={styles.label}>{label || children}</div>
        {kbd ? (
          <div className={styles.kbds}>
            {arrayFrom(kbd).map(({ key, ...k }) => (
              <UiKbd key={key} {...k} />
            ))}
          </div>
        ) : null}
      </div>
      {action ? (
        <div className={styles.actions}>
          {arrayFrom(action).map(({ key, ...a }) => (
            <UiButton key={key} {...a} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
