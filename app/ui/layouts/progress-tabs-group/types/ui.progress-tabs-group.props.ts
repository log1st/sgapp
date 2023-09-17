import { CSSProperties, PropsWithChildren } from "react";
import { ArrayFrom, Keyed } from "@/utils";
import { UiProgressTabProps } from "../../../components/progress-tab";

export type UiProgressTabsGroupProps = PropsWithChildren<{
  style?: CSSProperties;
  className?: string;
  e2e?: string | boolean;

  tabs?: ArrayFrom<Keyed<UiProgressTabProps>>;
  sortable?: boolean;
}>;
