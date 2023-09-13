import { CSSProperties, PropsWithChildren, ReactNode } from "react";
import { UiPureButtonCommonProps } from "../../pure-button";
import { Icon } from "../../icon";
import { UiBadgeProps } from "../../badge";

export enum UiSidebarItemType {
  primary = "primary",
  danger = "danger",
}

export type UiSidebarItemProps = PropsWithChildren<
  UiPureButtonCommonProps & {
    style?: CSSProperties;
    className?: string;
    e2e?: string;

    icon?: Icon | ReactNode;
    label?: ReactNode;
    badge?: UiBadgeProps;
    hint?: ReactNode;
    appendIcon?: Icon | ReactNode;
    type?: UiSidebarItemType;
  }
>;
