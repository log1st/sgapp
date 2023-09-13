import type { Meta, StoryObj } from "@storybook/react";
import { UiKbd } from "../index";

const meta = {
  title: "Components/UiKbd",
  component: UiKbd,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiKbd>;

export const Story = {
  args: {
    e2e: "some-e2e",
    className: "some-class",
    style: {},
    children: "⌘",
  },
  name: "UiKbd",
} satisfies StoryObj<typeof meta>;

export default meta;
