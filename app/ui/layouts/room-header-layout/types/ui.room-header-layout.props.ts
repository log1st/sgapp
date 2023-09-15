import { CSSProperties, ReactNode } from "react";

export type UiRoomHeaderLayoutProps = {
  style?: CSSProperties;
  className?: string;
  e2e?: string;
  icon?: ReactNode;
  title?: ReactNode;
  creator?: ReactNode;
  status?: ReactNode;
};
