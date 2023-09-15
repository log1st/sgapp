import { ChangeEventHandler, CSSProperties, FocusEventHandler } from "react";
import { UiFieldCommonProps } from "../../field";

export enum UiInputType {
  text = "text",
  number = "number",
  password = "password",
  textarea = "textarea",
}

export type UiInputProps<Type extends UiInputType> = UiFieldCommonProps & {
  style?: CSSProperties;
  className?: string;
  e2e?: string;

  onFocus?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;

  clearable?: boolean;
  clearValue?: {
    [UiInputType.text]: string;
    [UiInputType.password]: string;
    [UiInputType.number]: number;
    [UiInputType.textarea]: string;
  }[Type];
  htmlType?: Type;
  name?: string;
  autoFocus?: boolean;
  placeholder?: string;
  autoSelect?: boolean;
  value?: {
    [UiInputType.text]: string;
    [UiInputType.password]: string;
    [UiInputType.number]: number;
    [UiInputType.textarea]: string;
  }[Type];
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
} & {
    [UiInputType.password]: {};
    [UiInputType.text]: {
      pattern?: string;
    };
    [UiInputType.number]: {
      min?: number;
      max?: number;
      step?: number;
    };
    [UiInputType.textarea]: {
      rows?: number;
    };
  }[Type];
