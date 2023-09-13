import { ReactNode } from "react";
import { filteredArray } from "@/utils";
import { UiActiveTableColumn } from "../types/ui.active-table.props";
import { UiActiveActionConfig, UiActiveActions } from "../../active-actions";
import { UiButtonSize } from "../../button";

export const computeTableColumns = <Entity = unknown,>(
  columns?: Array<UiActiveTableColumn<Entity>>,
  actions?: Array<UiActiveActionConfig<Entity>>,
): Array<UiActiveTableColumn<Entity>> =>
  filteredArray([
    ...(columns?.map((column) => ({
      ...column,
      label: column.label || column.key,
      render: column.render?.bind(column) || ((_, value) => value as ReactNode),
      dataIndex:
        column.dataIndex ||
        (column.key as UiActiveTableColumn<Entity>["dataIndex"]),
    })) || []),
    !!actions?.length && {
      key: "__actions__",
      label: "",
      render: (record) => (
        <UiActiveActions
          actions={actions}
          size={UiButtonSize.base}
          record={record}
        />
      ),
      width: "auto",
    },
  ]);
