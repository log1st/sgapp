import { CSSProperties, ReactNode } from "react";

export type UiTotpImageLayoutProps = {
  style?: CSSProperties;
  className?: string;
  e2e?: string | boolean;
  image?: string | null;
  loading?: boolean;
  secret?: ReactNode;
};
