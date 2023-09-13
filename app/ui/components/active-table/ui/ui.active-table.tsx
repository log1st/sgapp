import { Fragment, MouseEventHandler } from "react";
import { clsx, getRecordDataIndex } from "@/utils";
import {
  UiActiveTableProps,
  UiActiveTableRowPayload,
  UiActiveTableType,
} from "..";

import styles from "./ui.active-table.module.scss";
import { computeTableColumns } from "../utils/computeTableColumns";
import { computeTableGridTemplateColumns } from "../utils/computeTableGridTemplateColumns";
import { UiCheckbox } from "../../checkbox";
import { UiPureButton } from "../../pure-button";

export function UiActiveTable<Entity extends Record<string, unknown>>({
  className,
  style,
  e2e,
  columns,
  actions,
  type = UiActiveTableType.primary,
  onRowClick,
  getRowHref,
  records,
  keyIndex,
  selectedKeys,
  changeSelectedKeys,
}: UiActiveTableProps<Entity>) {
  const computedColumns = computeTableColumns(columns, actions);
  const gridTemplateColumns = computeTableGridTemplateColumns(computedColumns);

  const handleRowClick = (payload: UiActiveTableRowPayload<Entity>) => () => {
    if (payload.column.key === "__actions__") {
      return;
    }
    onRowClick?.(payload);
  };

  const interactive = !!(onRowClick || getRowHref);

  const selectable = !!selectedKeys;

  const handleRecordCheck =
    (recordKey: string): MouseEventHandler =>
    (event) => {
      event.preventDefault();
      event.stopPropagation();

      changeSelectedKeys?.(
        selectedKeys?.includes(recordKey)
          ? selectedKeys?.toSpliced(selectedKeys?.indexOf(recordKey), 1)
          : [...(selectedKeys || []), recordKey],
      );
    };

  const handleAllCheck: MouseEventHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();

    changeSelectedKeys?.(
      selectedKeys?.length === records?.length
        ? []
        : records?.map((record) =>
            String(getRecordDataIndex(record, keyIndex)),
          ) || [],
    );
  };

  return (
    <div
      data-e2e={e2e}
      style={{
        ...style,
        gridTemplateColumns,
      }}
      className={clsx([styles.root, className, styles[`${type}Type`]])}
    >
      {computedColumns.map((column, index, s) => (
        <div
          key={column.key}
          style={{
            gridRow: 1,
            gridColumn: index + 1,
          }}
          className={clsx([
            styles.cell,
            styles.column,
            index === 0 && styles.first,
            index === s.length - 1 && styles.last,
          ])}
        >
          {selectable && index === 0 && (
            <UiCheckbox
              onClick={handleAllCheck}
              className={styles.check}
              checked={selectedKeys?.length === records?.length}
            />
          )}
          <div className={styles.content}>{column.label}</div>
        </div>
      ))}
      {records?.map((record, index) => {
        const key = String(getRecordDataIndex(record, keyIndex));
        return (
          <Fragment key={key}>
            {computedColumns.map((column, columnIndex, s) => (
              <UiPureButton
                key={column.key}
                className={clsx([
                  styles.cell,
                  styles.row,
                  styles[index % 2 ? "odd" : "even"],
                  interactive && styles.interactive,
                  column.key === "__actions__" && styles.actions,
                  columnIndex === 0 && styles.first,
                  columnIndex === s.length - 1 && styles.last,
                ])}
                style={{
                  gridRow: index + 2,
                  gridColumn: columnIndex + 1,
                }}
                onClick={handleRowClick({ record, index, column, columnIndex })}
                href={getRowHref?.({ record, index, column, columnIndex })}
                tabIndex={interactive && columnIndex === 0 ? 0 : -1}
                span={column.key === "__actions__" || !interactive}
              >
                {selectable && columnIndex === 0 && (
                  <UiCheckbox
                    onClick={handleRecordCheck(key)}
                    className={styles.check}
                    checked={selectedKeys?.includes(key)}
                  />
                )}
                <span
                  className={clsx([
                    styles.content,
                    column.ellipsis && styles.ellipsis,
                  ])}
                >
                  {column.render?.(
                    record,
                    getRecordDataIndex(record, column.dataIndex ?? column.key),
                  )}
                </span>
              </UiPureButton>
            ))}
            {interactive && (
              <div
                className={styles.rowLine}
                style={{
                  gridRow: index + 2,
                  gridColumn: `1 / ${computedColumns.length + 1}`,
                }}
              />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
