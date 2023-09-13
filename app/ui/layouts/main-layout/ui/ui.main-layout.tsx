import { clsx } from "@clsx";
import { UiMainLayoutProps } from "..";

import styles from "./ui.main-layout.module.scss";

export function UiMainLayout({
  className,
  style,
  e2e,
  children,
  header,
  side,
}: UiMainLayoutProps) {
  return (
    <div
      data-e2e={e2e}
      style={style}
      className={clsx([styles.root, className])}
    >
      {header && <div className={styles.header}>{header}</div>}
      <div className={styles.content}>
        {side && <div className={styles.side}>{side}</div>}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}
