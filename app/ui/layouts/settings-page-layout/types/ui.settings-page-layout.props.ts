import { CSSProperties, PropsWithChildren } from "react";

export type UiSettingsPageLayoutProps = PropsWithChildren<{
  style?: CSSProperties;
  className?: string;
  e2e?: string | boolean;
}>;
