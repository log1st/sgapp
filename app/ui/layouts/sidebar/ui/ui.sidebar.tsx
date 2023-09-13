"use client";

import { MouseEventHandler, PropsWithChildren } from "react";
import { clsx } from "@clsx";
import { UiSidebarProps } from "..";

import styles from "./ui.sidebar.module.scss";
import { UiPureButton } from "../../../components/pure-button";
import { UiIcon, Icon } from "../../../components/icon";
import { useOptimistic } from "@/hooks";

export function UiSidebar({
  className,
  style,
  e2e,
  avatar,
  changeExpanded,
  expandable,
  expanded = true,
  hint,
  label,
  children,
}: UiSidebarProps) {
  const [e, setE] = useOptimistic(expanded);
  const toggleE: MouseEventHandler<HTMLButtonElement> = (event) => {
    setE(!e);
    changeExpanded?.(event);
  };

  return (
    <div
      data-e2e={e2e}
      style={style}
      className={clsx([styles.root, className, e && styles.expanded])}
    >
      {!!(avatar || expandable) && (
        <div className={styles.header}>
          {avatar && <div className={styles.avatar}>{avatar}</div>}
          {expandable && (
            <UiPureButton onClick={toggleE} className={styles.toggle}>
              <UiIcon icon={Icon.barsThree} className={styles.toggleIcon} />
            </UiPureButton>
          )}
        </div>
      )}
      <div className={styles.hint}>{hint}</div>
      <div className={styles.label}>{label}</div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}

export function UiSidebarGroup({
  children,
  margin,
}: PropsWithChildren<{ margin?: boolean }>) {
  return (
    <div className={clsx([styles.content, margin && styles.margin])}>
      {children}
    </div>
  );
}

export function UiSidebarDelimiter() {
  return <div className={styles.delimiter} />;
}
