import { UiActiveTableColumn } from "../types/ui.active-table.props";

export const computeTableGridTemplateColumns = <Entity>(
  columns?: Array<UiActiveTableColumn<Entity>>,
) =>
  columns
    ?.map(
      (column) =>
        `minmax(100px, ${
          column.width
            ? `${
                typeof column.width === "number"
                  ? `${column.width}px`
                  : column.width
              }`
            : "1fr"
        })`,
    )
    .join(" ");
