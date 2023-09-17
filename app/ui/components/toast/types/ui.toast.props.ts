import { CSSProperties, ReactNode } from "react";
import { ArrayFrom, Keyed } from "@/utils";
import { UiPureButtonCommonProps } from "../../pure-button";
import { Icon } from "../../icon";

export enum UiToastStatus {
  info = "info",
  error = "error",
  warning = "warning",
  success = "success",
}

export type UiToastAction = Keyed<
  UiPureButtonCommonProps & {
    label?: ReactNode | Icon;
    loading?: boolean;
    primary?: boolean;
  }
>;

export type UiToastProps = {
  style?: CSSProperties;
  className?: string;
  e2e?: string | boolean;

  title?: ReactNode;
  message?: ReactNode;
  icon?: Icon;

  status?: UiToastStatus;

  actions?: ArrayFrom<UiToastAction>;
};
