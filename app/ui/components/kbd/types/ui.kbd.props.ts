import { CSSProperties, ReactNode } from "react";
import { Icon } from "../../icon";

export type UiKbdProps = {
  style?: CSSProperties;
  className?: string;
  e2e?: string;

  children?: Icon | ReactNode;
};
