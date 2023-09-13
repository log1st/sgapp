import { CSSProperties, ReactNode } from "react";

export type UiVirtualScrollProps = {
  itemHeight: number;
  total: number;
  overScan?: number;
  children?(
    index: number,
    props?: {
      style?: CSSProperties;
      className?: string;
    },
  ): ReactNode;
  onReachEnd?(): void;
};
