import type { Meta, StoryObj } from "@storybook/react";
import { UiCheckbox } from "../index";

const meta = {
  title: "Components/Form/UiCheckbox",
  component: UiCheckbox,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiCheckbox>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
  },
  name: "UiCheckbox",
} satisfies StoryObj<typeof meta>;

export default meta;
