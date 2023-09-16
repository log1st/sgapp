import { CSSProperties, Key, ReactNode } from "react";
import { Route } from "next";
import { UiActiveActionConfig } from "../../active-actions";
import { DataIndex } from "@/utils";

export enum ActiveTableSortDirection {
  asc = "asc",
  desc = "desc",
}

export type UiActiveTableColumn<Entity> = {
  key: Key;
  ellipsis?: boolean;
  dataIndex?: DataIndex<Entity>;
  label?: ReactNode;
  width?: string | number;
  render?(record: Entity, value: unknown): ReactNode;
};

export type UiActiveTableRowPayload<Entity> = {
  record: Entity;
  index: number;
  column: UiActiveTableColumn<Entity>;
  columnIndex: number;
};

export enum UiActiveTableType {
  primary = "primary",
  rooms = "rooms",
  jeopardyPacks = "rooms",
}

export type UiActiveTableProps<Entity> = {
  style?: CSSProperties;
  className?: string;
  e2e?: string;

  columns?: Array<UiActiveTableColumn<Entity>>;
  actions?: Array<UiActiveActionConfig<Entity>>;
  records?: Array<Entity>;
  keyIndex: DataIndex<Entity>;
  onRowClick?(payload: UiActiveTableRowPayload<Entity>): void;
  getRowHref?: ((payload: UiActiveTableRowPayload<Entity>) => Route) | Route;

  type?: UiActiveTableType;

  selectedKeys?: Array<Key>;
  changeSelectedKeys?(keys: Array<Key>): void;
};
