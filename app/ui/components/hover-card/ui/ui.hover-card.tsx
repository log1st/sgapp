import { clsx } from "@clsx";
import { UiHoverCardProps } from "..";

import styles from "./ui.hover-card.module.scss";
import { UiAvatar, UiAvatarSize } from "../../avatar";
import { UiPureButton } from "../../pure-button";

export function UiHoverCard({
  avatar,
  hint,
  title,
  card = true,
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
    >
      {avatar && (
        <UiAvatar
          {...(typeof avatar === "string" ? { image: avatar } : avatar)}
          className={styles.avatar}
          size={UiAvatarSize.base}
        />
      )}
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div className={styles.hint}>{hint}</div>
      </div>
    </UiPureButton>
  );
}
