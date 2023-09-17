import { CSSProperties, PropsWithChildren, ReactNode } from "react";

export type UiDevProps = PropsWithChildren<{
  style?: CSSProperties;
  className?: string;
  e2e?: string | boolean;

  title?: ReactNode;
}>;
