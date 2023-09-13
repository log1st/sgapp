import { clsx } from "@clsx";
import { UiFlyoutProps } from "..";

import styles from "./ui.flyout.module.scss";

export function UiFlyout({ className, style, e2e, children }: UiFlyoutProps) {
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
