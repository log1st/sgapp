import { clsx } from "@clsx";
import { UiAuthSignInFormLayoutProps } from "..";

import styles from "./ui.auth-sign-in-form-layout.module.scss";

export function UiAuthSignInFormLayout({
  className,
  style,
  e2e,
  children,
}: UiAuthSignInFormLayoutProps) {
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
