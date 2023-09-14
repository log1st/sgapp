import { clsx } from "@clsx";
import { UiRoomStatusLayoutProps } from "..";

import styles from "./ui.room-status-layout.module.scss";

export function UiRoomStatusLayout({
  className,
  style,
  e2e,
  children,
}: UiRoomStatusLayoutProps) {
  return (
    <div
      data-e2e={e2e}
      style={style}
      className={clsx([styles.root, className])}
    >
      {children}
    </div>
  );
}
