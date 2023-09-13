import { clsx } from "@clsx";
import { UiPaginationLayoutProps } from "..";

import styles from "./ui.pagination-layout.module.scss";

export function UiPaginationLayout({
  className,
  style,
  e2e,
  children,
  previous,
  next,
}: UiPaginationLayoutProps) {
  return (
    <div
      data-e2e={e2e}
      style={style}
      className={clsx([styles.root, className])}
    >
      {previous}
      <div className={styles.field}>{children}</div>
      {next}
    </div>
  );
}
