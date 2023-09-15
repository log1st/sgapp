import { CSSProperties, ReactNode } from "react";
import { PopperProps } from "react-popper";
import { UiFieldCommonProps, UiFieldProps } from "../../field";
import { Icon, UiIconProps } from "../../icon";

export type SelectChangeEventHandler<Value> = (event: {
  target: {
    name?: string;
    value: Value;
  };
}) => void;

export type RichOption<Value, Option> = {
  label: ReactNode;
  value: Value;
  option: Option;
  selected: boolean;
  hint?: ReactNode;
};

export type SelectIconPayload<Value, Option, Multiple extends boolean> = {
  focused: boolean;
  iconProps: Omit<UiIconProps, "icon">;
  value?: Multiple extends boolean ? Array<Value> : Value;
  options: Array<RichOption<Value, Option>>;
};

export type UiSelectRenderer<Value, Option, Multiple extends boolean> =
  | Icon
  | ReactNode
  | ((payload: SelectIconPayload<Value, Option, Multiple>) => Icon | ReactNode);

export type UiSelectProps<
  Option extends Record<string, unknown>,
  Value,
  Multiple extends boolean = false,
> = Omit<UiFieldCommonProps, "before" | "after"> &
  Pick<UiFieldProps, "onFocus" | "onBlur"> & {
    style?: CSSProperties;
    className?: string;
    e2e?: string;
    clearable?: boolean;
    clearValue?: Multiple extends true ? Array<Value> : Value;
    value?: Multiple extends true ? Array<Value> : Value;
    multiple?: Multiple;
    autoFocus?: boolean;
    name?: string;
    after?: UiSelectRenderer<Value, Option, Multiple>;
    before?: UiSelectRenderer<Value, Option, Multiple>;
    onChange?: SelectChangeEventHandler<
      Multiple extends true ? Array<Value> : Value
    >;
    options?: Array<Option>;
    valueIndex?: string | string[];
    hintIndex?: string | string[];
    displayIndex?: string | string[];
    renderOption?(option: Option): ReactNode;
    renderDisplayValue?(value?: Value, ...option: Option[]): ReactNode;

    query?: string | undefined;
    onQueryChange?(query: string): void;
    onPageChange?(page: number): void;
    queryPlaceholder?: string;
    loading?: boolean;
    page?: number;
    totalPages?: number;

    placeholder?: ReactNode;
    loadMore?(): void;
    placement?: PopperProps<unknown>["placement"];
  };
