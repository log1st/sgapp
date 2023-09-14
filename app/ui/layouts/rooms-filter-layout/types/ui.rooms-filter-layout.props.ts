import { CSSProperties, ReactNode } from "react";

export type UiRoomsFilterLayoutProps = {
  style?: CSSProperties;
  className?: string;
  e2e?: string;
  type?: ReactNode;
  password?: ReactNode;
  query?: ReactNode;
  status?: ReactNode;
  pagination?: ReactNode;
  submit?: ReactNode;
};
