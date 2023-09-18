import { clsx } from "@clsx";
import { UiJeopardyPacksFilterLayoutProps } from "..";

import styles from "./ui.jeopardy-packs-filter-layout.module.scss";

export function UiJeopardyPacksFilterLayout({
  className,
  style,
  e2e,
  query,
  creator,
  pagination,
  submit,
}: UiJeopardyPacksFilterLayoutProps) {
  return (
    <div
      data-e2e={e2e}
      style={style}
      className={clsx([styles.root, className])}
    >
      {query && <div className={styles.query}>{query}</div>}
      {creator && <div className={styles.creator}>{creator}</div>}
      {submit && <div className={styles.submit}>{submit}</div>}
      {pagination && <div className={styles.pagination}>{pagination}</div>}
    </div>
  );
}
