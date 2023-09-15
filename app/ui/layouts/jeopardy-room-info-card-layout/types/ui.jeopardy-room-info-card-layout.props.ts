import { CSSProperties, ReactNode } from "react";

export type UiJeopardyRoomInfoCardLayoutProps = {
  style?: CSSProperties;
  className?: string;
  e2e?: string;

  showman?: ReactNode;
  players?: ReactNode;
  round?: ReactNode;
};
