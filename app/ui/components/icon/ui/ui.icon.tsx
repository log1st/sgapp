import { clsx } from "@clsx";
import { UiIconProps } from "..";

import styles from "./ui.icon.module.scss";

export function UiIcon({
  className,
  style,
  e2e,
  icon,
  spin,
  size,
}: UiIconProps) {
  const computedSize = size ? `${(size || 0) / 16}rem` : undefined;

  return (
    <svg
      data-e2e={e2e}
      className={clsx([styles.root, className, spin && styles.spin])}
      style={{
        ...style,
        blockSize: computedSize,
        inlineSize: computedSize,
      }}
    >
      <use xlinkHref={`#icon-${icon}`} />
    </svg>
  );
}
