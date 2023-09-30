import { clsx } from "@clsx";
import { UiJeopardyPackHeaderLayoutProps } from "..";

import styles from "./ui.jeopardy-pack-header-layout.module.scss";
import { NodeOrIcon } from "@/ui/utils/nodeOrIcon";

export function UiJeopardyPackHeaderLayout({
  className,
  style,
  e2e,
  title,
  creator,
  status,
}: UiJeopardyPackHeaderLayoutProps) {
  return (
    <div
      data-e2e={e2e}
      style={style}
      className={clsx([styles.root, className])}
    >
      <div className={styles.title}>{title}</div>
      {status && <div className={styles.status}>{status}</div>}
      {creator && <div className={styles.creator}>{creator}</div>}
    </div>
  );
}
