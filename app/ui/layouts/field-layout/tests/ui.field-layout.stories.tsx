import type { Meta, StoryObj } from "@storybook/react";
import { UiFieldLayout } from "../index";

const meta = {
  title: "Layouts/UiFieldLayout",
  component: UiFieldLayout,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiFieldLayout>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
  },
  name: "UiFieldLayout",
} satisfies StoryObj<typeof meta>;

export default meta;
