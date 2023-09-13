import {
  CSSProperties,
  MouseEventHandler,
  PropsWithChildren,
  ReactNode,
} from "react";

export type UiSidebarProps = PropsWithChildren<{
  style?: CSSProperties;
  className?: string;
  e2e?: string;

  avatar?: ReactNode;
  expandable?: boolean;
  expanded?: boolean;
  changeExpanded?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  hint?: ReactNode;
  label?: ReactNode;
}>;
