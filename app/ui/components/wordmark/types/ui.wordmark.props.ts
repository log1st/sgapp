import { CSSProperties, PropsWithChildren } from "react";

export type UiWordmarkProps = PropsWithChildren<{
  style?: CSSProperties;
  className?: string;
  e2e?: string;
}>;
