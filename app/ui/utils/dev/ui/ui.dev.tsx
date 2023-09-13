"use client";

import { useRef } from "react";
import { useToggle } from "react-use";
import { clsx } from "@clsx";
import { UiDevProps } from "../index";

import styles from "./ui.dev.module.scss";
import { UiDialog } from "../../../components/dialog";
import { useDraggable } from "@/hooks";

export function UiDev({ children, title }: UiDevProps) {
  const [min, toggleMin] = useToggle(false);

  const ref = useRef<HTMLDivElement | null>(null);
  const { dragState, dragging } = useDraggable(ref);

  return (
    <UiDialog
      className={clsx([
        styles.root,
        dragging && styles.dragging,
        min && styles.min,
      ])}
      style={{
        insetBlockStart: `${dragState.y}px`,
        insetInlineStart: `${dragState.x}px`,
        width: min ? "" : undefined,
        height: min ? "" : undefined,
      }}
      title={
        <div className={styles.title} ref={ref}>
          {title}
        </div>
      }
      actions={[
        {
          key: "min",
          label: min ? "Max" : "Min",
          onClick: toggleMin,
        },
      ]}
    >
      {!min && children}
    </UiDialog>
  );
}
