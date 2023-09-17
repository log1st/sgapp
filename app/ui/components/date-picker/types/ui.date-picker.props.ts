import { CSSProperties, Key, ReactNode } from "react";
import { ArrayFrom, Keyed } from "@/utils";

export type UiDatePickerPresetResult = {
  disabled?: boolean;
  today?: boolean;
  selected?: boolean;
  highlighted?: boolean;
};

export type UiDatePickerPreset = {
  label?: ReactNode;
  customCheck?(date: Date): UiDatePickerPresetResult;
  values?: [Date, Date];
};

export type DatePickerEventPayload<Range extends boolean> = {
  name?: string;
  value?: Range extends true ? [Date, Date] : Date;
  preset?: Key | undefined;
};

export type DatePickerChangeEventHandler<Range extends boolean> = (event: {
  target: DatePickerEventPayload<Range>;
}) => void;

export type UiDatePickerTexts = {
  cancel: string;
  apply: string;
  range: string;
  start: string;
  end: string;
};

export enum UiDatePickerLevel {
  day = "day",
  month = "month",
  year = "year",
}

export type UiDatePickerProps<Range extends boolean> = {
  style?: CSSProperties;
  className?: string;
  e2e?: string | boolean;

  name?: string;
  value?: Range extends true ? [Date, Date] : Date;
  range?: Range;
  onChange?: DatePickerChangeEventHandler<Range>;
  onCancel?(): void;

  time?: boolean;

  min?: Date;
  max?: Date;
  preset?: Key;
  presets?: ArrayFrom<Keyed<UiDatePickerPreset>>;

  locale?: string;

  texts?: UiDatePickerTexts;

  level?: UiDatePickerLevel;
};
