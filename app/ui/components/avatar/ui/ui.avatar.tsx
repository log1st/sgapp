import { clsx } from "@clsx";
import type { UiAvatarProps } from "..";
import { UiAvatarSize, UiAvatarType } from "..";

import styles from "./ui.avatar.module.scss";
import { UiImage } from "../../image";
import { UiIcon } from "../../icon";

export function UiAvatar({
  className,
  style,
  e2e,
  icon,
  image,
  alt = "avatar",
  type = UiAvatarType.rounded,
  letters,
  size = UiAvatarSize.base,
}: UiAvatarProps) {
  return (
    <div
      data-e2e={e2e}
      style={style}
      className={clsx([
        styles.root,
        className,
        styles[`${size}Size`],
        styles[`${type}Type`],
        styles[`${image ? "image" : icon ? "icon" : "letters"}Content`],
      ])}
    >
      <div className={styles.content}>
        {image ? (
          <UiImage alt={alt} className={styles.image} src={image} />
        ) : icon ? (
          <UiIcon icon={icon} className={styles.icon} />
        ) : (
          <div className={styles.letters}>{letters}</div>
        )}
      </div>
    </div>
  );
}
