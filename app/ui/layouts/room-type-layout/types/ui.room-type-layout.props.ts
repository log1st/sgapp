import { CSSProperties, PropsWithChildren, ReactNode } from "react";
import { Icon } from "@/ui/components/icon";

export type UiRoomTypeLayoutProps = PropsWithChildren<{
  style?: CSSProperties;
  className?: string;
  e2e?: string | boolean;
  icon?: ReactNode | Icon;
}>;
