import { ChangeEventHandler, CSSProperties } from "react";

export type SwitchChangeEventHandler = ChangeEventHandler<HTMLInputElement>;

export enum UiSwitchSize {
  base = "base",
  small = "small",
}

export type UiSwitchProps = {
  style?: CSSProperties;
  className?: string;
  e2e?: string | boolean;

  value?: string;
  checked?: boolean;
  name?: string;
  onChange?: SwitchChangeEventHandler;
  disabled?: boolean;

  size?: UiSwitchSize;
};
