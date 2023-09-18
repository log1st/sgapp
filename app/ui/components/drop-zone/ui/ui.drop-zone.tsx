"use client";

import { clsx } from "@clsx";
import { useToggle } from "react-use";
import { DragEventHandler, MouseEventHandler } from "react";
import { UiDropZoneProps } from "..";

import styles from "./ui.drop-zone.module.scss";
import { NodeOrIcon } from "@/ui/utils/nodeOrIcon";
import { Icon, UiIcon } from "@/ui/components/icon";
import { arrayFrom } from "@/utils";

export function UiDropZone({
  className,
  style,
  e2e,
  name,
  fetchData = fetch,
  onChange,
  label,
  disabled,
  icon,
  children,
  hint,
  accept,
  multiple = false,
}: UiDropZoneProps) {
  const handleDrop = (files: Array<File>) => {
    if (disabled) {
      return;
    }

    onChange?.({
      target: {
        name,
        value: files,
      },
    });
  };

  const [focused, setFocused] = useToggle(false);
  const [loading, setLoading] = useToggle(false);

  const onClick: MouseEventHandler = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = arrayFrom(accept).join(",");
    input.multiple = multiple;
    input.addEventListener("change", () => {
      handleDrop(Array.from(input.files || []));
      input.remove();
    });
    input.click();
  };

  const onDrop: DragEventHandler = async (event) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    const items = Array.from(event.dataTransfer.files);

    const data = event.dataTransfer.getData("text/plain");

    setFocused(false);

    if (data.trim().length) {
      try {
        const url = new URL(data);
        setLoading(true);
        const response = await fetchData(url);

        const contentType = response.headers.get("Content-Type");

        if (!contentType || contentType.startsWith("text")) {
          return;
        }

        const blob = await response.blob();

        const file = new File([blob], "file", {
          type: contentType,
        });

        items.push(file);
      } finally {
        setLoading(false);
      }
    }

    handleDrop(items);
  };

  const onDragEnter: DragEventHandler = (event) => {
    event.preventDefault();
    setFocused(true);
  };
  const onDragLeave: DragEventHandler = (event) => {
    event.preventDefault();
    setFocused(false);
  };

  return (
    <button
      type="button"
      onDrop={onDrop}
      onDragEnter={onDragEnter}
      onDragOver={onDragEnter}
      onDragLeave={onDragLeave}
      onClick={onClick}
      data-e2e={e2e}
      style={style}
      disabled={disabled}
      className={clsx([
        styles.root,
        disabled && styles.disabled,
        focused && styles.focused,
        loading && styles.loading,
        className,
      ])}
    >
      {icon && (
        <NodeOrIcon className={styles.before} iconClassName={styles.icon}>
          {icon}
        </NodeOrIcon>
      )}
      <div className={styles.label}>{label || children}</div>
      {hint && <div className={styles.hint}>{hint}</div>}
      {loading && (
        <div className={styles.loader}>
          <UiIcon icon={Icon.spinner} spin className={styles.loaderIcon} />
        </div>
      )}
    </button>
  );
}
