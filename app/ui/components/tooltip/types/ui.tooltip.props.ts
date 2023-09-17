import { CSSProperties, PropsWithChildren, ReactNode } from "react";
import { ArrayFrom, Keyed } from "@/utils";
import { UiButtonProps } from "../../button";
import { UiKbdProps } from "../../kbd";

export type UiTooltipAction = Keyed<UiButtonProps>;

export type UiTooltipKbd = Keyed<UiKbdProps>;

export type UiTooltipProps = PropsWithChildren<{
  style?: CSSProperties;
  className?: string;
  e2e?: string | boolean;

  label?: ReactNode;
  action?: ArrayFrom<UiTooltipAction>;
  kbd?: ArrayFrom<UiTooltipKbd>;
}>;
