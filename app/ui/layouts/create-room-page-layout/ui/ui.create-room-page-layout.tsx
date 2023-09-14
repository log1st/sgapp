import { clsx } from "@clsx";
import { UiCreateRoomPageLayoutProps } from "..";

import styles from "./ui.create-room-page-layout.module.scss";

export function UiCreateRoomPageLayout({
  className,
  style,
  e2e,
  children,
}: UiCreateRoomPageLayoutProps) {
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
