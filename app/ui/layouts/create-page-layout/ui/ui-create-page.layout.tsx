import { clsx } from "@clsx";
import { UiCreatePageLayoutProps } from "..";

import styles from "./ui.create-page-layout.module.scss";

export function UiCreatePageLayout({
  className,
  style,
  e2e,
  children,
}: UiCreatePageLayoutProps) {
  return (
    <div
      data-e2e={e2e}
      style={style}
      className={clsx([styles.root, className])}
    >
      <div className={styles.body}>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
