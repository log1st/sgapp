import { clsx } from "@clsx";
import { UiKbdProps } from "..";

import styles from "./ui.kbd.module.scss";
import { NodeOrIcon } from "../../../utils/nodeOrIcon";

export function UiKbd({
  className,
  style,
  e2e,
  children,
  square,
  align,
}: UiKbdProps) {
  return (
    <NodeOrIcon
      data-e2e={e2e}
      style={{
        ...style,
        verticalAlign: align,
      }}
      className={clsx([styles.root, className, square && styles.square])}
    >
      {children}
    </NodeOrIcon>
  );
}
