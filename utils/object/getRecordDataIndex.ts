import { get, set } from "lodash";
import { arrayFrom } from "@/utils";

export type DataIndex<Entity extends Record<keyof Entity, unknown>> =
  | keyof Entity
  | string
  | string[];

export const getRecordDataIndex = <
  Output = unknown,
  Entity extends Record<string, unknown> = Record<string, unknown>,
>(
  record: Entity,
  dataIndex: DataIndex<Entity> | string | number | symbol,
) => get(record, arrayFrom(dataIndex).join(".")) as Output;

export const setRecordDataIndex = <
  Output = unknown,
  Entity extends Record<string, unknown> = Record<string, unknown>,
>(
  record: Entity,
  dataIndex: DataIndex<Entity> | string | number | symbol,
  value: Output,
) => set(record, arrayFrom(dataIndex).join("."), value);
