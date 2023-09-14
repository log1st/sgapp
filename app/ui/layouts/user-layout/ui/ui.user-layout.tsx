import { clsx } from "@clsx";
import { UiUserLayoutProps } from "..";

import styles from "./ui.user-layout.module.scss";

export function UiUserLayout({
  className,
  style,
  e2e,
  children,
  avatar,
}: UiUserLayoutProps) {
  return (
    <div
      data-e2e={e2e}
      style={style}
      className={clsx([styles.root, className])}
    >
      {avatar && <div className={styles.avatar}>{avatar}</div>}
      <div className={styles.body}>{children}</div>
    </div>
  );
}
