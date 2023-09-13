import type { Meta, StoryObj } from "@storybook/react";
import { UiAuthLayout } from "../index";

const meta = {
  title: "Layouts/UiAuthLayout",
  component: UiAuthLayout,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiAuthLayout>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
  },
  name: "UiAuthLayout",
} satisfies StoryObj<typeof meta>;

export default meta;
