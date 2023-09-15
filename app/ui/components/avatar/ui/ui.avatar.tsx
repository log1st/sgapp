import { clsx } from "@clsx";
import type { UiAvatarProps } from "..";
import { UiAvatarSize, UiAvatarType } from "..";

import styles from "./ui.avatar.module.scss";
import { UiImage } from "../../image";
import { Icon, UiIcon } from "../../icon";

export function UiAvatar({
  className,
  style,
  e2e,
  icon = Icon.user,
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
        ) : letters ? (
          <div className={styles.letters}>{letters}</div>
        ) : (
          <UiIcon icon={icon} className={styles.icon} />
        )}
      </div>
    </div>
  );
}
