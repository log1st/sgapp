"use client";

import { clsx } from "@clsx";
import { useEffect, useRef } from "react";
import { UiModalProps } from "..";

import styles from "./ui.modal.module.scss";
import { contains } from "@/utils";

export function UiModal({
  className,
  style,
  e2e,
  children,
  onBackdropClick,
}: UiModalProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!onBackdropClick) {
      return () => {};
    }
    const handle = (event: MouseEvent) => {
      if (!ref.current) {
        return;
      }
      if (
        event.target instanceof Element &&
        contains(ref.current, event.target)
      ) {
        return;
      }
      onBackdropClick?.();
    };
    document.addEventListener("click", handle);
    return () => {
      document.removeEventListener("click", handle);
    };
  }, []);

  return (
    <>
      <div
        className={clsx([
          styles.backdrop,
          onBackdropClick && styles.interactive,
        ])}
      />
      <div
        ref={ref}
        data-e2e={e2e}
        style={style}
        className={clsx([styles.root, className])}
      >
        {children}
      </div>
    </>
  );
}
