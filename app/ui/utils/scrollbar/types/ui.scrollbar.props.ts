import { CSSProperties, PropsWithChildren } from "react";

export type UiScrollbarProps = PropsWithChildren<{
  style?: CSSProperties;
  className?: string;
}>;
