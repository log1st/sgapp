import { clsx } from "@clsx";
import { UiAvatarEditorProps } from "..";

import styles from "./ui.avatar-editor.module.scss";

export function UiAvatarEditor({
  className,
  style,
  e2e,
  children,
  action,
  error,
}: UiAvatarEditorProps) {
  return (
    <div
      data-e2e={e2e}
      style={style}
      className={clsx([styles.root, className])}
    >
      <div className={styles.content}>{children}</div>
      {action && <div className={styles.action}>{action}</div>}
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
