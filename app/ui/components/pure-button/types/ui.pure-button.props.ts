import {
  CSSProperties,
  FocusEventHandler,
  MouseEventHandler,
  PropsWithChildren,
} from "react";
import { Route } from "next";

export enum UiPureButtonHtmlType {
  button = "button",
  submit = "submit",
  reset = "reset",
}

export type UiPureButtonCommonProps = {
  htmlType?: UiPureButtonHtmlType;
  href?: Route;
  target?: string;

  disabled?: boolean;
  active?: boolean;
  span?: boolean | "label";
  link?: boolean;
  interactive?: boolean;

  tabIndex?: number;

  prevent?: boolean;
  stop?: boolean;

  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  onMouseOver?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  onMouseLeave?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  onFocus?: FocusEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  onBlur?: FocusEventHandler<HTMLButtonElement | HTMLAnchorElement>;
};

export type UiPureButtonProps = PropsWithChildren<
  UiPureButtonCommonProps & {
    style?: CSSProperties;
    className?: string;
    e2e?: string | boolean;
  }
>;
