import {
  CSSProperties,
  MouseEventHandler,
  PropsWithChildren,
  ReactNode,
} from "react";

export type UiBoxWrapperCommonProps = {
  label?: ReactNode;
  hint?: ReactNode;
  disabled?: boolean;
  panel?: boolean;
  hasError?: boolean;
  touched?: boolean;
};

export type UiBoxWrapperProps = PropsWithChildren<
  UiBoxWrapperCommonProps & {
    style?: CSSProperties;
    className?: string;
    e2e?: string | boolean;
    active?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  }
>;
