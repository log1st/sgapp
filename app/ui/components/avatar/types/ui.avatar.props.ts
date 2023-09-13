import { CSSProperties, ReactNode } from "react";
import { Icon } from "../../icon";

export enum UiAvatarType {
  rounded = "rounded",
  squared = "squared",
}

export enum UiAvatarSize {
  small = "small",
  base = "base",
  large = "large",
  xLarge = "xLarge",
}

export type UiAvatarProps = {
  style?: CSSProperties;
  className?: string;
  e2e?: string;

  image?: string;
  alt?: string;
  letters?: ReactNode;
  icon?: Icon;
  type?: UiAvatarType;
  size?: UiAvatarSize;
};
