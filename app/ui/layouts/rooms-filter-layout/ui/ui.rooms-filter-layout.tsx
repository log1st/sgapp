import { clsx } from "@clsx";
import { UiRoomsFilterLayoutProps } from "..";

import styles from "./ui.rooms-filter-layout.module.scss";

export function UiRoomsFilterLayout({
  className,
  style,
  e2e,
  type,
  query,
  status,
  password,
  pagination,
  submit,
}: UiRoomsFilterLayoutProps) {
  return (
    <div
      data-e2e={e2e}
      style={style}
      className={clsx([styles.root, className])}
    >
      {type && <div className={styles.type}>{type}</div>}
      {query && <div className={styles.query}>{query}</div>}
      {status && <div className={styles.status}>{status}</div>}
      {password && <div className={styles.password}>{password}</div>}
      {submit && <div className={styles.submit}>{submit}</div>}
      {pagination && <div className={styles.pagination}>{pagination}</div>}
    </div>
  );
}
