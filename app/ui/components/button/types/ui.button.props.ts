import { CSSProperties, PropsWithChildren, ReactNode } from "react";
import { UiPureButtonCommonProps } from "../../pure-button";
import { Icon } from "../../icon";

export enum UiButtonVariant {
  primary = "primary",
  secondary = "secondary",
  danger = "danger",
  transparent = "transparent",
  link = "link",
}

export enum UiButtonSize {
  base = "base",
  large = "large",
  xLarge = "xLarge",
}

export enum UiButtonModifier {
  block = "block",
}

export type UiButtonProps = PropsWithChildren<
  UiPureButtonCommonProps & {
    style?: CSSProperties;
    className?: string;
    e2e?: string;

    variant?: UiButtonVariant;
    size?: UiButtonSize;
    loading?: boolean;
    label?: Icon | ReactNode;
    before?: Icon | ReactNode;
    after?: Icon | ReactNode;
    modifier?: UiButtonModifier | Array<UiButtonModifier>;
  }
>;
