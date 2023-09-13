import { clsx } from "@clsx";
import { UiAuthSignUpFormLayoutProps } from "..";

import styles from "./ui.auth-sign-up-form-layout.module.scss";

export function UiAuthSignUpFormLayout({
  className,
  style,
  e2e,
  children,
}: UiAuthSignUpFormLayoutProps) {
  return (
    <div
      data-e2e={e2e}
      style={style}
      className={clsx([styles.root, className])}
    >
      {children}
    </div>
  );
}
