import { PropsWithChildren } from "react";

export type UiResponsiveUtilProps = PropsWithChildren<{
  mobile?: boolean;
  tablet?: boolean;
  desktop?: boolean;
  false?: boolean;
  true?: boolean;
  wider?: boolean;
  tighter?: boolean;
  wrap?: boolean;
  className?: string;
}>;
