import { CSSProperties, ReactNode } from "react";

export type UiJeopardyPacksFilterLayoutProps = {
  style?: CSSProperties;
  className?: string;
  e2e?: string | boolean;
  query?: ReactNode;
  creator?: ReactNode;
  pagination?: ReactNode;
  submit?: ReactNode;
};
