import { CSSProperties, PropsWithChildren, ReactNode } from "react";

export type UiRoomsListPageLayoutProps = PropsWithChildren<{
  style?: CSSProperties;
  className?: string;
  e2e?: string;
  filter?: ReactNode;
}>;
