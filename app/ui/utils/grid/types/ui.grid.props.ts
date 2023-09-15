import { CSSProperties, PropsWithChildren } from "react";

export type UiGridProps = PropsWithChildren<{
  style?: CSSProperties;
  className?: string;
  e2e?: string;
  columns?: number;
  gutter?: number | [number, number];
  align?: CSSProperties["alignItems"];
}>;
