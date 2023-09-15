import { clsx } from "@clsx";
import { UiAvatarsStackProps } from "..";

import styles from "./ui.avatars-stack.module.scss";

export function UiAvatarsStack({
  className,
  style,
  e2e,
  children,
}: UiAvatarsStackProps) {
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
