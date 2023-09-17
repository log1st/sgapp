import { CSSProperties, PropsWithChildren, ReactNode } from "react";
import { Icon } from "../../icon";

export type UiLabelProps = PropsWithChildren<{
  style?: CSSProperties;
  className?: string;
  e2e?: string | boolean;
  label?: ReactNode;
  hint?: ReactNode;
  icon?: Icon | ReactNode;
}>;
