import { CSSProperties, FC, PropsWithChildren } from "react";
import { UiButtonProps, UiButtonSize } from "../../button";
import { ArrayFrom, Keyed } from "@/utils";

type ActionProp<Entity, Type> = Type | ((payload?: Entity) => Type);

export type UiActiveActionConfig<Entity> = Keyed<
  PropsWithChildren<
    Omit<
      UiButtonProps,
      | "label"
      | "disabled"
      | "href"
      | "before"
      | "after"
      | "onClick"
      | "htmlType"
    > & {
      check?: ActionProp<Entity, boolean>;
      label?: ActionProp<Entity, UiButtonProps["label"]>;
      disabled?: ActionProp<Entity, UiButtonProps["disabled"]>;
      href?: ActionProp<Entity, UiButtonProps["href"]>;
      before?: ActionProp<Entity, UiButtonProps["before"]>;
      after?: ActionProp<Entity, UiButtonProps["after"]>;
      onClick?(payload?: Entity): void | Promise<void>;
      htmlType?: ActionProp<Entity, UiButtonProps["htmlType"]>;
      wrap?: FC<PropsWithChildren>;
    }
  >
>;

export type UiActiveActionsProps<Entity> = {
  style?: CSSProperties;
  className?: string;
  e2e?: string;

  block?: boolean;
  actions?: ArrayFrom<UiActiveActionConfig<Entity>>;
  size?: UiButtonSize;
  record?: Entity;
};
