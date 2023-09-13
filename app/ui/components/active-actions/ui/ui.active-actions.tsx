"use client";

import { useToggle } from "react-use";
import { MouseEvent } from "react";
import type { UiActiveActionConfig, UiActiveActionsProps } from "..";

import styles from "./ui.active-actions.module.scss";
import { UiButton, UiButtonProps, UiButtonSize } from "../../button";
import { arrayFrom, clsx, Keyed } from "@/utils";

const unwrap = <Type, Entity>(prop: Type, record: Entity): Entity =>
  (prop instanceof Function ? prop(record) : prop) as Entity;

interface ActionProps<Entity> {
  action: Omit<UiButtonProps, "onClick"> & {
    onClick?(
      event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
    ): void | Promise<void>;
  } & Pick<UiActiveActionConfig<Entity>, "wrap">;
  size: UiButtonSize;
  className?: string;
}

function Action<Entity>({ action, size, className }: ActionProps<Entity>) {
  const [pending, setPending] = useToggle(false);

  const onClick =
    action.onClick &&
    (async (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      setPending(true);
      await action.onClick?.(event);
      setPending(false);
    });

  const body = (
    <UiButton
      size={size}
      {...action}
      className={className}
      onClick={onClick}
      loading={pending}
    />
  );

  const { wrap: Wrap } = action;

  return Wrap ? <Wrap>{body}</Wrap> : body;
}

export function UiActiveActions<Entity>({
  className,
  style,
  e2e,
  actions,
  size = UiButtonSize.base,
  record,
  block,
}: UiActiveActionsProps<Entity>) {
  const filteredActions = arrayFrom(actions || [])
    ?.filter((action) => {
      if (typeof action.check === "boolean") {
        return action.check;
      }

      if (action.check instanceof Function) {
        return action.check(record);
      }

      return true;
    })
    .map(
      ({ onClick, wrap, ...props }) =>
        Object.fromEntries([
          ...Object.entries(props).map(([prop, value]) => [
            prop,
            unwrap(value, record),
          ]),
          ["onClick", () => onClick?.(record)],
          ["wrap", wrap],
        ]) as Keyed<UiButtonProps>,
    );

  return (
    <div
      data-e2e={e2e}
      style={style}
      className={clsx([
        styles.root,
        className,
        styles[`${size}Size`],
        block && styles.block,
      ])}
    >
      {filteredActions?.map(({ key, ...action }) => (
        <Action
          size={size}
          key={key}
          action={action}
          className={styles.action}
        />
      ))}
    </div>
  );
}
