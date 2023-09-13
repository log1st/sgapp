import type { Meta, StoryObj } from "@storybook/react";
import { UiScrollbar } from "../index";

const meta = {
  title: "Utils/UiScrollbar",
  component: UiScrollbar,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiScrollbar>;

export const Story = {
  args: {},
  name: "UiScrollbar",
} satisfies StoryObj<typeof meta>;

export default meta;
