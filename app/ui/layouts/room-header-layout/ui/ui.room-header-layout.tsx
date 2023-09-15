import { clsx } from "@clsx";
import { UiRoomHeaderLayoutProps } from "..";

import styles from "./ui.room-header-layout.module.scss";
import { NodeOrIcon } from "@/ui/utils/nodeOrIcon";

export function UiRoomHeaderLayout({
  className,
  style,
  e2e,
  title,
  icon,
  creator,
  status,
}: UiRoomHeaderLayoutProps) {
  return (
    <div
      data-e2e={e2e}
      style={style}
      className={clsx([styles.root, className])}
    >
      <NodeOrIcon iconClassName={styles.icon} className={styles.iconWrapper}>
        {icon}
      </NodeOrIcon>
      <div className={styles.title}>{title}</div>
      {status && <div className={styles.status}>{status}</div>}
      {creator && <div className={styles.creator}>{creator}</div>}
    </div>
  );
}
