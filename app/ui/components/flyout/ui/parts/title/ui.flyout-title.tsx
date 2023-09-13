import { PropsWithChildren, ReactNode } from "react";

import styles from "./ui.flyout-title.module.scss";

export type UiFlyoutTitleProps = PropsWithChildren<{
  title?: ReactNode;
  side?: ReactNode;
}>;

export function UiFlyoutTitle({ side, title, children }: UiFlyoutTitleProps) {
  return (
    <div className={styles.root}>
      <div className={styles.title}>{title || children}</div>
      {side && <div className={styles.side}>{side}</div>}
    </div>
  );
}
