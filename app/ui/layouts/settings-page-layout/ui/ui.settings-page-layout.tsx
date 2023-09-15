import { clsx } from "@clsx";
import { UiSettingsPageLayoutProps } from "..";

import styles from "./ui.settings-page-layout.module.scss";

export function UiSettingsPageLayout({
  className,
  style,
  e2e,
  children,
}: UiSettingsPageLayoutProps) {
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
