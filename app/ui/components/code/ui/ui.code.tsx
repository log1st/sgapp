import { clsx } from "@clsx";
import { UiCodeProps } from "..";

import styles from "./ui.code.module.scss";

export function UiCode({
  className,
  style,
  e2e,
  value,
  children,
}: UiCodeProps) {
  return (
    <div
      data-e2e={e2e}
      style={style}
      className={clsx([styles.root, className])}
    >
      {value || children}
    </div>
  );
}
