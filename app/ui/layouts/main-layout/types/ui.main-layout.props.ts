import { CSSProperties, PropsWithChildren, ReactNode } from "react";

export type UiMainLayoutProps = PropsWithChildren<{
  style?: CSSProperties;
  className?: string;
  e2e?: string;

  header?: ReactNode;
}>;
