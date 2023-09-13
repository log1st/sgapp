import type { Meta, StoryObj } from "@storybook/react";
import { Icon, UiIcon } from "..";

const meta = {
  title: "Components/UiIcon",
  component: UiIcon,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
} satisfies Meta<typeof UiIcon>;

export const Story = {
  args: {
    icon: Icon.shoppingBag,
    className: "someClass",
    e2e: "someE2e",
    style: {},
    size: 24,
    spin: false,
  },
  name: "UiIcon",
} satisfies StoryObj<typeof meta>;

export default meta;
