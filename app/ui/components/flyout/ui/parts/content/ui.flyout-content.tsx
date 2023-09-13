import { PropsWithChildren } from "react";

import { clsx } from "@clsx";
import styles from "./ui.flyout-content.module.scss";

export enum UiFlyoutContentType {
  actions = "actions",
  custom = "custom",
  loader = "loader",
  skeleton = "skeleton",
}

export type UiFlyoutContentProps = PropsWithChildren<{
  type?: UiFlyoutContentType;
}>;

export function UiFlyoutContent({
  children,
  type = UiFlyoutContentType.custom,
}: UiFlyoutContentProps) {
  return <div className={clsx([styles.root, styles[type]])}>{children}</div>;
}
