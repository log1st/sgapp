import { CSSProperties, PropsWithChildren, ReactNode } from "react";
import { UiPureButtonCommonProps } from "../../pure-button";
import { Icon } from "../../icon";

export type UiPillProps = PropsWithChildren<
  UiPureButtonCommonProps & {
    style?: CSSProperties;
    className?: string;
    e2e?: string | boolean;

    label?: ReactNode | Icon;
    selected?: boolean;
  }
>;
