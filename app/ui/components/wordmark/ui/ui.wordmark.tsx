import { clsx } from "@clsx";
import { UiWordmarkProps } from "..";

import styles from "./ui.wordmark.module.scss";

export function UiWordmark({
  className,
  style,
  e2e,
  children,
}: UiWordmarkProps) {
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
