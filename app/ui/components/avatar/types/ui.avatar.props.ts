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
  editor = "editor",
}

export type UiAvatarProps = {
  style?: CSSProperties;
  className?: string;
  e2e?: string | boolean;

  image?: string | null;
  alt?: string;
  letters?: ReactNode;
  icon?: Icon;
  type?: UiAvatarType;
  size?: UiAvatarSize;
};
