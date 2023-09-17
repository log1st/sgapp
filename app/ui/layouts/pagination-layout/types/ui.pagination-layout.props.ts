import { CSSProperties, PropsWithChildren, ReactNode } from "react";

export type UiPaginationLayoutProps = PropsWithChildren<{
  style?: CSSProperties;
  className?: string;
  e2e?: string | boolean;
  previous?: ReactNode;
  next?: ReactNode;
}>;
