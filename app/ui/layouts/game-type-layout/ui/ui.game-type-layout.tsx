import { clsx } from "@clsx";
import { UiGameTypeLayoutProps } from "..";

import styles from "./ui.game-type-layout.module.scss";
import { NodeOrIcon } from "@/ui/utils/nodeOrIcon";

export function UiGameTypeLayout({
  className,
  style,
  e2e,
  children,
  icon,
}: UiGameTypeLayoutProps) {
  return (
    <div
      data-e2e={e2e}
      style={style}
      className={clsx([styles.root, className])}
    >
      <NodeOrIcon className={styles.before} iconClassName={styles.icon}>
        {icon}
      </NodeOrIcon>
      <div className={styles.type}>{children}</div>
    </div>
  );
}
