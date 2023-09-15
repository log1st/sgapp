import { CSSProperties, ReactNode } from "react";

export type UiTotpImageLayoutProps = {
  style?: CSSProperties;
  className?: string;
  e2e?: string;
  image?: string | null;
  loading?: boolean;
  secret?: ReactNode;
};
