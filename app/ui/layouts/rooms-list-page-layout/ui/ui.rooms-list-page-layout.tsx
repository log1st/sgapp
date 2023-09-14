import { clsx } from "@clsx";
import { UiRoomsListPageLayoutProps } from "..";

import styles from "./ui.rooms-list-page-layout.module.scss";

export function UiRoomsListPageLayout({
  className,
  style,
  e2e,
  children,
  filter,
}: UiRoomsListPageLayoutProps) {
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
