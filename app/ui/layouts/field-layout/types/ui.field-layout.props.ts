import { CSSProperties, PropsWithChildren, ReactNode } from "react";

export type UiFieldLayoutProps = PropsWithChildren<{
  style?: CSSProperties;
  className?: string;
  e2e?: string | boolean;
  label?: ReactNode;
  error?: ReactNode;
  hint?: ReactNode;
}>;
