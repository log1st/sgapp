import type { Meta, StoryObj } from "@storybook/react";
import { UiVirtualScroll } from "../index";

const meta = {
  title: "Utils/UiVirtualScroll",
  component: UiVirtualScroll,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiVirtualScroll>;

export const Story = {
  args: {
    itemHeight: 20,
    total: 30,
    overScan: 2,
  },
  name: "UiVirtualScroll",
} satisfies StoryObj<typeof meta>;

export default meta;
