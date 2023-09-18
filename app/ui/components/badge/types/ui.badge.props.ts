import { CSSProperties, PropsWithChildren, ReactNode } from "react";
import { Icon } from "../../icon";

export enum UiBadgeSize {
  small = "small",
  base = "base",
  large = "large",
}

export enum UiBadgeColor {
  gray = "gray",
  blue = "blue",
  orange = "orange",
  red = "red",
  green = "green",
  purple = "purple",
}

export enum UiBadgeType {
  squared = "squared",
  rounded = "rounded",
  status = "status",
}

export type UiBadgeProps = PropsWithChildren<{
  style?: CSSProperties;
  className?: string;
  e2e?: string | boolean;

  before?: Icon | ReactNode;
  after?: Icon | ReactNode;
  label?: Icon | ReactNode;

  type?: UiBadgeType;
  size?: UiBadgeSize;
  color?: UiBadgeColor;

  interactive?: boolean;
}>;
