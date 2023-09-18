import { CSSProperties, PropsWithChildren, ReactNode } from "react";
import { UiAvatarProps } from "../../avatar";
import { UiPureButtonCommonProps } from "../../pure-button";

export type UiHoverCardProps = PropsWithChildren<
  UiPureButtonCommonProps & {
    style?: CSSProperties;
    className?: string;
    e2e?: string | boolean;

    avatar?: ReactNode | UiAvatarProps | string;
    title?: ReactNode;
    hint?: ReactNode;
    card?: boolean;
  }
>;
