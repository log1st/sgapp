import { CSSProperties, PropsWithChildren, ReactNode } from "react";
import { UiPureButtonCommonProps } from "../../pure-button";
import { Icon } from "../../icon";

export type UiProgressTabProps = PropsWithChildren<
  UiPureButtonCommonProps & {
    style?: CSSProperties;
    className?: string;
    e2e?: string;

    icon?: Icon;
    label?: ReactNode;
    selected?: boolean;
  }
>;
