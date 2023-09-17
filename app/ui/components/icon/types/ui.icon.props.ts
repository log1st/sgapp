import { CSSProperties } from "react";
import { Icon } from "./iconNames";

export type UiIconProps = {
  style?: CSSProperties;
  className?: string;
  e2e?: string | boolean;

  size?: number;
  spin?: boolean;
  icon: Icon;
};
