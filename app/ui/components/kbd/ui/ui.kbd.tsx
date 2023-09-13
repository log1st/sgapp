import { clsx } from "@clsx";
import { UiKbdProps } from "..";

import styles from "./ui.kbd.module.scss";
import { NodeOrIcon } from "../../../utils/nodeOrIcon";

export function UiKbd({ className, style, e2e, children }: UiKbdProps) {
  return (
    <NodeOrIcon
      data-e2e={e2e}
      style={style}
      className={clsx([styles.root, className])}
    >
      {children}
    </NodeOrIcon>
  );
}
