import type { Meta, StoryObj } from "@storybook/react";
import { UiDatePicker } from "../index";

const meta = {
  title: "Components/Form/UiDatePicker",
  component: UiDatePicker,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiDatePicker>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
    name: "value",
  },
  name: "UiDatePicker",
} satisfies StoryObj<typeof meta>;

export default meta;
