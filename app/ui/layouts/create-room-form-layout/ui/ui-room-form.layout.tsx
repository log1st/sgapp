import { clsx } from "@clsx";
import { UiRoomFormLayoutProps } from "..";

import styles from "./ui.room-form-layout.module.scss";

export function UiRoomFormLayout({
  className,
  style,
  e2e,
  type,
  privateField,
  title,
  password,
  slug,
  children,
}: UiRoomFormLayoutProps) {
  return (
    <div
      data-e2e={e2e}
      style={style}
      className={clsx([styles.root, className])}
    >
      <div className={styles.type}>{type}</div>
      <div className={styles.title}>{title}</div>
      <div className={styles.slug}>{slug}</div>
      <div className={styles.password}>{password}</div>
      <div className={styles.privateField}>{privateField}</div>
      {children && <div className={styles.body}>{children}</div>}
    </div>
  );
}
