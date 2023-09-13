import { CSSProperties, ReactNode } from "react";
import { UiAvatarProps } from "../../avatar";
import { UiPureButtonCommonProps } from "../../pure-button";

export type UiHoverCardProps = UiPureButtonCommonProps & {
  style?: CSSProperties;
  className?: string;
  e2e?: string;

  avatar?: UiAvatarProps | string;
  title?: ReactNode;
  hint?: ReactNode;
  card?: boolean;
};
