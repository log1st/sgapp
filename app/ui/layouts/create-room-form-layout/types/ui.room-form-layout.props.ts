import { CSSProperties, PropsWithChildren, ReactNode } from "react";

export type UiRoomFormLayoutProps = PropsWithChildren<{
  style?: CSSProperties;
  className?: string;
  e2e?: string;
  type?: ReactNode;
  title?: ReactNode;
  slug?: ReactNode;
  password?: ReactNode;
  privateField?: ReactNode;
}>;
