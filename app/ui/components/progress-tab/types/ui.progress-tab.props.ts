import { CSSProperties, PropsWithChildren, ReactNode } from "react";
import { UiPureButtonCommonProps } from "../../pure-button";
import { Icon } from "../../icon";

export type UiProgressTabProps = PropsWithChildren<
  UiPureButtonCommonProps & {
    style?: CSSProperties;
    className?: string;
    e2e?: string | boolean;

    icon?: Icon | ReactNode;
    label?: ReactNode;
    selected?: boolean;
  }
>;
