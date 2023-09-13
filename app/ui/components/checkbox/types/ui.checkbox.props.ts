import {
  ChangeEventHandler,
  CSSProperties,
  MouseEventHandler,
  PropsWithChildren,
  ReactNode,
} from "react";
import { UiBoxWrapperCommonProps } from "../../box-wrapper";

export type CheckboxChangeEventHandler = ChangeEventHandler<HTMLInputElement>;

export type UiCheckboxProps = PropsWithChildren<
  UiBoxWrapperCommonProps & {
    style?: CSSProperties;
    className?: string;
    e2e?: string;

    value?: string;
    checked?: boolean;
    indeterminate?: boolean;
    name?: string;
    onChange?: CheckboxChangeEventHandler;
    onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
    label?: ReactNode;
  }
>;
