import { CSSProperties, PropsWithChildren, ReactNode } from "react";
import { Icon } from "../../icon";

export enum UiSidebarLabelType {
  label = "label",
  shortcut = "shortcut",
  header = "header",
}

export type UiSidebarLabelProps = PropsWithChildren<{
  style?: CSSProperties;
  className?: string;
  e2e?: string | boolean;
  icon?: ReactNode | Icon;
  appendIcon?: ReactNode | Icon;
  label?: ReactNode;
  type?: UiSidebarLabelType;
}>;
