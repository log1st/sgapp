import { clsx } from "@clsx";
import { UiAuthLayoutProps } from "..";

import styles from "./ui.auth-layout.module.scss";

export function UiAuthLayout({
  className,
  style,
  e2e,
  logo,
  children,
  actions,
}: UiAuthLayoutProps) {
  return (
    <div
      data-e2e={e2e}
      style={style}
      className={clsx([styles.root, className])}
    >
      {actions && <div className={styles.actions}>{actions}</div>}
      <div className={styles.content}>
        {logo && <div className={styles.logo}>{logo}</div>}
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
