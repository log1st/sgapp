import type { Meta, StoryObj } from "@storybook/react";
import { UiSelect } from "../index";
import { Icon } from "../../icon";

const meta = {
  title: "Components/Form/UiSelect",
  component: UiSelect,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiSelect>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
    value: "test",
    options: [
      { value: "test", label: "Test" },
      { value: "test2", label: "Test2" },
    ],
    before: Icon.eye1,
  },
  name: "UiSelect",
} satisfies StoryObj<typeof meta>;

export default meta;
