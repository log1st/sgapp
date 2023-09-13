import type { Meta, StoryObj } from "@storybook/react";
import { UiField, UiFieldSize, UiFieldType } from "../index";
import { Icon } from "../../icon";

const meta = {
  title: "Components/Form/UiField",
  component: UiField,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiField>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
    children: "Children",
    tabIndex: 1,
    type: UiFieldType.primary,
    disabled: false,
    after: Icon.check,
    before: Icon.map,
    readOnly: false,
    focused: false,
    touched: false,
    loading: true,
    hasError: false,
    size: UiFieldSize.small,
  },
  name: "UiField",
} satisfies StoryObj<typeof meta>;

export default meta;
