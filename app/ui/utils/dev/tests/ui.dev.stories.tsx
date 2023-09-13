import type { Meta, StoryObj } from "@storybook/react";
import { UiDev } from "../index";

const meta = {
  title: "Utils/UiDev",
  component: UiDev,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiDev>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
  },
  name: "UiDev",
} satisfies StoryObj<typeof meta>;

export default meta;
