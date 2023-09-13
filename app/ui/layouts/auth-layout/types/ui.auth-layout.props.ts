import { CSSProperties, PropsWithChildren, ReactNode } from "react";

export type UiAuthLayoutProps = PropsWithChildren<{
  style?: CSSProperties;
  className?: string;
  e2e?: string;
  logo?: ReactNode;
  actions?: ReactNode;
}>;
