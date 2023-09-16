import { clsx } from "@clsx";
import { UiRoomTypeLayoutProps } from "..";

import styles from "./ui.room-type-layout.module.scss";
import { NodeOrIcon } from "@/ui/utils/nodeOrIcon";

export function UiRoomTypeLayout({
  className,
  style,
  e2e,
  children,
  icon,
}: UiRoomTypeLayoutProps) {
  return (
    <div
      data-e2e={e2e}
      style={style}
      className={clsx([styles.root, className])}
    >
      <NodeOrIcon className={styles.before} iconClassName={styles.icon}>
        {icon}
      </NodeOrIcon>
      <div className={styles.label}>{children}</div>
    </div>
  );
}
