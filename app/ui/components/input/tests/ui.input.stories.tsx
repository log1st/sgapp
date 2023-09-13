import type { Meta, StoryObj } from "@storybook/react";
import { UiInput } from "../index";
import { UiFieldSize, UiFieldType } from "../../field";
import { Icon } from "../../icon";

const meta = {
  title: "Components/Form/UiInput",
  component: UiInput,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiInput>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
    tabIndex: 1,
    type: UiFieldType.primary,
    disabled: false,
    after: Icon.check,
    before: Icon.map,
    readOnly: false,
    touched: false,
    loading: true,
    hasError: false,
    size: UiFieldSize.small,
    name: "value",
    placeholder: "Placeholder",
    clearable: true,
    clearValue: "",
  },
  name: "UiInput",
} satisfies StoryObj<typeof meta>;

export default meta;
