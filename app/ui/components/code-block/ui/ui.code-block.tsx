import { Key, MouseEventHandler, useState } from "react";
import { arrayFrom, clsx } from "@/utils";
import styles from "./ui.code-block.module.scss";
import {
  UiCodeBlockAction,
  UiCodeBlockContent,
  UiCodeBlockProps,
  UiCodeBlockTheme,
  UiCodeBlockType,
} from "..";
import { UiPureButton } from "../../pure-button";
import { UiIcon } from "../../icon";
import { UiBadge } from "../../badge";

type CodeBlockActionsProps = Pick<UiCodeBlockProps, "actions"> & {
  pill?: UiCodeBlockContent;
};

function Actions({ actions, pill }: CodeBlockActionsProps) {
  const onClick =
    (
      action: UiCodeBlockAction,
    ): MouseEventHandler<HTMLAnchorElement | HTMLButtonElement> =>
    (event) => {
      action.onClick?.(pill, event);
    };

  return actions ? (
    <div className={styles.actions}>
      {arrayFrom(actions || []).map(({ key, ...action }) => (
        <UiPureButton
          className={styles.action}
          key={key}
          onClick={onClick(action)}
        >
          <UiIcon icon={action.icon} className={styles.actionIcon} />
        </UiPureButton>
      ))}
    </div>
  ) : null;
}

export function UiCodeBlock({
  className,
  style,
  e2e,
  badge,
  type = UiCodeBlockType.simple,
  title,
  theme = UiCodeBlockTheme.loud,
  actions,
  contents,
}: UiCodeBlockProps) {
  const [activePillKey, setActivePillKey] = useState(
    arrayFrom(contents)[0]?.key,
  );
  const handlePill = (pill: Key) => () => {
    setActivePillKey(pill);
  };

  const activePill = arrayFrom(contents || []).find(
    ({ key }) => key === activePillKey,
  );

  return (
    <div
      data-e2e={e2e}
      style={style}
      className={clsx([
        styles.root,
        className,
        styles[`${theme}Theme`],
        styles[`${type}Type`],
      ])}
    >
      {type === UiCodeBlockType.advanced && (
        <div className={styles.header}>
          <div className={styles.pills}>
            {arrayFrom(contents || []).map(({ key, ...content }) => (
              <UiPureButton
                key={key}
                className={clsx([
                  styles.pill,
                  key === activePillKey && styles.active,
                ])}
                onClick={handlePill(key)}
              >
                {content.label}
              </UiPureButton>
            ))}
          </div>
          <div className={styles.title}>{title}</div>
          {!!badge && <UiBadge {...badge} className={styles.badge} />}
        </div>
      )}
      <div className={styles.body}>
        {type === UiCodeBlockType.simple && !!badge && (
          <UiBadge {...badge} className={styles.badge} />
        )}
        <div className={styles.content}>{activePill?.content}</div>
        <Actions actions={actions} pill={activePill} />
      </div>
    </div>
  );
}
