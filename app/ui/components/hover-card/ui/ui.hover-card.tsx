import { clsx } from "@clsx";
import { isValidElement } from "react";
import { UiHoverCardProps } from "..";

import styles from "./ui.hover-card.module.scss";
import { UiAvatar, UiAvatarProps, UiAvatarSize } from "../../avatar";
import { UiPureButton } from "../../pure-button";

export function UiHoverCard({
  avatar,
  hint,
  title,
  card = true,
  children,
  style,
  ...pureButtonProps
}: UiHoverCardProps) {
  return (
    <UiPureButton
      {...pureButtonProps}
      className={clsx([
        styles.root,
        pureButtonProps.className,
        card && styles.card,
        (pureButtonProps.href || pureButtonProps.onClick) && styles.interactive,
      ])}
      style={style}
    >
      {avatar &&
        (isValidElement(avatar) ? (
          avatar
        ) : (
          <UiAvatar
            {...(typeof avatar === "string"
              ? { image: avatar }
              : (avatar as UiAvatarProps))}
            className={styles.avatar}
            size={UiAvatarSize.base}
          />
        ))}
      <div className={styles.content}>
        {children || (
          <>
            <div className={styles.title}>{title}</div>
            <div className={styles.hint}>{hint}</div>
          </>
        )}
      </div>
    </UiPureButton>
  );
}
