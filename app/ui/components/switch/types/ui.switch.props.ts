import { CSSProperties } from "react";

export type SwitchEventPayload = {
  name?: string;
  value?: unknown;
  checked?: boolean;
};

export type SwitchChangeEventHandler = (event: {
  target: SwitchEventPayload;
}) => void;

export enum UiSwitchSize {
  base = "base",
  small = "small",
}

export type UiSwitchProps = {
  style?: CSSProperties;
  className?: string;
  e2e?: string;

  value?: unknown;
  checked?: boolean;
  name?: string;
  onChange?: SwitchChangeEventHandler;
  disabled?: boolean;

  size?: UiSwitchSize;
};
