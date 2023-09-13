import { arrayFrom } from "@/utils";

export type DataIndex<Entity extends Record<keyof Entity, unknown>> =
  | keyof Entity
  | string
  | string[];

export const getRecordDataIndex = <Entity extends Record<string, unknown>>(
  record: Entity,
  dataIndex: DataIndex<Entity> | string | number | symbol,
) => arrayFrom(dataIndex).reduce((a, c) => (a as any)?.[c], record) as any;
