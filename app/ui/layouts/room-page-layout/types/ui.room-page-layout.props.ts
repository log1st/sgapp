import { CSSProperties, PropsWithChildren, ReactNode } from "react";

export type UiRoomPageLayoutProps = PropsWithChildren<{
  style?: CSSProperties;
  className?: string;
  e2e?: string | boolean;
  header?: ReactNode;
}>;
