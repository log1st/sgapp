import { CSSProperties, PropsWithChildren } from "react";

export type UiFlyoutProps = PropsWithChildren<{
  style?: CSSProperties;
  className?: string;
  e2e?: string;
}>;
