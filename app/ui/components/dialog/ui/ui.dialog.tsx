import { clsx } from "@clsx";
import { UiDialogProps } from "..";

import styles from "./ui.dialog.module.scss";
import { UiActiveActions } from "../../active-actions";

export function UiDialog<Entity>({
  className,
  style,
  e2e,
  description,
  footer,
  extended,
  header,
  title,
  children,
  actions,
  record,
  overflow,
}: UiDialogProps<Entity>) {
  return (
    <div
      data-e2e={e2e}
      style={style}
      className={clsx([
        styles.root,
        className,
        extended && styles.extended,
        overflow && styles.overflow,
      ])}
    >
      {header && <div className={styles.top}>{header}</div>}
      {(title || description) && (
        <div className={styles.header}>
          {title && <div className={styles.title}>{title}</div>}
          {description && (
            <div className={styles.description}>{description}</div>
          )}
        </div>
      )}
      {children && <div className={styles.body}>{children}</div>}
      {(footer || actions) && (
        <div className={styles.footer}>
          {footer}
          {actions && (
            <UiActiveActions<Entity>
              actions={actions}
              record={record}
              className={styles.actions}
            />
          )}
        </div>
      )}
    </div>
  );
}
