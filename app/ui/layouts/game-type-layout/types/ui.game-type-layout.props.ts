import { CSSProperties, PropsWithChildren, ReactNode } from "react";
import { Icon } from "@/ui/components/icon";

export type UiGameTypeLayoutProps = PropsWithChildren<{
  style?: CSSProperties;
  className?: string;
  e2e?: string;
  icon?: ReactNode | Icon;
}>;
