import { CSSProperties, PropsWithChildren } from "react";
import { ArrayFrom, Keyed } from "@/utils";
import { UiPillProps } from "../../../components/pill";

export type UiPillsGroupProps = PropsWithChildren<{
  style?: CSSProperties;
  className?: string;
  e2e?: string;

  pills?: ArrayFrom<Keyed<UiPillProps>>;
}>;
