import { clsx } from "@clsx";
import { UiListPageLayoutProps } from "..";

import styles from "./ui.list-page-layout.module.scss";

export function UiListPageLayout({
  className,
  style,
  e2e,
  children,
  filter,
}: UiListPageLayoutProps) {
  return (
    <div
      data-e2e={e2e}
      style={style}
      className={clsx([styles.root, className])}
    >
      <div className={styles.body}>
        <div className={styles.content}>{children}</div>
      </div>
      {filter && <div className={styles.filter}>{filter}</div>}
    </div>
  );
}
