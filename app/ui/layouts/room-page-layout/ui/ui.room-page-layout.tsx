import { clsx } from "@clsx";
import { UiRoomPageLayoutProps } from "..";

import styles from "./ui.room-page-layout.module.scss";

export function UiRoomPageLayout({
  className,
  style,
  e2e,
  children,
  header,
}: UiRoomPageLayoutProps) {
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
