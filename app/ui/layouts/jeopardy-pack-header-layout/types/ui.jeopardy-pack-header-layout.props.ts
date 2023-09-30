import { CSSProperties, ReactNode } from "react";

export type UiJeopardyPackHeaderLayoutProps = {
  style?: CSSProperties;
  className?: string;
  e2e?: string | boolean;
  title?: ReactNode;
  creator?: ReactNode;
  status?: ReactNode;
};
