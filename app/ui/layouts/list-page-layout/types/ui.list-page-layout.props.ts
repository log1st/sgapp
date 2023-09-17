import { CSSProperties, PropsWithChildren, ReactNode } from "react";

export type UiListPageLayoutProps = PropsWithChildren<{
  style?: CSSProperties;
  className?: string;
  e2e?: string | boolean;
  filter?: ReactNode;
}>;
