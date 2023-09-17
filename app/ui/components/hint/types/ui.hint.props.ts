import { CSSProperties, PropsWithChildren, ReactNode } from "react";
import { Icon } from "../../icon";

export enum UiHintType {
  normal = "normal",
  disabled = "disabled",
  danger = "danger",
}

export type UiHintProps = PropsWithChildren<{
  style?: CSSProperties;
  className?: string;
  e2e?: string | boolean;

  label?: ReactNode;
  icon?: Icon;
  type?: UiHintType;
}>;
