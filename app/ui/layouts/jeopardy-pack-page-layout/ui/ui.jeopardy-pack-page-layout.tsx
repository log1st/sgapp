import { clsx } from "@clsx";
import { UiJeopardyPackPageLayoutProps } from "..";

import styles from "./ui.jeopardy-pack-page-layout.module.scss";

export function UiJeopardyPackPageLayout({
  className,
  style,
  e2e,
  header,
  children,
}: UiJeopardyPackPageLayoutProps) {
  return (
    <div
      data-e2e={e2e}
      style={style}
      className={clsx([styles.root, className])}
    >
      {header && <div className={styles.header}>{header}</div>}
      <div className={styles.body}>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
