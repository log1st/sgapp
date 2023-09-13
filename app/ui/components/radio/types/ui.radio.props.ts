import {
  CSSProperties,
  MouseEventHandler,
  PropsWithChildren,
  ReactNode,
} from "react";
import { UiBoxWrapperCommonProps } from "../../box-wrapper";

export type RadioEventPayload = {
  name?: string;
  value?: string;
  checked?: boolean;
};

export type RadioChangeEventHandler = (event: {
  target: RadioEventPayload;
}) => void;

export type UiRadioProps = PropsWithChildren<
  UiBoxWrapperCommonProps & {
    style?: CSSProperties;
    className?: string;
    e2e?: string;

    value?: string;
    checked?: boolean;
    name?: string;
    onChange?: RadioChangeEventHandler;
    onClick?: MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
    label?: ReactNode;
  }
>;
