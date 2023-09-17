import { CSSProperties, PropsWithChildren } from "react";

export type UiCreatePageLayoutProps = PropsWithChildren<{
  style?: CSSProperties;
  className?: string;
  e2e?: string | boolean;
}>;
