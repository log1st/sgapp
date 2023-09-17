import {
  CSSProperties,
  FocusEventHandler,
  PropsWithChildren,
  ReactNode,
} from "react";
import { ArrayFrom } from "@/utils";
import { Icon } from "../../icon";

export enum UiFieldType {
  primary = "primary",
}

export enum UiFieldSize {
  base = "base",
  small = "small",
}

export enum UiFieldModifier {
  centered = "centered",
  noElevation = "noElevation",
}

export type UiFieldCommonProps = {
  hasError?: boolean;
  before?: Icon | ReactNode;
  after?: Icon | ReactNode;
  action?: ReactNode;
  disabled?: boolean;
  readOnly?: boolean;
  touched?: boolean;
  loading?: boolean;
  type?: UiFieldType;
  size?: UiFieldSize;
  tabIndex?: number;
  modifier?: ArrayFrom<UiFieldModifier>;
};

export type UiFieldProps = PropsWithChildren<
  UiFieldCommonProps & {
    style?: CSSProperties;
    className?: string;
    e2e?: string | boolean;
    focused?: boolean;
    onBlur?: FocusEventHandler<HTMLLabelElement>;
    onFocus?: FocusEventHandler<HTMLLabelElement>;
  }
>;
