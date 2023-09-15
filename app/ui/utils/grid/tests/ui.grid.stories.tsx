import type { Meta, StoryObj } from "@storybook/react";
import { UiGrid } from "../index";

const meta = {
  title: "Utils/UiGrid",
  component: UiGrid,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiGrid>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
  },
  name: "UiGrid",
} satisfies StoryObj<typeof meta>;

export default meta;
