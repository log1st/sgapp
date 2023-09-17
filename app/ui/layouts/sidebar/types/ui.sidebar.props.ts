import {
  CSSProperties,
  MouseEventHandler,
  PropsWithChildren,
  ReactNode,
} from "react";

export type UiSidebarProps = PropsWithChildren<{
  style?: CSSProperties;
  className?: string;
  e2e?: string | boolean;

  avatar?: ReactNode;
  expandable?: boolean | ReactNode;
  expanded?: boolean;
  changeExpanded?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  hint?: ReactNode;
  label?: ReactNode;
}>;
