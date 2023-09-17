import { CSSProperties, PropsWithChildren, ReactNode } from "react";

export type UiCodeProps = PropsWithChildren<{
  style?: CSSProperties;
  className?: string;
  e2e?: string | boolean;
  value?: ReactNode;
}>;
