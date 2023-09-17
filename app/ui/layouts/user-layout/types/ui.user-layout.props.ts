import { CSSProperties, PropsWithChildren, ReactNode } from "react";

export type UiUserLayoutProps = PropsWithChildren<{
  style?: CSSProperties;
  className?: string;
  e2e?: string | boolean;
  avatar?: ReactNode;
  side?: ReactNode;
}>;
