import { clsx } from "@clsx";
import { UiJeopardyRoomInfoCardLayoutProps } from "..";

import styles from "./ui.jeopardy-room-info-card-layout.module.scss";

export function UiJeopardyRoomInfoCardLayout({
  className,
  style,
  e2e,
  showman,
  players,
  round,
}: UiJeopardyRoomInfoCardLayoutProps) {
  return (
    <div
      data-e2e={e2e}
      style={style}
      className={clsx([styles.root, className])}
    >
      <div className={styles.round}>{round}</div>
      <div className={styles.showman}>{showman}</div>
      <div className={styles.players}>{players}</div>
    </div>
  );
}
