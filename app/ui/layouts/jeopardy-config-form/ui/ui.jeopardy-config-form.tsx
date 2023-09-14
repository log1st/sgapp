import { clsx } from "@clsx";
import { UiJeopardyConfigFormProps } from "..";

import styles from "./ui.jeopardy-config-form.module.scss";

export function UiJeopardyConfigForm({
  className,
  style,
  e2e,
  children,
}: UiJeopardyConfigFormProps) {
  return (
    <div
      data-e2e={e2e}
      style={style}
      className={clsx([styles.root, className])}
    >
      {children}
    </div>
  );
}
